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
  secure: true,
});

export const PUT = async (request, { params }) => {
  try {
    const data = await request.formData();
    const file = data.get("file");
    const fileURL = data.get("fileURL");
    const title = data.get("title");
    const mission = data.get("mission");
    const description = data.get("description");
    const languages = data.get("languages");
    const url = data.get("url");

    try {
      await connectToDB();
      const slug = params.slug;
      let newURL = "";

      if (fileURL) {
        //IF NEW FILE, WE NEED TO DELETE OLD PICTURE IN CLOUDINARY
        const project = await Project.findOne({ _id: slug });
        newURL = fileURL;

        if (project && project.image) {
          const url = project.image;
          if (url !== "undefined") {
            const urlSplit = url.split("/").slice(-2);
            const folder = urlSplit[0];
            const name = urlSplit[1].split(".")[0];
            const publicId = folder + "/" + name;
            await cloudinary.uploader.destroy(publicId);
            console.log("Image delete in cloudinary.");
          } else {
            console.log("Il n'y avait pas d'image sur cloudinary !");
          }
        }
      } else {
        newURL = file;
      }

      try {
        const updateProject = await Project.findOneAndUpdate(
          { _id: slug },
          {
            title,
            image: newURL,
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
