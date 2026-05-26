export const metadata = {
  title: "Blog de pie y tobillo",
  description:
    "Articulos del Dr. Alexander Soto sobre traumatologia, ortopedia, cirugia de pie y tobillo, lesiones deportivas, recuperacion y patologias frecuentes.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Blog de Dr. Alexander Soto",
    description:
      "Informacion medica clara sobre pie, tobillo, miembro inferior y recuperacion funcional.",
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

