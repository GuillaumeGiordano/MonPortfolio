import Project from "@models/project";

import { connectToDB } from "@util/database";
import { NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";
import { v4 as uuidv4 } from "uuid";
import os from "os";
import { v2 as cloudinary } from "cloudinary";

require("dotenv").config();
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true,
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

  await fs.writeFile(uploadDir, buffer);
  console.log(uploadDir);
  return { filePath: uploadDir, fileName: file.name };
}
async function uploadPhotoToCloudinary(newFile) {
  const photoPromise = cloudinary.uploader.upload(newFile.filePath, {
    upload_preset: `portfolioPreset`,
    folder: "portfolio",
  });
  return await photoPromise;
}

export const POST = async (request) => {
  console.log("Start Back POST");
  const data = await request.formData();
  console.log(data.get("fileURL"));

  const file = data.get("file");
  const fileURL = data.get("fileURL");
  const title = data.get("title");
  const mission = data.get("mission");
  const description = data.get("description");
  const languages = data.get("languages");
  const url = data.get("url");

  try {
    console.log("savePhotoToLocal");
    // Save photo file to temp folder
    const newFile = await savePhotoToLocal(file);
    console.log(newFile);

    try {
      console.log("uploadPhotoToCloudinary");
      // Upload to the cloud after saving the photo file to the temp folder
      // const photo = await uploadPhotoToCloudinary(newFile);

      // const photo = await cloudinary.uploader.upload(newFile.filePath, {
      //   // upload_preset: `Upload_Portfolio`,
      //   folder: "portfolio",
      // });
      // console.log(photo);
      // const formData = new FormData();
      // formData.append("file", newFile.fileName);
      // formData.append("upload_preset", "Upload_Portfolio");
      // formData.append("folder", "portfolio");

      // Remplacez CLOUD_NAME, API_KEY et API_SECRET par vos informations d'authentification Cloudinary
      // const cloudinaryApiKey = process.env.API_KEY;
      // const cloudinaryApiSecret = process.env.API_SECRET;

      // const timestamp = Math.round(new Date() / 1000);
      // const signature = await fetch(
      //   "https://api.cloudinary.com/v1_1/" +
      //     process.env.CLOUD_NAME +
      //     "/image/upload?upload_preset=Upload_Portfolio&folder=portfolio&timestamp=" +
      //     timestamp,
      //   {
      //     method: "GET",
      //     headers: {
      //       Authorization: `Bearer ${cloudinaryApiKey}:${signature}`,
      //     },
      //   }
      // ).then((res) => res.json());

      // const res = await fetch(
      //   `https://api.cloudinary.com/v1_1/${process.env.CLOUD_NAME}/image/upload`,
      //   {
      //     method: "POST",
      //     body: formData,
      //     headers: {
      //       Authorization: `Basic ${btoa(`${cloudinaryApiKey}:${cloudinaryApiSecret}`)}`,
      //     },
      //   }
      // );

      // let photoUrl = "";
      // if (res.ok) {
      //   const photo = await res.json();
      //   photoUrl = photo.secure_url;
      // } else {
      //   console.error("Upload failed");
      //   return NextResponse.json("Failed to connectToDB", { status: 504 });
      // }

      try {
        // Delete photo file in temp folder after seccuful upload
        fs.unlink(newFile.filePath);

        try {
          await connectToDB();

          console.log(fileURL);

          const newProject = new Project({
            title: title,
            // image: photo.secure_url,
            image: fileURL,
            mission: mission,
            description: description,
            languages: languages,
            url: url,
          });

          console.log(newProject);

          // Gérer les erreurs de validation du modèle Mongoose.
          // const validationError = newProject.validateSync();
          // if (validationError) {
          //   return NextResponse.json(
          //     { error: "Validation failed", details: validationError.errors },
          //     { status: 403 }
          //   );
          // }

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
