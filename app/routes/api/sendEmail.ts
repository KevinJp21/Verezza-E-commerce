import { ActionFunction } from "@remix-run/node";
import nodemailer from 'nodemailer';

export const action: ActionFunction = async ({ request }) => {
    const SMTP_USER = process.env.SMTP_USER;
    const SMTP_PASS = process.env.SMTP_PASS;

    const formData = await request.formData();
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        subject: formData.get('subject'),
        message: formData.get('message'),
    };

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
        subject: "Nuevo mensaje de Atelier",
        html: `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap" rel="stylesheet">
            </head>
            <body>
                 <div style="font-family: 'DM Sans', sans-serif; max-width: 600px; margin: 0 auto; padding: 30px; background-color: white;">
                    <div style="text-align: center; border-bottom: 2px solid rgba(232, 232, 232, 1); padding-bottom: 20px; margin-bottom: 30px;">
                        <h2 style="color: rgba(51, 51, 51, 1); font-size: 24px; margin: 0; text-transform: uppercase; letter-spacing: 2px; font-weight: 400;">VEREZZA</h2>
                        <p style="color: rgba(183, 183, 183, 1); font-size: 14px; margin-top: 5px;">Nueva Consulta</p>
                    </div>
        
                    <div style="background-color: rgba(245, 245, 245, 1); padding: 25px; border-radius: 8px; margin-bottom: 25px;">
                        <div style="margin-bottom: 20px;">
                            <p style="color: rgba(183, 183, 183, 1); font-size: 12px; text-transform: uppercase; margin: 0;">Nombre</p>
                            <p style="color: rgba(51, 51, 51, 1); font-size: 16px; margin: 5px 0;">${data.name}</p>
                        </div>
            
                        <div style="margin-bottom: 20px;">
                            <p style="color: rgba(183, 183, 183, 1); font-size: 12px; text-transform: uppercase; margin: 0;">Correo</p>
                            <p style="color: rgba(51, 51, 51, 1); font-size: 16px; margin: 5px 0;">${data.email}</p>
                        </div>
            
                        <div style="margin-bottom: 20px;">
                            <p style="color: rgba(183, 183, 183, 1); font-size: 12px; text-transform: uppercase; margin: 0;">Teléfono</p>
                            <p style="color: rgba(51, 51, 51, 1); font-size: 16px; margin: 5px 0;">${data.phone}</p>
                        </div>
            
                        <div style="margin-bottom: 20px;">
                            <p style="color: rgba(183, 183, 183, 1); font-size: 12px; text-transform: uppercase; margin: 0;">Asunto</p>
                            <p style="color: rgba(51, 51, 51, 1); font-size: 16px; margin: 5px 0;">${data.subject}</p>
                        </div>
                    </div>
                    
                    <div style="background-color: white; border: 1px solid rgba(232, 232, 232, 1); padding: 25px; border-radius: 8px;">
                        <p style="color: rgba(183, 183, 183, 1); font-size: 12px; text-transform: uppercase; margin: 0;">Mensaje</p>
                        <p style="color: rgba(51, 51, 51, 1); font-size: 16px; line-height: 1.6; margin: 10px 0;">${data.message}</p>
                    </div>
                    
                    <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 2px solid rgba(232, 232, 232, 1);">
                        <p style="color: rgba(183, 183, 183, 1); font-size: 12px; margin: 0;">© ${new Date().getFullYear()} VEREZZA. Todos los derechos reservados.</p>
                    </div>
                </div>
            </body>
            </html>
    `,
    };

    try {
        // Envía el correo
        await transporter.sendMail(mailOptions);
        return new Response(JSON.stringify({ message: "EMAIL_SENT" }), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.error("Error al enviar el correo:", error);
        return new Response(JSON.stringify({ error: "EMAIL_ERROR_SEND" }), {
            status: 500,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }
};