
import { redirect } from 'next/navigation';
import Project from '../../../../../models/project';
import { connectToDB } from '../../../../../util/database';
import { NextResponse } from 'next/server';

export const PUT = async (
    request: Request,
    { params }: { params: { slug: string } }) => {
    try {
        await connectToDB();

        const {
            title,
            image,
            mission,
            description,
            languages,
            url,
        } = await request.json()

        const slug = params.slug
        const updateProject = await Project.findOneAndUpdate(
            { _id: slug },
            {
                title,
                image,
                mission,
                description,
                languages,
                url,
            },
            { new: true }
        );

        if (!updateProject) {
            return NextResponse.json(
                { error: 'Projet non trouvé' },
                { status: 404 }
            );
        }


        return NextResponse.json(updateProject, { status: 200 });

    } catch (error) {
        console.log(error);
        return NextResponse.json('Échec de la mise à jour du projet', { status: 500 });
    }
};
