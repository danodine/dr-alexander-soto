"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { loadServices } from "@/lib/servicesApi";

const ServiceModal = dynamic(() => import("@/components/ServiceModal"), {
  ssr: false,
});

export default function ServiciosPage({ onNavigate }) {
  const [services, setServices] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [active, setActive] = useState(null);

  const heroRef = useRef(null);

  useEffect(() => {
    loadServices()
      .then((data) => setServices(data))
      .catch((err) => console.error("Error cargando servicios:", err));
  }, []);

  const { patologias, tratamientos } = useMemo(
    () => ({
      patologias: services.filter((s) => s.categoria === "patologia"),
      tratamientos: services.filter((s) => s.categoria === "tratamiento"),
    }),
    [services],
  );

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    gsap.from(
      hero.querySelectorAll(".future-eyebrow, .future-title, .future-subtitle"),
      {
        y: 24,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
      },
    );
  }, []);

  const openModal = (service) => {
    setActive(service);
    setModalOpen(true);
  };

  return (
    <main className="services-future-page">
      <div className="future-grid-bg" />
      <div className="future-orb one" />
      <div className="future-orb two" />
      <div className="future-orb three" />

      <section ref={heroRef} className="future-hero services-hero-fix">
        <div className="container future-hero-shell">
          {/* SPA BACK BUTTON */}
          <button
            onClick={() => onNavigate("home")}
            className="future-link"
            style={{
              marginBottom: "32px",
              cursor: "pointer",
              // Removed complex inline styles so the updated .future-link class takes effect.
            }}
          >
            &larr; Volver al inicio
          </button>

          <p className="future-eyebrow">SPECIALIZED CARE</p>

          <h1 className="future-title">
            Tratamientos con <span>precisión</span>
          </h1>

          <p className="future-subtitle">
            Una experiencia visual más inmersiva para presentar patologías,
            procedimientos y soluciones quirúrgicas en pie y tobillo, sin perder
            claridad ni elegancia.
          </p>
        </div>
      </section>

      <section id="catalogo-servicios" style={{ padding: "60px 0 60px 0px" }}>
        <div className="container">
          <div style={{ marginBottom: "50px" }}>
            <p className="future-eyebrow">Patologías</p>
            <div
              className="future-card-grid"
              style={{
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              }}
            >
              {patologias.map((service) => (
                <button
                  key={service.id}
                  type="button"
                  className="future-hover-card"
                  onClick={() => openModal(service)}
                >
                  <Image
                    src={service.image}
                    alt={service.title}
                    width={58}
                    height={58}
                    style={{
                      width: "58px",
                      height: "58px",
                      objectFit: "contain",
                      marginBottom: "12px",
                    }}
                  />
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: "50px" }}>
            <p className="future-eyebrow">Tratamientos y procedimientos</p>
            <div
              className="future-card-grid"
              style={{
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              }}
            >
              {tratamientos.map((service) => (
                <button
                  key={service.id}
                  type="button"
                  className="future-hover-card"
                  onClick={() => openModal(service)}
                >
                  <Image
                    src={service.image}
                    alt={service.title}
                    width={58}
                    height={58}
                    style={{
                      width: "58px",
                      height: "58px",
                      objectFit: "contain",
                      marginBottom: "12px",
                    }}
                  />
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="future-panel">
            <div className="future-panel-inner" style={{ padding: "28px" }}>
              <p className="future-eyebrow" style={{ marginBottom: "16px" }}>
                Fisioterapia
              </p>
              <h2 style={{ marginTop: 0, color: "#fff" }}>
                Recuperación complementaria
              </h2>
              <p
                style={{
                  color: "var(--muted)",
                  maxWidth: "70ch",
                  lineHeight: "1.8",
                }}
              >
                Tratamientos de fisioterapia para mejorar la movilidad, reducir
                dolor y acompañar la recuperación del paciente en coordinación
                con el equipo médico.
              </p>
              <div style={{ marginTop: "22px" }}>
                <a
                  className="future-link"
                  href="https://www.ceoecuador.com/servicios/#fisioterapia"
                  target="_blank"
                  rel="noreferrer"
                >
                  Ir a CEO
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {modalOpen && active && (
        <ServiceModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          service={active}
        />
      )}
    </main>
  );
}
