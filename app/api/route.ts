import Project from "../../models/projects"
import { connectToDB } from "../../util/database"

import { NextResponse } from "next/server"

export const POST = async (request: Request) => {
    const { project } = await request.json()

    try {
        await connectToDB()
        const newProject = new Project({ project })

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