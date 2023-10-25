
import { Schema, model, models } from "mongoose";
import { IUser } from "@/types/index"

const userSchema = new Schema<IUser>({
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: (value: string) => /\S+@\S+\.\S+/.test(value),
            message: 'Invalid email format',
        },
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },

},
    { timestamps: true }
);

const User = models.User || model<IUser>('User', userSchema);

export default User;