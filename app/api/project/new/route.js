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
  console.log(data);

  const file = data.get("file");
  const title = data.get("title");
  const mission = data.get("mission");
  const description = data.get("description");
  const languages = data.get("languages");
  const url = data.get("url");

  try {
    if (!file) {
      return NextResponse.json({ error: "Fichier non trouvé" }, { status: 400 });
    }
    console.log(file);
    // Save photo file to temp folder
    // const newFile = await savePhotoToLocal(file);

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
    const newFile = { filePath: uploadDir, fileName: file.name };

    console.log(newFile);
    try {
      // Upload to the cloud after saving the photo file to the temp folder

      const photo = await uploadPhotoToCloudinary(newFile);

      try {
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
          return NextResponse.json("Failed to connectToDB", { status: 503 });
        }
      } catch (error) {
        console.log(error);
        return NextResponse.json("Failed to unlink", { status: 502 });
      }
    } catch (error) {
      console.log(error);
      return NextResponse.json("Failed to uploadPhotoToCloudinary", { status: 501 });
    }
  } catch (error) {
    return NextResponse.json({ message: "Failed to savePhotoToLocal" }, { status: 500 });
  }
};
