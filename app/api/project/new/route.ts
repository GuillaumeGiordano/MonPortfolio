require("dotenv").config();

import Project from "@models/project";
import { connectToDB } from "@util/database";
import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true,
});

export const POST = async (request: Request) => {
  const data = await request.formData();

  const fileURL = data.get("fileURL") as string | null;
  const title = data.get("title") as string | null;
  const mission = data.get("mission") as string | null;
  const description = data.get("description") as string | null;
  const languages = data.get("languages") as string | null;
  const url = data.get("url") as string | null;

  try {
    await connectToDB();

    const newProject = new Project({
      title: title,
      image: fileURL,
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
        { status: 401 }
      );
    }

    await newProject.save();

    return NextResponse.json(newProject, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to Create a new project" },
      { status: 500 }
    );
  }
};
