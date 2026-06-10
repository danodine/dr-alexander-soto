// api/send-email.mjs  (ESM, Node 20)
const MAX_FIELD_LENGTHS = {
  name: 100,
  email: 254,
  message: 4000,
};
const MAX_REQUEST_BYTES = 10_000;

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function normalizeText(value, maxLength) {
  return String(value || '').trim().slice(0, maxLength);
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export default async function handler(req, res) {
  try {
    if (req.method !== 'POST') {
      res.statusCode = 405;
      return res.json({ error: 'Method not allowed' });
    }

    const contentLength = Number(req.headers?.['content-length'] || 0);
    if (contentLength > MAX_REQUEST_BYTES) {
      res.statusCode = 413;
      return res.json({ error: 'Payload too large' });
    }

    // Body can be string or object depending on the runtime
    const raw = req.body ?? {};
    let body;
    try {
      body = typeof raw === 'string' ? JSON.parse(raw) : raw;
    } catch {
      res.statusCode = 400;
      return res.json({ error: 'Invalid JSON' });
    }

    const name = normalizeText(body.name, MAX_FIELD_LENGTHS.name);
    const email = normalizeText(body.email, MAX_FIELD_LENGTHS.email);
    const message = normalizeText(body.message, MAX_FIELD_LENGTHS.message);

    if (!name || !email || !message || !isValidEmail(email)) {
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
        subject:  `Nuevo mensaje de ${name.replace(/[\r\n]/g, ' ')}`,
        textContent: `Nuevo mensaje desde la web\n\nNombre: ${name}\nEmail: ${email}\n\nMensaje:\n${message}`,
        htmlContent: `<p><strong>Nombre:</strong> ${escapeHtml(name)}</p>
                      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
                      <p><strong>Mensaje:</strong><br/>${escapeHtml(message).replace(/\n/g, '<br/>')}</p>`
      }),
    });

    const text = await brevo.text();
    if (!brevo.ok) {
      console.error('Brevo error', brevo.status, text);
      res.statusCode = 502;
      return res.json({ error: 'Email provider error' });
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
    return res.json({ error: 'Unexpected error' });
  }
}
