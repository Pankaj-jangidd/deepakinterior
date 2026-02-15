import emailjs from "@emailjs/browser";
import { ContactFormData } from "./types";

// Initialize EmailJS with your public key
// This should be called once when the app loads
export const initEmailJS = () => {
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
  if (publicKey) {
    emailjs.init(publicKey);
  }
};

// Send contact form email
export const sendContactEmail = async (
  data: ContactFormData,
): Promise<boolean> => {
  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
  const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;

  if (!serviceId || !templateId) {
    console.warn("EmailJS not configured. Saving submission locally only.");
    return true; // Return true to allow local storage to work
  }

  try {
    const response = await emailjs.send(serviceId, templateId, {
      from_name: data.name,
      from_email: data.email,
      phone: data.phone || "Not provided",
      subject: data.project,
      message: data.message,
      to_name: "Deepak Interior & CNC",
    });

    return response.status === 200;
  } catch (error) {
    console.error("Failed to send email:", error);
    throw error;
  }
};
