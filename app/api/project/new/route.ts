import Project from "../../../../models/project"

import { connectToDB } from "../../../../util/database"

import { NextResponse } from "next/server"

export const POST = async (request: Request) => {



    const { title, image, mission, description, languages, url } = await request.json()

    console.log("FormData")
    console.log(title)
    try {
        await connectToDB()
        const newProject = new Project(
            {
                title: title,
                image: image,
                mission: mission,
                description: description,
                languages: languages,
                url: url,
            }
        )
        console.log("NewProject")

        console.log(newProject)

        // Gérer les erreurs de validation du modèle Mongoose.
        const validationError = newProject.validateSync();
        if (validationError) {
            return NextResponse.json(
                { error: "Validation failed", details: validationError.errors },
                { status: 400 }
            );
        }

        await newProject.save()

        return NextResponse.json(
            newProject,
            { status: 201 }
        )
    } catch (error) {
        console.log(error)
        return NextResponse.json(
            "Failed to create a new project",
            { status: 500 }
        )
    }


}