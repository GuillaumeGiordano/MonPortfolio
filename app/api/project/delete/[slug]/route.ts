import Project from '../../../../../models/project';
import { connectToDB } from '../../../../../util/database';
import { NextResponse } from 'next/server';

export const DELETE = async (
    requete: Request,
    { params }: { params: { slug: string } }) => {

    try {
        await connectToDB();
        const slug = params.slug

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
