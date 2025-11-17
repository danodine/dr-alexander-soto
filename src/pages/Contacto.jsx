// src/pages/Contacto.jsx
import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// 🔵 Fix Leaflet marker icon paths
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const customIcon = new L.Icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export default function Contacto() {
  const mapRef = useRef(null);

  // --- Animate on intersect ---
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

  // --- LEAFLET + OSM MAP ---
  useEffect(() => {
    if (!mapRef.current) return;

    const defaultLocation = { lat: -0.183714, lng: -78.502736 };

    const map = L.map(mapRef.current).setView(
      [defaultLocation.lat, defaultLocation.lng],
      15
    );

    // OpenStreetMap layer
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    // Marker with popup
    L.marker([defaultLocation.lat, defaultLocation.lng], {
      icon: customIcon,
    })
      .addTo(map)
      .bindPopup("Centro médico Mediterrópoli")
      .openPopup();

    return () => map.remove();
  }, []);

  // --- Contact form ---
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
        responseMessage.textContent = "¡El correo se envió con éxito!";
        form.reset();
      } else {
        responseMessage.textContent = "Error al enviar el correo.";
      }
    } catch (err) {
      console.error("Error:", err);
      responseMessage.textContent = "Error de red. Intente nuevamente.";
    }
  };

  const osmLink =
    "https://www.openstreetmap.org/?mlat=-0.183714&mlon=-78.502736#map=18/-0.183714/-78.502736";

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
                href={osmLink}
                target="_blank"
                rel="noopener noreferrer"
                className="link-black"
              >
                Av. Mariana de Jesús OE7-02 y Nuño de Valderrama P.B.
              </a>
              <p className="ph6 ph6contacto">Información de contacto</p>
              <a href="tel:+593990165538" className="link-black">
                (+593) 990165538
              </a>
              <br />
              <a
                href="mailto:alexandersototoledo@gmail.com"
                className="link-black"
              >
                alexandersototoledo@gmail.com (Personal)
              </a>
              <br />
              <a href="tel:+593990257861" className="link-black">
                (+593) 990257861 (Personal)
              </a>
              <br />
              <p className="ph6 ph6contacto">Formo parte de:</p>
              <a
                href="https://www.ceoecuador.com/team/alexander-soto/"
                className="link-black"
              >
                CEO
              </a>
              <br />
              <a
                href="https://www.hospitalmetropolitano.org/en/#nav-home"
                className="link-black"
              >
                Hospital Metropolitano
              </a>
            </div>

            <div className="info-comtainer">
              <p className="ph6 ph6contacto">Horario de atención</p>
              <p>Lunes: 09h00 a 13h00 - 15h00 a 18h00 (Quito)</p>
              <p>Miércoles: 09h00 a 13h00 (Tumbaco - La Martina) - 15h00 a 19h00 (Quito)</p>
              <p>Jueves: 15h00 a 19h00 (Quito)</p>
              <p>Viernes: 15h00h a 19h00h (Quito)</p>
            </div>

            {/* Leaflet Map */}
            <div className="contact-map" id="map" ref={mapRef} />
          </section>

          {/* Contact Form */}
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
