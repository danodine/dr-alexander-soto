import ContactMap from "@/components/ContactMap";
import { doctorProfile } from "@/lib/seo";

const addressLabel =
  "Av. Mariana de Jesús OE7-02 y Nuño de Valderrama P.B., Quito";
const mapLat = "-0.1834646";
const mapLon = "-78.5026448";
const mapLink =
  `https://www.google.com/maps/search/?api=1&query=${mapLat},${mapLon}`;
const [emailUser, emailDomain] = doctorProfile.email.split("@");
const clinicLocations = [
  {
    id: "ceo",
    name: "CEO Ecuador",
    address:
      "Edificio CITIMED, Av. Mariana de Jesús OE7-02 y Nuño de Valderrama P.B.",
    lat: -0.1834646,
    lon: -78.5026448,
  },
  {
    id: "metropolitano",
    name: "Hospital Metropolitano",
    address: "Av. Mariana de Jesús s/n y Nicolás Arteta",
    lat: -0.1833704,
    lon: -78.503635,
  },
  {
    id: "vozandes",
    name: "Hospital Vozandes",
    address: "Veracruz y N-37",
    lat: -0.1724819,
    lon: -78.4895451,
  },
];

const schedule = [
  {
    day: "Lunes",
    hours: "09h00 a 13h00 y 15h00 a 18h00",
    place: "Quito",
  },
  {
    day: "Miércoles",
    hours: "09h00 a 13h00",
    place: "Tumbaco - La Martina",
  },
  {
    day: "Miércoles",
    hours: "15h00 a 19h00",
    place: "Quito",
  },
  {
    day: "Jueves y Viernes",
    hours: "15h00 a 19h00",
    place: "Quito",
  },
];

export const metadata = {
  title: "Contacto",
  description:
    "Información de contacto, horarios y ubicación del consultorio del Dr. Alexander Soto en Quito.",
  alternates: {
    canonical: "/contacto",
  },
  openGraph: {
    type: "website",
    url: "/contacto",
    title: "Contacto | Dr. Alexander Soto",
    description:
      "Ubicación, teléfono, WhatsApp, correo y mapa del consultorio del Dr. Alexander Soto en Quito.",
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

export default function ContactoPage() {
  return (
    <main className="contact-page">
      <div className="future-grid-bg" />
      <div className="future-orb one" />
      <div className="future-orb two" />
      <div className="future-orb three" />

      <section className="contact-content-section">
        <div className="container contact-layout">
          <div className="contact-info-panel">
            <article className="contact-info-card contact-info-card-primary">
              <p className="contact-card-label">Ubicación principal</p>
              <h2>Centro Médico Citimed</h2>
              <p>{addressLabel}</p>
              <a
                href={mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="future-link contact-card-action"
              >
                Abrir mapa
              </a>
            </article>

            <article className="contact-info-card">
              <p className="contact-card-label">Teléfono y WhatsApp</p>
              <a href="tel:+593990165538" className="contact-large-link">
                (+593) 990165538
              </a>
              <a
                href={doctorProfile.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="future-link contact-card-action"
              >
                Escribir por WhatsApp
              </a>
            </article>

            <article className="contact-info-card">
              <p className="contact-card-label">Correo electrónico</p>
              <a
                href={`mailto:${doctorProfile.email}`}
                className="contact-large-link"
              >
                {emailDomain ? (
                  <>
                    {emailUser}@<wbr />
                    {emailDomain}
                  </>
                ) : (
                  doctorProfile.email
                )}
              </a>
            </article>

          </div>

          <div className="contact-map-panel">
            <div className="contact-map-card">
              <ContactMap locations={clinicLocations} defaultLocationId="ceo" />
            </div>
            <div className="contact-schedule-card">
              <p className="contact-card-label">Horario de atención</p>
              <ul>
                {schedule.map((item, index) => (
                  <li key={`${item.day}-${item.place}-${index}`}>
                    <span>{item.day}</span>
                    <strong>{item.hours}</strong>
                    <small>{item.place}</small>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
