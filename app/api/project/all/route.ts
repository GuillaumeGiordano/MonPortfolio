import Project from "../../../../models/project"

import { connectToDB } from "../../../../util/database"

import { NextResponse } from "next/server"

export const GET = async (request: Request) => {
    try {
        await connectToDB()
        const projects = await Project.find({})
        return NextResponse.json(
            projects,
            { status: 200 }
        )

    } catch (error) {
        console.log(error)
        return NextResponse.json(
            error,
            { status: 500 }
        )
    }

}