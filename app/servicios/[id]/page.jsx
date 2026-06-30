import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { absoluteUrl, doctorProfile, jsonLdScript, siteUrl } from "@/lib/seo";
import { getAllServices, getServiceById } from "@/lib/services";

export function generateStaticParams() {
  return getAllServices().map((service) => ({
    id: service.id,
  }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const service = getServiceById(id);

  if (!service) {
    return {
      title: "Servicio no encontrado",
      robots: { index: false, follow: false },
    };
  }

  const description = service.description.slice(0, 158);
  const url = `/servicios/${service.id}`;

  return {
    title: service.title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "article",
      url,
      title: `${service.title} | Dr. Alexander Soto`,
      description,
      images: [
        {
          url: service.image,
          width: 512,
          height: 512,
          alt: service.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: service.title,
      description,
      images: [service.image],
    },
  };
}

export default async function ServicioDetailPage({ params }) {
  const { id } = await params;
  const service = getServiceById(id);

  if (!service) notFound();

  const gallery = service.imagesCarucel.slice(0, 4);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    "@id": `${siteUrl}/servicios/${service.id}#webpage`,
    url: absoluteUrl(`/servicios/${service.id}`),
    name: `${service.title} | ${doctorProfile.name}`,
    description: service.description,
    inLanguage: "es-EC",
    about: {
      "@type":
        service.categoria === "tratamiento"
          ? "MedicalProcedure"
          : "MedicalCondition",
      name: service.title,
      description: service.descriptionLarga || service.description,
      signOrSymptom: service.symptoms.map((symptom) => ({
        "@type": "MedicalSignOrSymptom",
        name: symptom,
      })),
    },
    reviewedBy: {
      "@type": "Physician",
      "@id": `${siteUrl}/#person`,
      name: doctorProfile.name,
      medicalSpecialty: "Orthopedic",
    },
    publisher: {
      "@type": "MedicalBusiness",
      "@id": `${siteUrl}/#medical-practice`,
      name: doctorProfile.name,
    },
  };

  return (
    <main className="services-future-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(jsonLd) }}
      />
      <div className="future-grid-bg" />
      <div className="future-orb one" />
      <div className="future-orb two" />

      <section className="future-hero services-hero-fix">
        <div className="container future-hero-shell">
          <Link
            href="/servicios"
            className="future-link"
            style={{ marginBottom: "32px" }}
          >
            Volver a servicios
          </Link>
          <p className="future-eyebrow">
            {service.categoria === "tratamiento"
              ? "Tratamiento"
              : "Patologia"}
          </p>
          <h1 className="future-title">
            {service.title}
          </h1>
          <p className="future-subtitle">{service.description}</p>
        </div>
      </section>

      <section style={{ padding: "0 0 110px" }}>
        <div className="blog-editorial-container">
          <div className="blog-article-grid">
            <article className="blog-main-content">
              <div className="blog-note-box">
                <h2 style={{ marginTop: 0 }}>Resumen clinico</h2>
                <p>{service.descriptionLarga || service.description}</p>
              </div>

              {service.symptoms.length > 0 && (
                <>
                  <h2
                    className="ph2"
                    style={{
                      color: "#fff",
                      fontSize: "2.2rem",
                      marginBottom: "20px",
                    }}
                  >
                    Sintomas frecuentes
                  </h2>
                  <ul className="blog-check-list">
                    {service.symptoms.map((symptom) => (
                      <li key={symptom}>{symptom}</li>
                    ))}
                  </ul>
                </>
              )}

              {gallery.length > 0 && (
                <>
                  <h2
                    className="ph2"
                    style={{
                      color: "#fff",
                      fontSize: "2.2rem",
                      margin: "46px 0 20px",
                    }}
                  >
                    Galeria visual
                  </h2>
                  <div
                    className="future-card-grid"
                    style={{
                      gridTemplateColumns:
                        "repeat(auto-fit, minmax(220px, 1fr))",
                    }}
                  >
                    {gallery.map((item, index) => (
                      <figure
                        key={item.image}
                        className="future-hover-card"
                        style={{ margin: 0 }}
                      >
                        <Image
                          src={item.image}
                          alt={item.altText || `${service.title} ${index + 1}`}
                          width={460}
                          height={320}
                          style={{
                            width: "100%",
                            height: "auto",
                            objectFit: "cover",
                            borderRadius: "14px",
                          }}
                        />
                      </figure>
                    ))}
                  </div>
                </>
              )}
            </article>

            <aside className="blog-sidebar">
              <div className="sidebar-reading-block">
                <div className="blog-author-strip">
                  <Image
                    src="/assets/images/Dr-Alexander-Soto.webp"
                    className="author-mini-photo"
                    alt="Dr. Soto"
                    width={44}
                    height={44}
                  />
                  <div className="author-mini-info">
                    <p className="name">Dr. Alexander Soto</p>
                    <p className="role">Especialista en pie y tobillo</p>
                  </div>
                </div>
              </div>

              <div className="future-panel" style={{ marginTop: "34px" }}>
                <div className="future-panel-inner" style={{ padding: "24px" }}>
                  <p className="future-eyebrow">Consulta especializada</p>
                  <p style={{ color: "var(--muted)", lineHeight: 1.7 }}>
                    La evaluacion medica permite confirmar el diagnostico y
                    definir un plan de recuperacion ajustado a cada paciente.
                  </p>
                  <a
                    href={doctorProfile.whatsapp}
                    className="future-link"
                    target="_blank"
                    rel="noreferrer"
                    style={{ width: "100%", marginTop: "12px" }}
                  >
                    Consultar por WhatsApp
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
