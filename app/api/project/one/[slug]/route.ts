import Project from "@/models/project"
import { connectToDB } from "@/util/database"
import { NextResponse } from "next/server"


export const GET = async (
    request: Request,
    { params }: { params: { slug: string } }
) => {
    try {
        await connectToDB();

        try {
            const slug = params.slug
            const project = await Project.findOne({ _id: slug });

            return NextResponse.json(
                project,
                { status: 200 }
            );
        } catch (error) {
            return NextResponse.json(
                { message: "Projet non trouvé" },
                { status: 400 }
            );
        }

    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: "Failed to connect to mongoDB" },
            { status: 500 }
        );
    }
};
