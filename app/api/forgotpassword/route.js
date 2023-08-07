import { connectToDB } from "@/db";
import ResetPasswordToken from "@/models/resetPasswordTokenModel";
import User from "@/models/userModel";
import crypto from "crypto";
import nodemailer from "nodemailer";

export const POST = async (req, res) => {
  const body = await req.json();
  const email = body.email;

  try {
    await connectToDB();

    const user = await User.findOne({ email });

    if (user) {
      const userId = user._id;
      const userEmail = user.email;
      const token = crypto.randomUUID() + userId;
      const currentDate = new Date();
      const expiry = new Date(currentDate.getTime() + 15 * 60 * 1000);

      const resetPassWordToken = {
        userId,
        token,
        expiry
      }

      ResetPasswordToken.create(resetPassWordToken);

      const transporter = nodemailer.createTransport({
        host: "smtp-mail.outlook.com",
        port: 587,
        secure: false,
        auth: {
          user: process.env.SITE_EMAIL,
          pass: process.env.SITE_EMAIL_PASSWORD
        }
      });

      const emailContent = `
  <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          color: #333;
        }
        .reset-link {
          display: block;
          color: #007bff;
          text-decoration: none;
        }
      </style>
    </head>
    <body>
      <p>Hello,</p>
      <p>Here is your password reset link:</p>
      <a class="reset-link" href="https://thelistproject.com/resetpassword/${token}">
        https://thelistproject.com/resetpassword/${token}
      </a>
      <p>Please note that the link will expire in 15 minutes.</p>
      <p>Thank you,</p>
      <p>The List Project Team</p>
    </body>
  </html>
`;
  
      const sendEmail = async () => {
        const info = await transporter.sendMail({
          from: "thelistproject@outlook.com", // sender address
          to: userEmail, // list of receivers
          subject: "Password Reset Link", // Subject line
          text: `Here is your password reset link: https://thelistproject.com/resetpassword/${token}`, // plain text body
          html: emailContent
        });
  
        return info.messageId;
      }
  
      const response = await sendEmail();
    }

    return new Response(JSON.stringify({ success: true }));
  } catch (error) {
    console.log(error)
    return new Response(JSON.stringify({ success: false }));
  }
}

export const GET = async (req, res) => {
  const token = req.nextUrl.searchParams.get("token");

  try {
    await connectToDB();

    const resetPasswordToken = await ResetPasswordToken.findOne({ token });

    if (resetPasswordToken) {
      const userId = resetPasswordToken.userId;
      const currentDate = new Date();
      const expiry = resetPasswordToken.expiry;

      if (currentDate > expiry) {
        return new Response(JSON.stringify({ success: false, message: "Link has expired." }));
      } else {
        return new Response(JSON.stringify({ success: true, userId }));
      }

    } else {
      return new Response(JSON.stringify({ success: false, message: "Invalid token." }));
    }
  } catch (error) {
    console.log(error)
    return new Response(JSON.stringify({ success: false, message: "An error has occurred." }));
  }
}