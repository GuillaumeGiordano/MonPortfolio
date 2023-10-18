import Project from "../../../../../models/project"
import { connectToDB } from "../../../../../util/database"
import { NextResponse } from "next/server"


export const GET = async (
    request: Request,
    { params }: { params: { slug: string } }
) => {
    try {
        await connectToDB();
        const slug = params.slug
        const project = await Project.findOne({ _id: slug });

        if (!project) {
            return NextResponse.json(
                { message: "Projet non trouvé" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            project,
            { status: 200 }
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: "Une erreur est survenue lors de la récupération du projet" },
            { status: 500 }
        );
    }
};
