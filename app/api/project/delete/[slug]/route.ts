import Project from '@/models/project';
import { connectToDB } from '@/util/database';
import { NextResponse } from 'next/server';
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

export const DELETE = async (
    requete: Request,
    { params }: { params: { slug: string } }) => {

    try {

        await connectToDB();
        const slug = params.slug
        const project = await Project.findOne(
            { "_id": slug }
        );

        if (project) {
            const url = project?.image
            const urlSplit = url.split("/").slice(-2)
            const folder = urlSplit[0]
            const name = urlSplit[1].split(".")[0]
            const publicId = folder + "/" + name

            await cloudinary.uploader.destroy(publicId)
            console.log("Image delete in cloudinary.")
        }

        const deleteProject = await Project.findOneAndDelete(
            { "_id": slug }
        );

        if (deleteProject.deletedCount === 0) {
            return NextResponse.json(
                { error: 'Projet non trouvé ou déjà supprimé' },
                { status: 404 }
            );
        }

        return NextResponse.json(deleteProject, { status: 200 });

    } catch (error) {
        console.log(error);
        return NextResponse.json('Échec de la suppression du projet', { status: 500 });
    }
};
