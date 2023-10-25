require("dotenv").config();

import { NextResponse } from "next/server";
import nodemailer from 'nodemailer';
import { isSafeInput, isMailValid } from "@util/inputValidatorUtil"

const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;

export const POST = async (request: Request) => {
    const { name, email, message } = await request.json();


    if (!name || !email || !message) {
        return NextResponse.json(
            { error: "Le formulaire doit être remplit" },
            { status: 400 }
        );
    }

    if (!isMailValid(email)) {
        return NextResponse.json(
            { error: "Le formulaire ne contient pas de mail" },
            { status: 402 }
        );
    }


    // Configuration du transporteur Nodemailer
    const transport = nodemailer.createTransport({
        host: 'smtp.ionos.fr', // Serveur sortant (SMTP) d'IONOS
        port: 465, // Port sortant avec SSL activé
        secure: true, // Utilisez true pour SSL
        auth: {
            user: EMAIL_USER,
            pass: EMAIL_PASSWORD,
        },
    });

    // Définition du contenu de l'e-mail
    const mailOptions = {
        from: EMAIL_USER, // Votre adresse e-mail
        to: EMAIL_USER, // Adresse e-mail du destinataire
        cc: email,
        subject: `Nouveau message de ${name}`,
        text: `Nom: ${name}\nE-mail: ${email}\nMessage: ${message}`,
    };



    try {
        // Envoi de l'e-mail
        await transport.sendMail(mailOptions);

        // Réponse réussie
        return NextResponse.json(
            { message: "Email sent" },
            { status: 200 }
        );


    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Une erreur s'est produite lors de l'envoi de l'e-mail" },
            { status: 500 }
        );
    }
};
