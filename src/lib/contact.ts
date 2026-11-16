export type ContactPayload = {
  name: string;
  email: string;
  message: string;
};

// Servi par le service « contact » du VPS (infra-vps/apps/contact), derrière Caddy : n'existe pas en `npm run dev`.
const endpoint = '/api/contact';

export async function sendContactEmail(payload: ContactPayload & { website: string }) {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Envoi du message impossible (HTTP ${response.status}).`);
  }
}
