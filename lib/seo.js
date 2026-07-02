export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://dralexandersoto.com";

export const doctorProfile = {
  name: "Dr. Alexander Soto",
  legalName: "Dr. Alexander Nicolay Soto Toledo",
  title: "Traumatólogo especialista en pie y tobillo en Quito",
  specialty:
    "Traumatología y ortopedia con subespecialidad en cirugía de pie y tobillo",
  description:
    "Atención especializada en traumatología, ortopedia, cirugía de pie y tobillo, miembro inferior, artroscopia, lesiones deportivas y recuperación funcional en Quito, Ecuador.",
  phone: "+593990165538",
  email: "alexandersototoledo@gmail.com",
  whatsapp:
    "https://wa.me/593990165538?text=Hola,%20me%20gustar%C3%ADa%20obtener%20m%C3%A1s%20informaci%C3%B3n%20sobre%20sus%20servicios.",
  address: {
    streetAddress: "Av. Mariana de Jesús OE7-02 y Nuño de Valderrama P.B.",
    addressLocality: "Quito",
    addressRegion: "Pichincha",
    addressCountry: "EC",
  },
  sameAs: [
    "https://www.instagram.com/dralexandersoto/",
    "https://www.facebook.com/dralexandersoto",
    "https://www.tiktok.com/@dr.alexandersoto?_r=1&_t=ZS-97eEYpGVQUp",
    "https://www.ceoecuador.com/team/alexander-soto/",
    "https://www.hospitalmetropolitano.org/en/doctors/2088/alexander-nicolay-soto-toledo",
  ],
  image: "/assets/images/Dr-Alexander-Soto.webp",
  logo: "/assets/images/logo.png",
};

export const medicalServices = [
  "Cirugía de pie y tobillo",
  "Artroscopia de tobillo",
  "Fracturas de tobillo y pie",
  "Lesiones ligamentarias",
  "Inestabilidad de tobillo",
  "Lesiones osteocondrales",
  "Juanetes o Hallux Valgus",
  "Tendinopatía de Aquiles",
  "Pie plano del adulto",
  "Pie plano del niño",
  "Fascitis plantar",
  "Metatarsalgia",
  "Reemplazo protésico de tobillo",
  "Lesiones deportivas de pie y tobillo",
];

export function absoluteUrl(path = "/") {
  if (/^https?:\/\//i.test(path)) return path;
  return new URL(path, siteUrl).toString();
}

export function jsonLdScript(data) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
