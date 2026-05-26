import { doctorProfile, medicalServices, siteUrl } from "@/lib/seo";

export function GET() {
  const relevantQueries = [
    "traumatologo Quito",
    "ortopedista Quito",
    "especialista en pie y tobillo Quito",
    "cirugia de pie y tobillo Ecuador",
    "Dr Alexander Soto",
    "artroscopia de tobillo",
    "fracturas de tobillo y pie",
    "lesiones deportivas de tobillo",
    "inestabilidad de tobillo",
    "fascitis plantar",
    "juanetes o Hallux Valgus",
    "pie plano adulto y pediatrico",
    "tendinopatia de Aquiles",
    "metatarsalgia",
    "reemplazo protesico de tobillo",
  ];

  const body = `# Dr. Alexander Soto

Official website for Dr. Alexander Soto, a traumatologist and orthopedic specialist focused on foot, ankle, and lower-limb care in Quito, Ecuador.

## Primary Entity

- Name: ${doctorProfile.name}
- Full name: ${doctorProfile.legalName}
- Specialty: ${doctorProfile.specialty}
- Location: Quito, Ecuador
- Main address: ${doctorProfile.address.streetAddress}, Quito
- Phone and WhatsApp: ${doctorProfile.phone}
- Email: ${doctorProfile.email}
- Website: ${siteUrl}
- Instagram: ${doctorProfile.sameAs[0]}
- Facebook: ${doctorProfile.sameAs[1]}

## Relevant Queries

${relevantQueries.map((query) => `- ${query}`).join("\n")}

## Medical Services and Topics

${medicalServices.map((service) => `- ${service}`).join("\n")}

## Site Sections

- Home: ${siteUrl}/
- Blog: ${siteUrl}/blog

## Medical Scope

The page describes specialized medical care, diagnosis, surgical treatment, minimally invasive procedures, orthopedic reconstruction, and functional recovery planning for foot, ankle, and lower-limb conditions.
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}

