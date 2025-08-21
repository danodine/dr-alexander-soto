import type { VercelRequest, VercelResponse } from '@vercel/node';

if (!process.env.VERCEL) {
  require('dotenv').config({ path: '.env.local' });
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { name, email, message } = (req.body ?? {}) as { name?: string; email?: string; message?: string };
  if (!name || !email || !message) return res.status(400).json({ error: 'Invalid input' });

  const apiKey = process.env.BREVO_API_KEY;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;
  const toEmail = process.env.CONTACT_TO_EMAIL;

  if (!apiKey || !fromEmail || !toEmail) {
    return res.status(500).json({ error: 'Server misconfigured: missing env vars' });
  }

  try {
    const resp = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': apiKey,
      },
      body: JSON.stringify({
        sender: { email: fromEmail, name: 'Website Contact' },
        to: [{ email: toEmail }],
        replyTo: { email },
        subject: `Nuevo mensaje de ${name}`,
        htmlContent: `<p><strong>Nombre:</strong> ${name}</p>
                      <p><strong>Email:</strong> ${email}</p>
                      <p><strong>Mensaje:</strong><br/>${message.replace(/\n/g, '<br/>')}</p>`,
      }),
    });

    if (!resp.ok) {
      const text = await resp.text();
      return res.status(502).json({ error: 'Brevo API error', status: resp.status, body: text });
    }

    const data = await resp.json();
    return res.status(200).json({ ok: true, data });
  } catch (err: any) {
    return res.status(500).json({ error: 'Unexpected error', detail: err?.message ?? String(err) });
  }
}
