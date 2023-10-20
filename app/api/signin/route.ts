require("dotenv").config();

import { connectToDB } from "@util/database"
import { NextResponse } from "next/server"
import User from "@models/user";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';



const JWT_SECRET = process.env.JWT_SECRET;

export const POST = async (request: Request) => {
    try {
        const { email, password } = await request.json()

        await connectToDB();

        // if email and password
        if (!email || !password) {
            return NextResponse.json(
                { error: "Email and password are required" },
                { status: 400 }
            );
        }

        // Check the email
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json(
                { error: "Invalid email or password" },
                { status: 401 }
            );
        }

        // Check the password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return NextResponse.json(
                { error: "Invalid email or password" },
                { status: 402 }
            );
        }

        // Create a JWT token
        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

        return NextResponse.json(
            { error: "Sign-in successful", token },
            { status: 200 }
        );

    } catch (error: any) {
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }

};
