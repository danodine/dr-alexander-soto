import Image from "next/image";
import Link from "next/link";
import { doctorProfile } from "@/lib/seo";

const profileHighlights = [
  {
    label: "Especialidad",
    title: "Pie, tobillo y miembro inferior",
    text: "Traumatología y ortopedia con subespecialidad en cirugía de pie y tobillo, enfocada en recuperar movilidad, función y confianza al caminar.",
  },
  {
    label: "Enfoque",
    title: "Diagnóstico claro y cuidado personalizado",
    text: "Cada paciente recibe una evaluación cuidadosa y un plan adaptado a su estilo de vida, objetivos y etapa de recuperación.",
  },
  {
    label: "Formación",
    title: "Base académica sólida",
    text: "Graduado de la Universidad Central del Ecuador, con postgrado en Traumatología y Ortopedia y subespecialidad en Cirugía de Pie y Tobillo en el Hospital Enrique Garcés.",
  },
];

const institutions = [
  {
    name: "CEO Ecuador",
    image: "/assets/images/ceo-color.png",
    href: "https://www.ceoecuador.com/team/alexander-soto/",
  },
  {
    name: "Hospital Metropolitano",
    image: "/assets/images/metropolitano-color.png",
    href: "https://www.hospitalmetropolitano.org/en/doctors/2088/alexander-nicolay-soto-toledo",
  },
  {
    name: "Hospital Vozandes",
    image: "/assets/images/vozandes-color.png",
  },
];

const affiliations = [
  "Médico Traumatólogo Tratante del Hospital Enrique Garcés.",
  "Miembro Honorario de la Sociedad Internacional de Flebología y Linfología del Pacífico.",
  "Socio Activo de la Sociedad Ecuatoriana de Ortopedia y Traumatología S.E.O.T.",
  "Miembro Fundador del Capítulo de Cirugía de Pie y Tobillo de la Sociedad Ecuatoriana de Ortopedia y Traumatología S.E.O.T.",
];

const achievements = [
  "Autor de varios trabajos de investigación.",
  "Ponente en foros científicos nacionales e internacionales.",
];

export const metadata = {
  title: "Sobre mí",
  description:
    "Conoce la trayectoria, formación y enfoque médico del Dr. Alexander Soto, traumatólogo especialista en pie y tobillo en Quito.",
  alternates: {
    canonical: "/sobre-mi",
  },
  openGraph: {
    type: "website",
    url: "/sobre-mi",
    title: "Sobre mí | Dr. Alexander Soto",
    description:
      "Traumatología y ortopedia especializada en pie, tobillo y miembro inferior, con atención personalizada en Quito.",
    images: [
      {
        url: doctorProfile.image,
        width: 1200,
        height: 900,
        alt: "Dr. Alexander Soto",
      },
    ],
  },
};

export default function SobreMiPage() {
  return (
    <main className="about-page">
      <div className="future-grid-bg" />
      <div className="future-orb one" />
      <div className="future-orb two" />
      <div className="future-orb three" />

      <section className="about-profile-section">
        <div className="container about-profile-grid">
          <div className="about-profile-copy">
            <p className="future-eyebrow">Sobre mí</p>
            <h1 className="about-profile-title">Dr. Alexander Soto</h1>
            <p className="about-profile-lead">
              Mi práctica se centra en devolver movimiento, aliviar dolor y
              acompañar a cada paciente con una atención precisa, humana y
              personalizada.
            </p>
            <div className="about-profile-actions">
              <Link href="/contacto" className="future-link">
                Agendar consulta
              </Link>
              <Link href="/servicios" className="future-link">
                Ver servicios
              </Link>
            </div>
          </div>

          <div className="about-profile-image-card">
            <Image
              src="/assets/images/Dr-Alexander-Soto.webp"
              alt="Dr. Alexander Soto, especialista en pie y tobillo"
              fill
              priority
              sizes="(max-width: 991px) 100vw, 42vw"
            />
          </div>
        </div>
      </section>

      <section className="about-content-section">
        <div className="container">
          <div className="about-card-grid">
            {profileHighlights.map((item) => (
              <article key={item.label} className="about-info-card">
                <p>{item.label}</p>
                <h2>{item.title}</h2>
                <span>{item.text}</span>
              </article>
            ))}
          </div>

          <section className="about-vision-panel">
            <div>
              <p className="future-eyebrow">Mi visión</p>
              <h2>Medicina con vocación, precisión y acompañamiento.</h2>
            </div>
            <div className="about-vision-copy">
              <p>
                Creo que la medicina va más allá del tratamiento de
                enfermedades: es un compromiso con el bienestar y la calidad de
                vida de cada paciente.
              </p>
              <p>
                Porque tus pies son la base de tu bienestar, merecen una
                atención especializada y soluciones adaptadas a tus necesidades.
              </p>
            </div>
          </section>

          <div className="about-mission-panel">
            <div>
              <p className="future-eyebrow">Mi misión</p>
              <h2>Devolver movimiento. Recuperar bienestar.</h2>
            </div>
            <p>
              Mi misión es ayudarte a recuperar la movilidad y la confianza en
              cada paso, para que vuelvas a disfrutar tus actividades diarias,
              deportivas y personales sin dolor ni limitaciones.
            </p>
          </div>

          <section className="about-video-section" aria-labelledby="about-video-title">
            <div className="about-section-heading">
              <p className="future-eyebrow">Presentación oficial</p>
              <h2 id="about-video-title">Conoce más sobre mi enfoque médico</h2>
            </div>

            <div className="about-video-card">
              <div className="video-container about-video-frame">
                <iframe
                  src="https://www.youtube.com/embed/JvI7efSek0w?rel=0&modestbranding=1"
                  title="Dr. Alexander Soto - Mi misión"
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              </div>
            </div>
          </section>

          <section className="about-credentials-section">
            <div className="about-section-heading">
              <p className="future-eyebrow">Afiliaciones y logros</p>
              <h2>Trayectoria profesional activa</h2>
            </div>

            <div className="about-credentials-grid">
              <article className="about-credentials-card">
                <h3>Afiliaciones</h3>
                <ul>
                  {affiliations.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>

              <article className="about-credentials-card">
                <h3>Otros logros</h3>
                <ul>
                  {achievements.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            </div>
          </section>

          <section className="about-institutions-section">
            <div className="about-section-heading">
              <p className="future-eyebrow">Formo parte de</p>
              <h2>Instituciones que respaldan mi trayectoria</h2>
            </div>

            <div className="about-institutions-grid">
              {institutions.map((institution) => {
                const content = (
                  <>
                    <Image
                      src={institution.image}
                      alt={institution.name}
                      width={112}
                      height={112}
                    />
                    <span>{institution.name}</span>
                  </>
                );

                return institution.href ? (
                  <a
                    key={institution.name}
                    href={institution.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="about-institution-card"
                  >
                    {content}
                  </a>
                ) : (
                  <div key={institution.name} className="about-institution-card">
                    {content}
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
