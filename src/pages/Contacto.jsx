// src/pages/Contacto.jsx
import React, { useEffect, useRef } from "react";

export default function Contacto() {
  const mapRef = useRef(null);

  // --- Animate on intersect (equivalent to script.js) ---
  useEffect(() => {
    const elements = document.querySelectorAll(".animate");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting)
            entry.target.classList.add("animate-visible");
        });
      },
      { threshold: 0.2 }
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // --- Google Maps loader + init (inline replacement for <script ...maps.googleapis...>) ---
  useEffect(() => {
    const initMap = () => {
      const defaultLocation = { lat: -0.183714, lng: -78.502736 };
      if (!mapRef.current) return;

      const map = new window.google.maps.Map(mapRef.current, {
        center: defaultLocation,
        zoom: 15,
      });

      new window.google.maps.Marker({
        position: defaultLocation,
        map,
        title: "Fixed Marker",
      });
    };

    // If already loaded, just init
    if (window.google && window.google.maps) {
      initMap();
      return;
    }

    // Inject Google Maps script once
    const existing = document.querySelector('script[data-google-maps="true"]');
    if (existing) {
      existing.addEventListener("load", initMap, { once: true });
      return;
    }

    const script = document.createElement("script");
    script.setAttribute("data-google-maps", "true");
    const GMAPS_KEY = import.meta.env.VITE_GMAPS_KEY;
    console.log("Google Maps Key:", GMAPS_KEY);
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GMAPS_KEY}`;
    script.async = true;
    script.defer = true;
    script.onload = initMap;
    document.body.appendChild(script);

    return () => {};
  }, []);

  // --- Contact form submit (same endpoint/behavior as your script.js) ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const responseMessage = document.getElementById("responseMessage");

    const name = form.name.value;
    const email = form.email.value;
    const message = form.message.value;

    if (responseMessage) responseMessage.textContent = "Enviando mensaje...";

    try {
      const resp = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      if (resp.ok) {
        if (responseMessage)
          responseMessage.textContent = "¡El correo se envió con éxito!";
        form.reset();
      } else {
        if (responseMessage)
          responseMessage.textContent = "Error al enviar el correo.";
      }
    } catch (err) {
      console.error("Error:", err);
      if (responseMessage)
        responseMessage.textContent = "Error de red. Intente nuevamente.";
    }
  };

  return (
    <div className="bg-light">
      <main>
        <div className="contact-container container animate">
          {/* Titles */}
          <section className="contacto-titles">
            <h1>Contacte a su Traumatólogo Especialista en Pie y Tobillo</h1>
          </section>

          {/* Map + info */}
          <section id="map-section" className="contact-map-container">
            <div className="info-comtainer">
              <p className="ph6 ph6contacto">Ubicación</p>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Centro%20m%C3%A9dico%20Meditropoli%2C%20Av.%20Mariana%20de%20Jes%C3%BAs%20Oe-8%2C%20Quito%20170147%2C%20Ecuador"
                target="_blank"
                rel="noopener noreferrer"
                className="link-black"
              >
                Av. Mariana de Jesús OE7-02 y Nuño de Valderrama P.B.
              </a>
              <p className="ph6 ph6contacto">Información de contacto</p>
              <a href="tel:+593990165538" className="link-black">(+593) 990165538</a>
              <br></br>
              <a href="alexandersototoledo@gmail.com" className="link-black">
                alexandersototoledo@gmail.com (Personal)
              </a>
              <br></br>
              <a href="tel:+593990257861" className="link-black">(+593) 990257861 (Personal)</a>
              <br></br>
              <p className="ph6 ph6contacto">Formo parte de:</p>
              <a
                href="https://www.ceoecuador.com/team/alexander-soto/"
                className="link-black"
              >
                CEO
              </a>
              <br></br>
              <a
                href="https://www.hospitalmetropolitano.org/en/#nav-home"
                className="link-black"
              >
                Hospital Metropolitano
              </a>
            </div>

            <div className="info-comtainer">
              <p className="ph6 ph6contacto">Horario de atención</p>
              <p>Lunes: 09h00 a 13h00 - 15h00 a 18h00</p>
              <p>Miércoles: 09h00 a 13h00 - 14h00 a 17h00 (Tumbaco)</p>
              <p>Jueves: 15h00 a 19h00</p>
              <p>Viernes: 15:00h a 19:00h</p>
            </div>

            <div className="contact-map" id="map" ref={mapRef} />
          </section>

          {/* Contact form */}
          <section id="contacto" className="contact-form-container animate">
            <p className="ph2 ph2-escriba">ESCRÍBANOS</p>
            <form
              id="contactForm"
              className="form-container"
              onSubmit={handleSubmit}
            >
              <div className="form-group1">
                <input
                  className="name-input"
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Nombre completo"
                  required
                />
                <input
                  className="email-input"
                  type="email"
                  id="email"
                  name="email"
                  placeholder="E-mail"
                  required
                />
              </div>
              <div className="form-group2">
                <textarea
                  className="message-input"
                  id="message"
                  name="message"
                  placeholder="Mensaje"
                  required
                />
              </div>
              <button type="submit">Enviar mensaje</button>
            </form>
            <p id="responseMessage"></p>
          </section>
        </div>
      </main>
    </div>
  );
}
