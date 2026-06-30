"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { loadServices } from "@/lib/servicesApi";
import TiltCard from "@/components/TiltCard";

gsap.registerPlugin(ScrollTrigger);

const ScrollCanvas = dynamic(() => import("@/components/ScrollCanvas"), {
  ssr: false,
});
const VideoModal = dynamic(() => import("@/components/VideoModal"), {
  ssr: false,
});

const storySteps = [
  {
    id: "vision",
    eyebrow: "Mi Visión",
    title: "Precisión humana.\nCuidado personalizado.",
    text: "En mi práctica, la medicina no se limita a tratar una lesión. Cada paciente recibe una evaluación cuidadosa, un diagnóstico preciso y un plan adaptado a su estilo de vida, sus objetivos y su recuperación.",
    accent: "Movilidad con confianza",
    type: "text",
  },
  {
    id: "specialty",
    eyebrow: "Especialidad",
    title: "Pie, tobillo\ny miembro inferior.",
    text: "Mi enfoque está centrado en traumatología y ortopedia con subespecialidad en cirugía de pie y tobillo, combinando experiencia clínica, criterio quirúrgico y soluciones modernas para recuperar función y aliviar dolor.",
    accent: "Experiencia enfocada",
    type: "text",
  },
  {
    id: "training",
    eyebrow: "Formación",
    title: "Base académica sólida.\nEvolución constante.",
    text: "Graduado de la Universidad Central del Ecuador, con postgrado en Traumatología y Ortopedia y subespecialidad en Cirugía de Pie y Tobillo en el Hospital Enrique Garcés, manteniendo una práctica basada en preparación y actualización continua.",
    accent: "Trayectoria profesional",
    type: "text",
  },
  {
    id: "affiliations",
    eyebrow: "Formo parte de",
    title: "Instituciones que\nrespaldan mi trayectoria.",
    accent: "Confianza construida",
    type: "logos",
    logos: [
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
      { name: "Vozandes", image: "/assets/images/vozandes-color.png" },
    ],
  },
  {
    id: "mision",
    eyebrow: "Mi misión",
    title: "Devolver movimiento.\nRecuperar bienestar.",
    text: "Mi misión es ayudarte a recuperar la movilidad y la confianza en cada paso, para que vuelvas a disfrutar tus actividades diarias, deportivas y personales sin dolor ni limitaciones.",
    accent: "Recuperación con propósito",
    type: "text",
    button: true,
  },
];

const STORY_SCROLL_DISTANCE = 1.45;
const STORY_SCROLL_SCRUB = 1.6;

