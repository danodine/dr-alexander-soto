// api/send-email.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';

// Only load dotenv locally for `vercel dev` (never in Vercel prod)
if (!process.env.VERCEL) {
  // ESM-safe dynamic import; won't run on Vercel
  await import('dotenv').then(m => m.config({ path: '.env.local' })).catch(() => {});
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    // Handle both string and object bodies
    const raw = req.body as any;
    const body = typeof raw === 'string' ? JSON.parse(raw) : (raw ?? {});
    const { name, email, message } = body as { name?: string; email?: string; message?: string };

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Invalid input' });
    }

    const apiKey = process.env.BREVO_API_KEY;
    const fromEmail = process.env.CONTACT_FROM_EMAIL; // must be verified or on an authenticated domain
    const toEmail = process.env.CONTACT_TO_EMAIL;

    if (!apiKey || !fromEmail || !toEmail) {
      console.error('Missing env', { hasKey: !!apiKey, fromEmail, toEmail });
      return res.status(500).json({ error: 'Server misconfigured: missing env vars' });
    }

    // Use global fetch (Node 18+). If you still see "fetch is not defined", set engines in package.json (step 2)
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
                      <p><strong>Mensaje:</strong><br/>${String(message).replace(/\n/g, '<br/>')}</p>`,
      }),
    });

    const text = await resp.text();
    if (!resp.ok) {
      console.error('Brevo error', resp.status, text);
      return res.status(502).json({ error: 'Brevo API error', status: resp.status, body: text });
    }

    // Success
    try {
      return res.status(200).json({ ok: true, data: JSON.parse(text) });
    } catch {
      return res.status(200).json({ ok: true, body: text });
    }
  } catch (err: any) {
    console.error('Unhandled error in send-email', err);
    return res.status(500).json({ error: 'Unexpected error', detail: err?.message ?? String(err) });
  }
}
