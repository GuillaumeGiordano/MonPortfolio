
import { connectToDB } from "@util/database"
import { NextRequest, NextResponse } from "next/server"
import User from "@models/User";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;

export const POST = async (request: Request) => {

    const { email, password } = await request.json()

    try {
        await connectToDB();

        if (!email || !password) {
            return NextResponse.json(
                { error: "Email and password are required" },
                { status: 401 }
            );
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json(
                { error: "Email already registered" },
                { status: 500 }
            );
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = new User(
            {
                email: email,
                password: hashedPassword,
            }
        )

        await newUser.save()

        // const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, { expiresIn: '6h' });

        return NextResponse.json(
            { error: "Sign-up successful" },
            { status: 200 }
        );
    } catch (error: any) {
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }

};
