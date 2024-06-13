import nodemailer from 'nodemailer';
import dotenv from "dotenv"
dotenv.config()

let host = 'smtp-relay.brevo.com';
let port = 587;
let user = process.env.SENDINBLUE_USERNAME;
let pass = process.env.SENDINBLUE_PASSWORD;

let transport = nodemailer.createTransport({
  host,
  port,
  auth: {
    user,
    pass
  }
});

export const sendEmail = async (emailAddress) => {
    const mailOptions = {
        from: user,
        to: emailAddress,
        subject: 'Disconnection of your Operator Node',
        text: 'Here is the link to the Operator Node Dashboard',
        html: `<p>Test</p>`
    };

    try {
        const info = await transport.sendMail(mailOptions);
        console.log('Email sent:', info.response);
        return info.response;
      } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Email sending failed');
      }
};