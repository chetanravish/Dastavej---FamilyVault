import nodemailer from "nodemailer";
import config from "../config/config.js";

const transporter = nodemailer.createTransport({
  host: config.BREVO_HOST,
  port: Number(config.BREVO_PORT),
  secure: false, 
  auth: {
    user: config.BREVO_LOGIN,
    pass: config.BREVO_SMTP_KEY,
  },
    family: 4, 
  connectionTimeout: 10000,
});


transporter.verify((error) => {
  if (error) {
    console.error("Brevo SMTP connection failed:", error.message);
  } else {
    console.log("Brevo SMTP is ready to send emails");
  }
});

export const sendEmail = async (to, subject, text, html) => {
  return transporter.sendMail({
    from: `"${config.BREVO_SENDER_NAME}" <${config.BREVO_SENDER_EMAIL}>`,
    to,
    subject,
    text,
    html,
  });
};