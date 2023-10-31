import Project from "@/models/project";
import { connectToDB } from "@/util/database";
import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true,
});

export const PUT = async (request: Request, { params }: { params: { slug: string } }) => {
  try {
    const data = await request.formData();
    const file = data.get("file") as File | null;
    const fileURL = data.get("fileURL") as string | null;
    const title = data.get("title") as string | null;
    const mission = data.get("mission") as string | null;
    const description = data.get("description") as string | null;
    const languages = data.get("languages") as string | null;
    const url = data.get("url") as string | null;

    try {
      await connectToDB();
      const slug = params.slug;
      let newURL: string | null = null;

      if (fileURL) {
        // SI UN NOUVEAU FICHIER EST ENVOYÉ, NOUS DEVONS SUPPRIMER L'ANCIENNE IMAGE DE CLOUDINARY
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
            console.log("Image supprimée de Cloudinary.");
          } else {
            console.log("Il n'y avait pas d'image sur Cloudinary !");
          }
        }
      } else if (file) {
        newURL = file.name;
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
      return NextResponse.json("Échec de la connexion à MongoDB", { status: 400 });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json("Échec du serveur", { status: 500 });
  }
};
