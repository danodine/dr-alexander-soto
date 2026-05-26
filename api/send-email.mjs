// api/send-email.mjs  (ESM, Node 20)
export default async function handler(req, res) {
  try {
    if (req.method !== 'POST') {
      res.statusCode = 405;
      return res.json({ error: 'Method not allowed' });
    }

    // Body can be string or object depending on the runtime
    const raw = req.body ?? {};
    const body = typeof raw === 'string' ? JSON.parse(raw) : raw;
    const { name, email, message } = body;

    if (!name || !email || !message) {
      res.statusCode = 400;
      return res.json({ error: 'Invalid input' });
    }

    const apiKey    = process.env.BREVO_API_KEY;
    const fromEmail = process.env.CONTACT_FROM_EMAIL; // must be verified in Brevo or domain authenticated
    const toEmail   = process.env.CONTACT_TO_EMAIL;

    if (!apiKey || !fromEmail || !toEmail) {
      console.error('Missing env', { hasKey: !!apiKey, fromEmail, toEmail });
      res.statusCode = 500;
      return res.json({ error: 'Server misconfigured: missing env vars' });
    }

    const brevo = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': apiKey,
      },
      body: JSON.stringify({
        sender:   { email: fromEmail, name: 'Website Contact' },
        to:       [{ email: toEmail }],
        replyTo:  { email },
        subject:  `Nuevo mensaje de ${name}`,
        htmlContent: `<p><strong>Nombre:</strong> ${name}</p>
                      <p><strong>Email:</strong> ${email}</p>
                      <p><strong>Mensaje:</strong><br/>${String(message).replace(/\n/g, '<br/>')}</p>`
      }),
    });

    const text = await brevo.text();
    if (!brevo.ok) {
      console.error('Brevo error', brevo.status, text);
      res.statusCode = 502;
      return res.json({ error: 'Brevo API error', status: brevo.status, body: text });
    }

    try {
      res.statusCode = 200;
      return res.json({ ok: true, data: JSON.parse(text) });
    } catch {
      res.statusCode = 200;
      return res.json({ ok: true, body: text });
    }
  } catch (err) {
    console.error('Unhandled error in send-email', err);
    res.statusCode = 500;
    return res.json({ error: 'Unexpected error', detail: err?.message ?? String(err) });
  }
}
