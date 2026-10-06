import emailjs from '@emailjs/browser';

export type ContactPayload = {
  name: string;
  email: string;
  message: string;
};

const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;

export function initEmailJs() {
  if (!publicKey) {
    console.warn('EmailJS public key manquante. Le formulaire restera inactif.');
    return;
  }

  emailjs.init({ publicKey });
}

export async function sendContactEmail(payload: ContactPayload) {
  if (!publicKey || !serviceId || !templateId) {
    throw new Error("Configuration EmailJS absente. Vérifie tes variables d'environnement.");
  }

  return emailjs.send(serviceId, templateId, {
    from_name: payload.name,
    from_email: payload.email,
    message: payload.message,
  });
}
