export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, message } = req.body || {};
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Invalid input' });
  }

  const apiKey = process.env.BREVO_API_KEY;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;
  const toEmail = process.env.CONTACT_TO_EMAIL;

  if (!apiKey || !fromEmail || !toEmail) {
    return res.status(500).json({ error: 'Server misconfigured' });
  }

  const payload = {
    sender: { name: 'Website Contact', email: fromEmail },
    replyTo: { email }, // user's email
    to: [{ email: toEmail }],
    subject: 'Mensaje de contacto desde el sitio web',
    htmlContent: `<p><strong>De:</strong> ${escapeHtml(name)} (${escapeHtml(email)})</p>
                  <p><strong>Mensaje:</strong><br/>${escapeHtml(message)}</p>`,
  };

  try {
    const resp = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'api-key': apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!resp.ok) {
      const errorText = await resp.text();
      return res.status(502).json({ error: 'Email failed', detail: errorText });
    }

    return res.status(200).json({ success: true });
  } catch (e: any) {
    return res.status(500).json({ error: 'Server error', detail: e?.message || e });
  }
}

function escapeHtml(s: string) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
