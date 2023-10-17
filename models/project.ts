import { Schema, model, models } from "mongoose";

import { IProject } from "../types/index"

const projectSchema = new Schema<IProject>({
    image: {
        type: String,
        required: [true, 'image is required'],
    },
    title: {
        type: String,
        required: [true, 'title is required'],
    },
    mission: {
        type: String,
        required: [true, 'mission is required'],
    },
    description: {
        type: String,
        required: [true, 'description is required'],
    },
    languages: {
        type: String,
        required: [true, 'languages is required'],
    },
    url: {
        type: String,
        required: [true, 'url is required'],
    }
})

const Project = models.Project || model<IProject>('Project', projectSchema)

export default Project;