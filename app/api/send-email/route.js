const MAX_FIELD_LENGTHS = {
  name: 100,
  email: 254,
  message: 4000,
};
const MAX_REQUEST_BYTES = 10_000;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const rateLimitStore = new Map();

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function normalizeText(value, maxLength) {
  return String(value || "").trim().slice(0, maxLength);
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function getClientIp(request) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

function isRateLimited(clientIp) {
  const now = Date.now();
  const record = rateLimitStore.get(clientIp);

  if (!record || now - record.startedAt > RATE_LIMIT_WINDOW_MS) {
    rateLimitStore.set(clientIp, { count: 1, startedAt: now });
    return false;
  }

  record.count += 1;
  return record.count > RATE_LIMIT_MAX_REQUESTS;
}

export async function POST(request) {
  try {
    const contentType = request.headers.get("content-type") || "";
    const contentLength = Number(request.headers.get("content-length") || 0);

    if (!contentType.includes("application/json")) {
      return Response.json(
        { error: "El contenido debe ser JSON." },
        { status: 415 },
      );
    }

    if (contentLength > MAX_REQUEST_BYTES) {
      return Response.json(
        { error: "El mensaje es demasiado grande." },
        { status: 413 },
      );
    }

    const clientIp = getClientIp(request);
    if (isRateLimited(clientIp)) {
      return Response.json(
        { error: "Demasiados intentos. Intente nuevamente mas tarde." },
        { status: 429 },
      );
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return Response.json({ error: "JSON invalido." }, { status: 400 });
    }

    const name = normalizeText(body.name, MAX_FIELD_LENGTHS.name);
    const email = normalizeText(body.email, MAX_FIELD_LENGTHS.email);
    const message = normalizeText(body.message, MAX_FIELD_LENGTHS.message);

    if (!name || !email || !message || !isValidEmail(email)) {
      return Response.json(
        { error: "Campos invalidos." },
        { status: 400 },
      );
    }

    const apiKey = process.env.BREVO_API_KEY;
    const fromEmail = process.env.CONTACT_FROM_EMAIL;
    const toEmail = process.env.CONTACT_TO_EMAIL;

    if (!apiKey || !fromEmail || !toEmail) {
      console.error("Email route missing required Brevo environment variables.");
      return Response.json(
        { error: "Servicio de correo no configurado." },
        { status: 500 },
      );
    }

    const brevoResponse = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": apiKey,
      },
      body: JSON.stringify({
        sender: { email: fromEmail, name: "Dr. Alexander Soto" },
        to: [{ email: toEmail }],
        replyTo: { email, name },
        subject: `Nuevo mensaje de contacto de ${name.replace(/[\r\n]/g, " ")}`,
        textContent: `Nuevo mensaje desde la web\n\nNombre: ${name}\nEmail: ${email}\n\nMensaje:\n${message}`,
        htmlContent: `
          <h2>Nuevo mensaje desde la web</h2>
          <p><strong>Nombre:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Mensaje:</strong></p>
          <p>${escapeHtml(message).replace(/\n/g, "<br/>")}</p>
        `,
      }),
    });

    if (!brevoResponse.ok) {
      const providerBody = await brevoResponse.text();
      console.error("Brevo email error", brevoResponse.status, providerBody);
      return Response.json(
        { error: "No se pudo enviar el correo." },
        { status: 502 },
      );
    }

    return Response.json(
      { message: "Correo enviado correctamente." },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error enviando correo:", error);

    return Response.json(
      { error: "No se pudo enviar el correo." },
      { status: 500 },
    );
  }
}
