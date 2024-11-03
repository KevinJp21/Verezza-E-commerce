import { ActionFunction } from "@remix-run/node";
import nodemailer from 'nodemailer';

export const action: ActionFunction = async ({ request }) => {
    const SMTP_USER = process.env.SMTP_USER;
    const SMTP_PASS = process.env.SMTP_PASS;
    const formData = await request.json();

    // Configura el transporte de correo electrónico
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true para 465, false para otros puertos
        auth: {
            user: SMTP_USER,
            pass: SMTP_PASS,
        },
    });

    // Crea el contenido del correo
    let mailOptions = {
        from: SMTP_USER,
        to: SMTP_USER,
        subject: "Nuevo PQRS",
        html: `
        <div style="font-family: Arial, sans-serif; color: #333; padding: 20px; line-height: 1.6;">
            <h2 style="color: rgba(219, 33, 33, 1); font-size: 2rem;">Nuevo PQRS Recibido</h2>
            <p><strong>Fecha:</strong> ${formData.fecha}</p>
            <p><strong>Sede:</strong> ${formData.sede}</p>
            <p><strong>Nombre:</strong> ${formData.nombre} ${formData.apellido}</p>
            <p><strong>Correo:</strong> ${formData.correo}</p>
            <p><strong>Celular:</strong> ${formData.celular}</p>
            <p><strong>Desea ser contactado:</strong> ${formData.contactar}</p>
            <p style="background-color: #f9f9f9; padding: 10px; border-radius: 5px;">${formData.mensaje}</p>
            <hr style="border: 1px solid #ddd;" />
        </div>
    `,
};

    try {
        // Envía el correo
        await transporter.sendMail(mailOptions);
        return new Response(JSON.stringify({ message: "Correo enviado con éxito" }), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.error("Error al enviar el correo:", error);
        return new Response(JSON.stringify({ message: "Error al enviar el correo" }), {
            status: 500,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }
};