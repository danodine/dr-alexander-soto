export const metadata = {
  title: "Blog de pie y tobillo",
  description:
    "Artículos del Dr. Alexander Soto sobre traumatología, ortopedia, cirugía de pie y tobillo, lesiones deportivas, recuperación y patologías frecuentes.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Blog de Dr. Alexander Soto",
    description:
      "Información médica clara sobre pie, tobillo, miembro inferior y recuperación funcional.",
    url: "/blog",
    type: "website",
    images: [
      {
        url: "/assets/images/Dr-Alexander-Soto.webp",
        width: 1200,
        height: 900,
        alt: "Dr. Alexander Soto",
      },
    ],
  },
};

export default function BlogLayout({ children }) {
  return children;
}
