import Image from "next/image";
import Link from "next/link";
import { getServicesByCategory } from "@/lib/services";

export const metadata = {
  title: "Servicios de pie y tobillo",
  description:
    "Patologias, tratamientos y procedimientos de pie y tobillo atendidos por el Dr. Alexander Soto en Quito.",
  alternates: {
    canonical: "/servicios",
  },
  openGraph: {
    type: "website",
    url: "/servicios",
    title: "Servicios de pie y tobillo | Dr. Alexander Soto",
    description:
      "Atencion especializada en patologias, tratamientos y procedimientos de pie y tobillo en Quito.",
    images: [
      {
        url: "/assets/images/Dr-Alexander-Soto.webp",
        width: 1200,
        height: 900,
        alt: "Dr. Alexander Soto, especialista en pie y tobillo",
      },
    ],
  },
};

function ServiceGrid({ id, title, services }) {
  return (
    <section id={id} style={{ marginBottom: "54px", scrollMarginTop: "110px" }}>
      <p className="future-eyebrow" style={{ marginBottom: "18px" }}>
        {title}
      </p>
      <div
        className="future-card-grid"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))" }}
      >
        {services.map((service) => (
          <article key={service.id} className="future-hover-card">
            <Image
              src={service.image}
              alt={service.title}
              width={78}
              height={78}
              style={{
                width: "78px",
                height: "78px",
                objectFit: "contain",
                marginBottom: "18px",
              }}
            />
            <h2 style={{ fontSize: "1.35rem" }}>{service.title}</h2>
            <p>{service.description}</p>
            <Link
              href={`/servicios/${service.id}`}
              className="future-link"
              style={{ width: "100%", marginTop: "18px" }}
            >
              Ver detalle
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}

function PhysiotherapySection() {
  return (
    <section className="services-physio-section" id="fisioterapia">
      <div className="services-physio-panel">
        <div className="services-physio-copy">
          <p className="future-eyebrow">Fisioterapia</p>
          <h2>Recuperación coordinada en CEO</h2>
          <p>
            Tratamientos de fisioterapia para mejorar la calidad de vida de
            nuestros pacientes se realizan en el CEO.
          </p>
          <a
            href="https://www.ceoecuador.com/servicios/#fisioterapia"
            target="_blank"
            rel="noopener noreferrer"
            className="future-link services-physio-link"
          >
            Ver fisioterapia en CEO
          </a>
        </div>

        <a
          href="https://www.ceoecuador.com/servicios/#fisioterapia"
          target="_blank"
          rel="noopener noreferrer"
          className="services-physio-logo-card"
          aria-label="Abrir fisioterapia en CEO"
        >
          <Image
            src="/assets/images/ceo-color.png"
            alt="Logo del CEO"
            width={128}
            height={128}
          />
          <strong>CEO</strong>
          <span>
            Contamos con un centro de fisioterapia, donde los terapistas y los
            médicos trabajan de forma coordinada, garantizando el mejor
            tratamiento para el paciente.
          </span>
        </a>
      </div>
    </section>
  );
}

export default function ServiciosPage() {
  const patologias = getServicesByCategory("patologia");
  const tratamientos = getServicesByCategory("tratamiento");

  return (
    <main className="services-future-page">
      <div className="future-grid-bg" />
      <div className="future-orb one" />
      <div className="future-orb two" />
      <div className="future-orb three" />

      <section className="future-hero services-hero-fix">
        <div className="container future-hero-shell">
          <Link
            href="/"
            className="future-link"
            style={{ marginBottom: "32px" }}
          >
            Volver al inicio
          </Link>
          <p className="future-eyebrow">Atencion especializada</p>
          <h1 className="future-title">
            Servicios de <span>pie y tobillo</span>
          </h1>
          <p className="future-subtitle">
            Informacion clara sobre patologias, procedimientos quirurgicos y
            alternativas de tratamiento para recuperar movilidad y aliviar dolor.
          </p>
        </div>
      </section>

      <section style={{ padding: "0 0 100px" }}>
        <div className="container">
          <ServiceGrid id="patologias" title="Patologias" services={patologias} />
          <ServiceGrid
            id="tratamientos"
            title="Tratamientos y procedimientos"
            services={tratamientos}
          />
          <PhysiotherapySection />
        </div>
      </section>
    </main>
  );
}
