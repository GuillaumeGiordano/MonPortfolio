import Project from "@/models/project";
import { connectToDB } from "@/util/database";
import { NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";
import { v4 as uuidv4 } from "uuid";
import os from "os";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

async function savePhotoToLocal(file) {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const name = uuidv4();
  const ext = file.type.split("/")[1];

  // Doesn't work in Vercel :(
  // const uploadDir = path.join(process.cwd(), "public", `/${name}.${ext}`);

  // Does work in Vercel :)
  const tmpdir = os.tmpdir();
  const uploadDir = path.join(tmpdir, `/${name}.${ext}`);

  fs.writeFile(uploadDir, buffer);

  return { filePath: uploadDir, fileName: file.name };
}

async function uploadPhotoToCloudinary(newFile) {
  return await cloudinary.uploader.upload(newFile.filePath, { folder: "portfolio" });
}

export const PUT = async (request, { params }) => {
  try {
    const data = await request.formData();
    const file = data.get("file");
    const title = data.get("title");
    const mission = data.get("mission");
    const description = data.get("description");
    const languages = data.get("languages");
    const url = data.get("url");

    try {
      await connectToDB();
      const slug = params.slug;
      let photo = {};

      if (file && file instanceof File) {
        //ADD NEW PICTURE IN CLOUDINARY
        const newFile = await savePhotoToLocal(file);
        photo = await uploadPhotoToCloudinary(newFile);
        fs.unlink(newFile.filePath);
        console.log("Image add in cloudinary.");

        //DELETE OLD PICTURE IN CLOUDINARY
        const project = await Project.findOne({ _id: slug });
        if (!project) {
          return NextResponse.json({ error: "Projet non trouvé" }, { status: 401 });
        }
        const url = project?.image;
        const urlSplit = url.split("/").slice(-2);
        const folder = urlSplit[0];
        const name = urlSplit[1].split(".")[0];
        const publicId = folder + "/" + name;
        await cloudinary.uploader.destroy(publicId);
        console.log("Image delete in cloudinary.");
      } else {
        console.log("ce n'est pas un fchier");
      }

      try {
        const updateProject = await Project.findOneAndUpdate(
          { _id: slug },
          {
            title,
            image: file instanceof File ? photo.secure_url : file,
            mission,
            description,
            languages,
            url,
          },
          { new: true }
        );

        if (!updateProject) {
          return NextResponse.json({ error: "Projet non trouvé" }, { status: 403 });
        }

        return NextResponse.json(updateProject, { status: 200 });
      } catch (error) {
        return NextResponse.json(
          { message: "Échec de la mise à jour du projet" },
          { status: 402 }
        );
      }
    } catch (error) {
      console.log(error);
      return NextResponse.json("Échec de la connexion à mongoDB", { status: 400 });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json("Échec server", { status: 500 });
  }
};
