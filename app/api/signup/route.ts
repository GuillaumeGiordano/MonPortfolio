
import { connectToDB } from "@util/database"
import { NextResponse } from "next/server"
import User from "@models/user";
import bcrypt from 'bcrypt';
import { IUser } from "@types";

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
                { status: 402 }
            );
        }


        if (password.length < 8) {
            return NextResponse.json(
                { error: "The password is not long enough" },
                { status: 403 }
            );
        }

        // Vérifier au moins une lettre minuscule, une majuscule, un chiffre et un caractère spécial
        const lowercaseRegex = /[a-z]/;
        const uppercaseRegex = /[A-Z]/;
        const digitRegex = /[0-9]/;
        const specialCharRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/;

        if (!lowercaseRegex.test(password) ||
            !uppercaseRegex.test(password) ||
            !digitRegex.test(password) ||
            !specialCharRegex.test(password)) {
            return NextResponse.json(
                { error: "The password is not complicated enough" },
                { status: 404 }
            );
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const allUser = await User.find();
        let role = "user";
        if (allUser.length === 0) {
            role = "admin";
        }

        const newUser = new User(
            {
                email: email,
                password: hashedPassword,
                role: role,
            }
        )

        await newUser.save()

        return NextResponse.json(
            { message: "Sign-up successful" },
            { status: 200 }
        );
    } catch (error: any) {
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }

};
