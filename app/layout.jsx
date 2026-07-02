import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/globals.css";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GlobalGridCanvas from "@/components/GridCanvas";
import PageLoader from "@/components/PageLoader";
import {
  absoluteUrl,
  doctorProfile,
  jsonLdScript,
  medicalServices,
  siteUrl,
} from "@/lib/seo";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Dr. Alexander Soto | Traumatólogo Pie y Tobillo Quito",
    template: "%s | Dr. Alexander Soto",
  },
  description:
    "Dr. Alexander Soto, traumatólogo especialista en pie y tobillo en Quito. Fracturas, artroscopia, lesiones deportivas y cirugía reconstructiva.",
  applicationName: "Dr. Alexander Soto",
  authors: [{ name: "Dr. Alexander Soto", url: siteUrl }],
  creator: "Dr. Alexander Soto",
  publisher: "Dr. Alexander Soto",
  category: "Medical",
  keywords: [
    "traumatólogo Quito",
    "especialista en pie y tobillo Quito",
    "cirugía de pie y tobillo Ecuador",
    "ortopedista Quito",
    "artroscopia de tobillo",
    "fracturas de tobillo y pie",
    "lesiones deportivas tobillo",
    "Dr Alexander Soto",
  ],
  alternates: {
    canonical: "/",
    languages: {
      "es-EC": "/",
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
      { url: "/assets/icons/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/assets/icons/favicon-16x16.png", type: "image/png", sizes: "16x16" },
    ],
    apple: [
      {
        url: "/apple-icon.png",
        type: "image/png",
        sizes: "180x180",
      },
    ],
  },
  openGraph: {
    type: "website",
    locale: "es_EC",
    url: "/",
    siteName: "Dr. Alexander Soto",
    title: "Dr. Alexander Soto | Especialista en Pie y Tobillo en Quito",
    description:
      "Traumatología y ortopedia especializada en pie, tobillo y miembro inferior en Quito, Ecuador.",
    images: [
      {
        url: doctorProfile.image,
        width: 1200,
        height: 900,
        alt: "Dr. Alexander Soto, especialista en pie y tobillo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dr. Alexander Soto | Pie y Tobillo Quito",
    description:
      "Traumatólogo y ortopedista especialista en cirugía de pie y tobillo en Quito.",
    images: [doctorProfile.image],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  other: {
    "medical-specialty": doctorProfile.specialty,
    "geo.region": "EC-P",
    "geo.placename": "Quito",
  },
};

export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "Dr. Alexander Soto",
        inLanguage: "es-EC",
        publisher: { "@id": `${siteUrl}/#medical-practice` },
      },
      {
        "@type": "WebPage",
        "@id": `${siteUrl}/#webpage`,
        url: siteUrl,
        name: "Dr. Alexander Soto - Traumatólogo especialista en pie y tobillo",
        description: doctorProfile.description,
        inLanguage: "es-EC",
        isPartOf: { "@id": `${siteUrl}/#website` },
        primaryEntity: { "@id": `${siteUrl}/#medical-practice` },
      },
      {
        "@type": ["MedicalBusiness", "Physician"],
        "@id": `${siteUrl}/#medical-practice`,
        name: doctorProfile.name,
        legalName: doctorProfile.legalName,
        url: siteUrl,
        image: absoluteUrl(doctorProfile.image),
        logo: absoluteUrl(doctorProfile.logo),
        description: doctorProfile.description,
        telephone: doctorProfile.phone,
        email: doctorProfile.email,
        address: {
          "@type": "PostalAddress",
          ...doctorProfile.address,
        },
        areaServed: [
          { "@type": "City", name: "Quito" },
          { "@type": "Country", name: "Ecuador" },
        ],
        medicalSpecialty: [
          "Orthopedic",
          "Foot and ankle surgery",
          "Traumatology",
        ],
        availableService: medicalServices.map((service) => ({
          "@type": "MedicalProcedure",
          name: service,
        })),
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: "Monday",
            opens: "09:00",
            closes: "18:00",
          },
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: "Wednesday",
            opens: "09:00",
            closes: "19:00",
          },
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Thursday", "Friday"],
            opens: "15:00",
            closes: "19:00",
          },
        ],
        sameAs: doctorProfile.sameAs,
        founder: { "@id": `${siteUrl}/#person` },
      },
      {
        "@type": "Person",
        "@id": `${siteUrl}/#person`,
        name: doctorProfile.name,
        jobTitle: doctorProfile.title,
        image: absoluteUrl(doctorProfile.image),
        url: siteUrl,
        sameAs: doctorProfile.sameAs,
        knowsAbout: medicalServices,
        alumniOf: {
          "@type": "CollegeOrUniversity",
          name: "Universidad Central del Ecuador",
        },
        worksFor: { "@id": `${siteUrl}/#medical-practice` },
      },
    ],
  };

  return (
    <html lang="es" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body
        className="app app-loading d-flex flex-column min-vh-100"
        suppressHydrationWarning
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdScript(jsonLd) }}
        />
        <PageLoader />
        <GlobalGridCanvas />
        <Navbar />
        {children}
        <Footer />
        <a
          href={doctorProfile.whatsapp}
          target="_blank"
          rel="noreferrer"
          className="whatsapp-button"
        >
          <Image
            src="/assets/icons/icons8-whatsapp-96.png"
            alt="Icono de WhatsApp"
            width={40}
            height={40}
          />
        </a>
      </body>
    </html>
  );
}
