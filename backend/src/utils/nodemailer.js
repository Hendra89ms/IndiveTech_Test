import nodemailer from "nodemailer";
import env from "dotenv";
env.config();

export const sendConfirmationEmail = async (user, token) => {
    const confirmationLink = `${process.env.CONFIRM_EMAIL_URL}/verify/${token}`;

    // TRANSPORTER
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.NODE_USER,
            pass: process.env.NODE_PASS,
        },
    });

    const emailContent = `
    <h2>Halo... ${user.name},</h2>
    <p>Thank you for registering on our platform.</p>
    <p>, please click the following link:</p>
    <a href='${confirmationLink}'>Verify Your Email</a>
  `;

    // // WHAT? SEND TO EMAIL
    const emailOptions = {
        from: `OurApp ${process.env.NODE_USER}`,
        to: user.email,
        subject: "Verify Your Email!",
        html: emailContent,
    };

    await transporter.sendMail(emailOptions).then((res) => {
        if (res) {
            console.log("Verification Email Sent!");
        }
    })
        .catch(err => {
            console.log(err)
        });
};
