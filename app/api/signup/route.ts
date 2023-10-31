import { connectToDB } from "@util/database"
import { NextResponse } from "next/server"
import User from "@models/user";
import bcrypt from 'bcrypt';

export const POST = async (request: Request) => {

    const { email, password1, password2 } = await request.json()

    try {
        await connectToDB();

        if (!email || !password1 || !password2) {
            return NextResponse.json(
                { error: "You must complete the form" },
                { status: 401 }
            );
        }

        if (password1 !== password2) {
            return NextResponse.json(
                { error: "Passwords are not the same !" },
                { status: 402 }
            );
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return NextResponse.json(
                { error: "Email already registered" },
                { status: 403 }
            );
        }

        if (password1.length < 8) {
            return NextResponse.json(
                { error: "The password is not long enough" },
                { status: 404 }
            );
        }

        // Vérifier au moins une lettre minuscule, une majuscule, un chiffre et un caractère spécial
        const lowercaseRegex = /[a-z]/;
        const uppercaseRegex = /[A-Z]/;
        const digitRegex = /[0-9]/;
        const specialCharRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/;

        if (!lowercaseRegex.test(password1) ||
            !uppercaseRegex.test(password1) ||
            !digitRegex.test(password1) ||
            !specialCharRegex.test(password1)) {
            return NextResponse.json(
                { error: "The password is not complicated enough" },
                { status: 405 }
            );
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password1, saltRounds);
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
