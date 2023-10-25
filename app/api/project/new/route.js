import Project from "@models/project";

import { connectToDB } from "@util/database";
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

export const POST = async (request) => {
  const data = await request.formData();

  const file = data.get("file");
  const title = data.get("title");
  const mission = data.get("mission");
  const description = data.get("description");
  const languages = data.get("languages");
  const url = data.get("url");

  try {
    if (!file && !file instanceof File) {
      return NextResponse.json({ error: "Fichier non trouvé" }, { status: 400 });
    }

    // Save photo file to temp folder
    const newFile = await savePhotoToLocal(file);
    // Upload to the cloud after saving the photo file to the temp folder
    const photo = await uploadPhotoToCloudinary(newFile);
    // Delete photo file in temp folder after seccuful upload
    fs.unlink(newFile.filePath);

    try {
      await connectToDB();

      const newProject = new Project({
        title: title,
        image: photo.secure_url,
        mission: mission,
        description: description,
        languages: languages,
        url: url,
      });

      // Gérer les erreurs de validation du modèle Mongoose.
      const validationError = newProject.validateSync();
      if (validationError) {
        return NextResponse.json(
          { error: "Validation failed", details: validationError.errors },
          { status: 403 }
        );
      }

      await newProject.save();

      return NextResponse.json(newProject, { status: 201 });
    } catch (error) {
      console.log(error);
      return NextResponse.json("Failed to create a new project", { status: 501 });
    }
  } catch (error) {
    return NextResponse.json({ message: "Cloudinary echec" }, { status: 500 });
  }

  //   // Contrôle de l'extension du fichier
  //   const allowedExtensions = ["jpg", "jpeg", "png"];
  //   const fileExtension = originalFileName.split(".").pop().toLowerCase();
  //   const fileContentType = file.type.split("/").pop();
  //   if (!allowedExtensions.includes(fileExtension)) {
  //     return NextResponse.json(
  //       { error: "Invalid file format. Please upload a JPEG, JPG, or PNG file." },
  //       { status: 401 }
  //     );
  //   }
  //   if (!allowedExtensions.includes(fileContentType)) {
  //     return NextResponse.json(
  //       { error: "Invalid file format. Please upload a JPEG, JPG, or PNG file." },
  //       { status: 402 }
  //     );
  //   }
  // Autre controleur ......

  //   const bytes = await file.arrayBuffer();
  //   const buffer = Buffer.from(bytes);

  // With the file data in the buffer, you can do whatever you want with it.
  // For this, we'll just write it to the filesystem in a new location
  // const now = new Date();
  // const timestamp = now.toISOString().replace(/[:.Z-]/g, '');
  // const uniqueFilename = `essai_${timestamp}_${file.name}`;
  // const path = `./public/projects/${uniqueFilename}`;

  //   const path = `./images/${file.name}`;
  //   await writeFile(path, buffer);
  //   console.log(`open ${path} to see the uploaded file`);
};