export default function HomePage({ onNavigate }) {
  const [activeStep, setActiveStep] = useState(0);
  const [activeService, setActiveService] = useState(0);
  const [featuredServices, setFeaturedServices] = useState([]);
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const storySectionRef = useRef(null);
  const panelsRef = useRef([]);
  const progressBarRef = useRef(null);

  useEffect(() => {
    async function fetchFeaturedServices() {
      try {
        const data = await loadServices();
        const selectedIds = [
          "fracturas-tobillo-pie",
          "lesiones-ligamentarias",
          "artroscopia-tobillo",
          "reemplazo-protesico",
        ];
        const selectedServices = selectedIds
          .map((id) => data.find((service) => service.id === id))
          .filter(Boolean)
          .map((service) => ({
            ...service,
            image: service.image.replace("../", "/"),
            shortTitle:
              service.id === "fracturas-tobillo-pie"
                ? "Cirugía de pie y tobillo"
                : service.id === "lesiones-ligamentarias"
                  ? "Lesiones deportivas"
                  : service.id === "artroscopia-tobillo"
                    ? "Procedimientos reconstructivos"
                    : service.id === "reemplazo-protesico"
                      ? "Tratamiento del dolor crónico"
                      : service.title,
            accent:
              service.id === "fracturas-tobillo-pie"
                ? "Tratamiento preciso y recuperación funcional."
                : service.id === "lesiones-ligamentarias"
                  ? "Evaluación y manejo especializado."
                  : service.id === "artroscopia-tobillo"
                    ? "Técnicas avanzadas y mínimamente invasivas."
                    : service.id === "reemplazo-protesico"
                      ? "Soluciones para dolor persistente y función."
                      : service.description,
          }));
        setFeaturedServices(selectedServices);
      } catch (err) {
        console.error("Error cargando servicios destacados:", err);
      }
    }
    fetchFeaturedServices();
  }, []);

  // Force GSAP to recalculate heights after dynamic data loads
  useEffect(() => {
    const handleLoaderComplete = () => {
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
    };
    const timeout = setTimeout(() => {
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
    }, 500);

    window.addEventListener("app-loader-complete", handleLoaderComplete);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener("app-loader-complete", handleLoaderComplete);
    };
  }, [featuredServices]);

  // STORY SECTION
  useEffect(() => {
    const section = storySectionRef.current;
    const panels = panelsRef.current.filter(Boolean);
    const progressBar = progressBarRef.current;
    if (!section || !panels.length || !progressBar) return;

    const mm = gsap.matchMedia();
    mm.add("(min-width: 992px)", () => {
      gsap.set(progressBar, { scaleX: 0, transformOrigin: "left center" });
      panels.forEach((panel, index) => {
        if (index === 0) {
          gsap.set(panel, {
            autoAlpha: 1,
            y: 0,
            filter: "blur(0px)",
            pointerEvents: "auto",
          });
        } else {
          gsap.set(panel, {
            autoAlpha: 0,
            y: 24,
            filter: "blur(6px)",
            pointerEvents: "none",
          });
        }
      });

      const stepsCount = storySteps.length;
      const segment = 1 / Math.max(stepsCount - 1, 1);

      const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () =>
            `+=${window.innerHeight * (stepsCount - 1) * STORY_SCROLL_DISTANCE}`,
          scrub: STORY_SCROLL_SCRUB,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          refreshPriority: 3, // MAGIC FIX: Forces GSAP to measure this 1st
          onUpdate: (self) => {
            const progress = self.progress;
            const stepIndex = Math.min(
              stepsCount - 1,
              Math.round(progress * (stepsCount - 1)),
            );
            setActiveStep(stepIndex);
            gsap.set(progressBar, { scaleX: progress });
          },
        },
      });

      for (let i = 1; i < panels.length; i += 1) {
        const prev = panels[i - 1];
        const current = panels[i];
        tl.to(
          prev,
          {
            autoAlpha: 0,
            y: -18,
            filter: "blur(6px)",
            duration: segment * 0.45,
            pointerEvents: "none",
          },
          (i - 1) * segment + segment * 0.1,
        ).fromTo(
          current,
          { autoAlpha: 0, y: 18, filter: "blur(6px)", pointerEvents: "none" },
          {
            autoAlpha: 1,
            y: 0,
            filter: "blur(0px)",
            duration: segment * 0.55,
            pointerEvents: "auto",
          },
          (i - 1) * segment + segment * 0.45,
        );
      }

      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    });
    return () => mm.revert();
  }, []);

  const selectedServiceIndex = featuredServices.length
    ? Math.min(activeService, featuredServices.length - 1)
    : 0;

  return (
    <>
      <header className="hero-header" id="inicio">
        <div className="header-container">
          <picture>
            {/* If screen is 768px or smaller, use the mobile version */}
            <source
              srcSet="/assets/images/portada_dr_alex_soto_mobile.jpg"
              media="(max-width: 768px)"
            />
            {/* Default/Desktop image */}
            <Image
              src="/assets/images/portada_dr_alex_soto.webp"
              alt="Dr. Alexander Soto - Portada"
              width={1920}
              height={727}
              priority
              sizes="100vw"
            />
          </picture>

          <div className="overlay-text">
            <h1>DR. ALEXANDER SOTO</h1>
            <h2>Traumatólogo Especialista en Pie y Tobillo</h2>
          </div>
        </div>
      </header>

      <main>
        {/* FIRST HALF OF THE PAGE */}
        <div className="contenedor-main">
          <section
            id="sobre-mi"
            ref={storySectionRef}
            className="doctor-story-section"
            aria-label="Mi visión y sobre mí"
          >
            <div className="doctor-story-sticky">
              <div className="doctor-story-shell container">
                <div className="doctor-story-grid">
                  <div className="doctor-story-visual">
                    <div className="doctor-story-image-wrap">
                      <Image
                        src="/assets/images/Dr-Alexander-Soto.webp"
                        alt="Doctor Alexander Soto"
                        className="doctor-story-image"
                        width={520}
                        height={760}
                        sizes="(max-width: 991px) 100vw, 520px"
                      />
                    </div>
                  </div>
                  <div className="doctor-story-copy">
                    <div className="doctor-story-copy-inner">
                      <div className="doctor-story-topline">
                        <span className="doctor-story-kicker">
                          {storySteps[activeStep].eyebrow}
                        </span>
                        <div className="doctor-story-progress">
                          <span
                            ref={progressBarRef}
                            className="doctor-story-progress-bar"
                          />
                        </div>
                      </div>
                      <div className="doctor-story-stage">
                        {storySteps.map((step, index) => (
                          <article
                            key={step.id}
                            ref={(el) => {
                              panelsRef.current[index] = el;
                            }}
                            className="doctor-story-panel"
                          >
                            <p className="doctor-story-panel-accent">
                              {step.accent}
                            </p>
                            <h2>
                              {step.title.split("\n").map((line) => (
                                <span key={line} className="doctor-story-line">
                                  {line}
                                </span>
                              ))}
                            </h2>
                            {step.type === "logos" ? (
                              <div className="doctor-story-logos-grid">
                                {step.logos.map((logo) =>
                                  logo.href ? (
                                    <a
                                      key={logo.name}
                                      href={logo.href}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="doctor-story-logo-card"
                                    >
                                      <div className="doctor-story-logo-inner">
                                        <Image
                                          src={logo.image}
                                          alt={logo.name}
                                          className="doctor-story-logo-image"
                                          width={82}
                                          height={82}
                                        />
                                      </div>
                                    </a>
                                  ) : (
                                    <div
                                      key={logo.name}
                                      className="doctor-story-logo-card"
                                    >
                                      <div className="doctor-story-logo-inner">
                                        <Image
                                          src={logo.image}
                                          alt={logo.name}
                                          className="doctor-story-logo-image"
                                          width={82}
                                          height={82}
                                        />
                                      </div>
                                    </div>
                                  ),
                                )}
                              </div>
                            ) : (
                              <p>{step.text}</p>
                            )}
                            {step.button && (
                              <button
                                type="button"
                                onClick={() => setIsVideoOpen(true)}
                                className="doctor-story-video-thumb"
                                aria-label="Conoce mas sobre mi en video"
                              >
                                <span className="doctor-story-video-frame">
                                  <Image
                                    src="https://i.ytimg.com/vi/JvI7efSek0w/hqdefault.jpg"
                                    alt=""
                                    fill
                                    sizes="132px"
                                  />
                                  <span
                                    className="doctor-story-video-play"
                                    aria-hidden="true"
                                  >
                                    <span />
                                  </span>
                                </span>
                                <span className="doctor-story-video-copy">
                                  <span>Conoce mas sobre mi</span>
                                  <small>Ver video</small>
                                </span>
                              </button>
                            )}
                          </article>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="doctor-story-mobile container">
              <p className="ph3">Mi Visión y Sobre mí</p>
              <div className="doctor-story-mobile-image-wrap">
                <Image
                  src="/assets/images/Dr-Alexander-Soto.webp"
                  alt="Doctor Alexander Soto"
                  className="doctor-story-mobile-image"
                  width={480}
                  height={640}
                  sizes="(max-width: 575px) 100vw, 480px"
                />
              </div>
              {storySteps.map((step) => (
                <article key={step.id} className="doctor-story-mobile-card">
                  <p className="doctor-story-mobile-eyebrow">{step.eyebrow}</p>
                  <h2>{step.title.replaceAll("\n", " ")}</h2>
                  {step.type === "logos" ? (
                    <div className="doctor-story-logos-grid doctor-story-logos-grid-mobile">
                      {step.logos.map((logo) =>
                        logo.href ? (
                          <a
                            key={logo.name}
                            href={logo.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="doctor-story-logo-card"
                          >
                            <div className="doctor-story-logo-inner">
                              <Image
                                src={logo.image}
                                alt={logo.name}
                                className="doctor-story-logo-image"
                                width={82}
                                height={82}
                              />
                            </div>
                          </a>
                        ) : (
                          <div
                            key={logo.name}
                            className="doctor-story-logo-card"
                          >
                            <div className="doctor-story-logo-inner">
                              <Image
                                src={logo.image}
                                alt={logo.name}
                                className="doctor-story-logo-image"
                                width={82}
                                height={82}
                              />
                            </div>
                          </div>
                        ),
                      )}
                    </div>
                  ) : (
                    <p>{step.text}</p>
                  )}
                  {step.button && (
                    <button
                      type="button"
                      onClick={() => setIsVideoOpen(true)}
                      className="doctor-story-video-thumb"
                      aria-label="Conoce mas sobre mi en video"
                    >
                      <span className="doctor-story-video-frame">
                        <Image
                          src="https://i.ytimg.com/vi/JvI7efSek0w/hqdefault.jpg"
                          alt=""
                          fill
                          sizes="132px"
                        />
                        <span
                          className="doctor-story-video-play"
                          aria-hidden="true"
                        >
                          <span />
                        </span>
                      </span>
                      <span className="doctor-story-video-copy">
                        <span>Conoce mas sobre mi</span>
                        <small>Ver video</small>
                      </span>
                    </button>
                  )}
                </article>
              ))}
            </div>
          </section>
        </div>
        <ScrollCanvas />

        {/* SECOND HALF OF THE PAGE */}
        <div className="contenedor-main">
          {featuredServices.length > 0 && (
            <section
              id="servicios"
              className="services-showcase-section"
              aria-label="Servicios especializados"
            >
              <div className="container services-showcase-shell">
                <div className="services-showcase-header">
                  <p className="services-showcase-kicker">
                    Algunos de nuestros servicios especializados
                  </p>
                </div>
                <div className="services-showcase-grid">
                  <div className="services-cards-panel">
                    {featuredServices.map((service, index) => (
                      <button
                        key={service.id}
                        type="button"
                        className={`service-glow-card ${selectedServiceIndex === index ? "is-active" : ""}`}
                        aria-pressed={selectedServiceIndex === index}
                        aria-controls={`service-detail-${service.id}`}
                        onClick={() => setActiveService(index)}
                      >
                        <div className="service-glow-card-inner">
                          <div className="service-glow-icon-wrap">
                            <Image
                              src={service.image}
                              alt={service.title}
                              width={88}
                              height={88}
                            />
                          </div>
                          <div className="service-glow-copy">
                            <h3>{service.shortTitle}</h3>
                            <p>{service.accent}</p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                  <div className="services-detail-panel">
                    <div className="services-detail-stage">
                      {featuredServices.map((service, index) => (
                        <article
                          key={service.id}
                          id={`service-detail-${service.id}`}
                          className={`services-detail-card ${selectedServiceIndex === index ? "is-active" : ""}`}
                          hidden={selectedServiceIndex !== index}
                        >
                          <p className="services-detail-index">
                            {String(index + 1).padStart(2, "0")}
                          </p>
                          <h3>{service.title}</h3>
                          <p>{service.description}</p>
                          {/* Real route so service details are crawlable without client state. */}
                          <Link
                            href={`/servicios/${service.id}`}
                            className="services-detail-link"
                            style={{
                              background: "transparent",
                              border: "none",
                              padding: 0,
                            }}
                          >
                            Descubre más servicios
                          </Link>
                        </article>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          <section id="seguros" className="flare-section">
            <div className="flare-ambient-orb orb-left" />
            <div className="flare-ambient-orb orb-right" />
            <div className="container flare-shell">
              <div className="flare-header">
                <h2 className="flare-title">Respaldados Por Los Mejores</h2>
                <p className="flare-description">
                  Trabajamos con las principales aseguradoras para garantizar
                  que tu recuperación sea tu única preocupación.
                </p>
              </div>
              <div className="flare-grid">
                <TiltCard
                  href="https://palig.com/es/ec"
                  image="/assets/images/Seguro-PANAMERICAN-LIFE-DE-ECUADOR.webp"
                  alt="Pan American Life"
                />
                <TiltCard
                  href="https://www.saludsa.com/"
                  image="/assets/images/Seguro-Saludsa.webp"
                  alt="Saludsa"
                />
                <TiltCard
                  href="https://humana.med.ec/"
                  image="/assets/images/Seguro-nuestra-esencia-es-humana.webp"
                  alt="Humana"
                />
                <TiltCard
                  href="https://www.ecuasanitas.com/"
                  image="/assets/images/Seguro-Ecuasanitas.webp"
                  alt="Ecuasanitas"
                />
                <TiltCard
                  href="https://www.bmicos.com/ecuador/"
                  image="/assets/images/Seguro-BMI.webp"
                  alt="BMI"
                />
              </div>
            </div>
          </section>
        </div>
      </main>

      <VideoModal
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
        videoId="JvI7efSek0w"
      />
    </>
  );
}
