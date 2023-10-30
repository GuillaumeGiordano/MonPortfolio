import Project from "@models/project"
import { connectToDB } from "@util/database"
import { NextResponse } from "next/server"
// import { v2 as cloudinary } from "cloudinary";

// cloudinary.config({
//     cloud_name: process.env.CLOUD_NAME,
//     api_key: process.env.API_KEY,
//     api_secret: process.env.API_SECRET,
// });
// export const dynamic = "force-dynamic";
// export const revalidate = 0;
export const GET = async (request: Request) => {
    try {

        // POUR UPDATE FROM CLOUDNARY !!!!
        // const { resources } = await cloudinary.search.expression(
        //     'folder:portfolio/*'
        // ).sort_by('created_at', 'desc').max_results(500).execute()

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