// src/pages/Servicios.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ServiceModal from "../components/ServiceModal";
import { loadServices } from "../lib/servicesApi";

export default function Servicios() {
  const [patologias, setPatologias] = useState([]);
  const [tratamientos, setTratamientos] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [active, setActive] = useState(null);

  useEffect(() => {
    loadServices()
      .then((data) => {
        setPatologias(data.filter((s) => s.categoria === "patologia"));
        setTratamientos(data.filter((s) => s.categoria === "tratamiento"));
      })
      .catch((err) => console.error("Error cargando servicios:", err));
  }, []);

  // Animate on scroll
  useEffect(() => {
    const elements = document.querySelectorAll(".animate");
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("animate-visible")),
      { threshold: 0.2 }
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // WhatsApp
  useEffect(() => {
    const btn = document.querySelector(".whatsapp-button");
    const onClick = (ev) => {
      ev.preventDefault();
      const url = `https://wa.me/593990165538?text=${encodeURIComponent(
        "Hola, me gustaría obtener más información sobre sus servicios."
      )}`;
      window.open(url, "_blank");
    };
    if (btn) btn.addEventListener("click", onClick);
    return () => btn && btn.removeEventListener("click", onClick);
  }, []);

  const openModal = (service) => {
    setActive(service);
    setModalOpen(true);
  };
  const closeModal = () => setModalOpen(false);

  const Card = ({ service }) => (
    <div className="card" style={{ cursor: "pointer" }}>
      <div className="card-icon" onClick={() => openModal(service)}>
        <img src={service.image} alt={`Icono ${service.title}`} />
      </div>
      <p className="ph3 ph3-servicios" onClick={() => openModal(service)}>
        {service.title}
      </p>
      <p onClick={() => openModal(service)}>{service.description}</p>
    </div>
  );

  return (
    <div className="bg-light">
      <header className="bg-primary text-white text-center py-4">
        <div id="navbar"></div>
      </header>

      <main className="container my-4">
        <section id="servicios-contenedor">
          {/* Patologías */}
          <section id="patologias">
            <div>
              <p className="ph2 ph2-servicios">Patologías</p>
            </div>
            <div className="services-body">
              <div className="grid-container animate" id="services-list">
                {patologias.map((s) => (
                  <Card key={s.id} service={s} />
                ))}
              </div>
            </div>
          </section>

          {/* Tratamientos */}
          <section id="tratamientos">
            <div>
              <p className="ph2 ph2-servicios">Tratamientos y Procedimientos</p>
            </div>
            <div className="services-body">
              <div className="grid-container animate" id="services-list-2">
                {tratamientos.map((s) => (
                  <Card key={s.id} service={s} />
                ))}
              </div>
            </div>
          </section>

          {/* Fisioterapia block unchanged */}
          <section id="fisioterapia">
            <div className="fisioterapia">
              <p className="ph2 ph2-servicios">Fisioterapia</p>
              <p>
                Tratamientos de fisioterapia para mejorar la calidad de vida de
                nuestros pacientes se realizan en el CEO.
              </p>
              <div className="fisio-container">
                <a
                  className="card-fisio card"
                  target="_blank"
                  rel="noreferrer"
                  href="https://www.ceoecuador.com/servicios/#fisioterapia"
                  title="Sitio externo (se abre en una nueva pestaña)"
                >
                  <span hidden={true}>Fisioterapia CEO. (enlace externo)</span>
                  <div>
                    <div className="card-icon">
                      <img src="/assets/images/CEO-logo.png" alt="Logo del CEO" />
                    </div>
                    <div>
                      <p className="ph3">CEO</p>
                      <p>
                        Contamos con un centro de fisioterapia, donde los
                        terapistas y los médicos trabajan de forma coordinada,
                        garantizando el mejor tratamiento para el paciente.
                      </p>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </section>
        </section>
      </main>

      {/* Footer placeholder; real <Footer /> renders in App */}
      <section id="footer"></section>

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/593990165538?text=Hello,%20I%20need%20assistance!"
        target="_blank"
        rel="noreferrer"
        className="whatsapp-button"
      >
        <img src="/assets/icons/icons8-whatsapp-96.png" alt="Icono de WhatsApp" />
      </a>

      {/* Modal */}
      <ServiceModal open={modalOpen} onClose={closeModal} service={active} />
    </div>
  );
}
