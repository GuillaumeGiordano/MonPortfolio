import { Schema, model, models } from "mongoose";

import { IUser } from "../types/index"

const userSchema = new Schema<IUser>({
    mail: {
        type: String,
        required: [true, 'image is required'],
    },
    passworld: {
        type: String,
        required: [true, 'title is required'],
    },
})

const User = models.User || model<IUser>('User', userSchema)

export default User;