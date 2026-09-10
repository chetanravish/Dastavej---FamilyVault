import axios from "axios";
import config from "../config/config.js";

const brevoClient = axios.create({
  baseURL: "https://api.brevo.com/v3",
  headers: {
    "api-key": config.BREVO_API_KEY, // new env var — see note below
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export const sendEmail = async (to, subject, text, html) => {
  try {
    const response = await brevoClient.post("/smtp/email", {
      sender: {
        email: config.BREVO_SENDER_EMAIL,
        name: config.BREVO_SENDER_NAME,
      },
      to: [{ email: to }],
      subject,
      textContent: text,
      htmlContent: html,
    });
    console.log("Email sent via Brevo API:", response.data.messageId);
    return response.data;
  } catch (error) {
    console.error(
      "Brevo API email failed:",
      error.response?.data || error.message
    );
    throw error;
  }
};