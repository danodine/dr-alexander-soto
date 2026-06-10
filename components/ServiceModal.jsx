"use client";

import { useEffect, useMemo, useRef } from "react";
import Image from "next/image";
import PropTypes from "prop-types";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function getYouTubeId(url) {
  if (!url) return null;
  try {
    const u = new URL(url);
    const hostname = u.hostname.replace(/^www\./, "");
    const isAllowedHost =
      hostname === "youtube.com" ||
      hostname === "youtube-nocookie.com" ||
      hostname === "youtu.be";

    if (!isAllowedHost) return null;

    if (hostname === "youtu.be") {
      const id = u.pathname.slice(1);
      return /^[a-zA-Z0-9_-]{11}$/.test(id) ? id : null;
    }

    const vParam = u.searchParams.get("v");
    if (vParam) return /^[a-zA-Z0-9_-]{11}$/.test(vParam) ? vParam : null;

    const parts = u.pathname.split("/");
    const embedIndex = parts.indexOf("embed");
    if (embedIndex !== -1 && parts[embedIndex + 1]) {
      const id = parts[embedIndex + 1];
      return /^[a-zA-Z0-9_-]{11}$/.test(id) ? id : null;
    }

    const last = parts.filter(Boolean).pop();
    return /^[a-zA-Z0-9_-]{11}$/.test(last) ? last : null;
  } catch {
    return null;
  }
}

function getYouTubeEmbedUrl(url) {
  const id = getYouTubeId(url);
  if (!id) return null;
  return `https://www.youtube-nocookie.com/embed/${id}?rel=0&modestbranding=1`;
}

export default function ServiceModal({ open, onClose, service }) {
  const overlayRef = useRef(null);
  const modalRef = useRef(null);
  const introRef = useRef(null);
  const gallerySectionRef = useRef(null);
  const galleryStageRef = useRef(null);
  const galleryPanelsRef = useRef([]);
  const videoSectionRef = useRef(null);

  const slides = useMemo(() => {
    const source = service?.slides || service?.imagesCarucel || [];
    return source.map((slide) => ({
      ...slide,
      image: slide.image?.replace(/^\.\.\//, "/"),
    }));
  }, [service]);

  const symptoms = useMemo(() => service?.symptoms || [], [service]);

  const hasVideo = !!service?.videoUrl && !!getYouTubeId(service.videoUrl);
  const embedUrl = getYouTubeEmbedUrl(service?.videoUrl);

  useEffect(() => {
    if (!open) return;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open || !service) return null;

    const overlay = overlayRef.current;
    const modal = modalRef.current;
    const intro = introRef.current;
    const gallerySection = gallerySectionRef.current;
    const galleryStage = galleryStageRef.current;
    const videoSection = videoSectionRef.current;
    const galleryPanels = galleryPanelsRef.current.filter(Boolean);

    if (!overlay || !modal) return;

    const ctx = gsap.context(() => {
      gsap.set(overlay, { opacity: 0 });
      gsap.set(modal, {
        opacity: 0,
        scale: 0.88,
        y: 50,
        transformOrigin: "center center",
        filter: "blur(12px)",
      });

      gsap.to(overlay, {
        opacity: 1,
        duration: 0.35,
        ease: "power2.out",
      });

      gsap.to(modal, {
        opacity: 1,
        scale: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.6,
        ease: "power3.out",
      });

      if (intro) {
        gsap.from(intro.querySelectorAll(".service-modal-reveal"), {
          opacity: 0,
          y: 24,
          stagger: 0.08,
          duration: 0.7,
          ease: "power3.out",
          delay: 0.15,
        });
      }

      if (gallerySection && galleryStage && galleryPanels.length > 0) {
        const scroller = modal;

        gsap.set(galleryPanels, {
          autoAlpha: 0,
          scale: 1.04,
          filter: "blur(8px)",
          position: "absolute",
          inset: 0,
        });

        gsap.set(galleryPanels[0], {
          autoAlpha: 1,
          scale: 1,
          filter: "blur(0px)",
        });

        const steps = galleryPanels.length;
        const segment = 1 / Math.max(steps - 1, 1);

        const tl = gsap.timeline({
          defaults: { ease: "power2.out" },
          scrollTrigger: {
            trigger: gallerySection,
            scroller,
            start: "5% top",
            end: `+=${window.innerHeight * Math.max(steps - 1, 1) * 0.95}`,
            scrub: 1,
            pin: galleryStage,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        for (let i = 1; i < steps; i += 1) {
          tl.to(
            galleryPanels[i - 1],
            {
              autoAlpha: 0,
              scale: 0.98,
              filter: "blur(12px)",
              duration: segment * 0.45,
            },
            (i - 1) * segment + segment * 0.12,
          ).to(
            galleryPanels[i],
            {
              autoAlpha: 1,
              scale: 1,
              filter: "blur(0px)",
              duration: segment * 0.5,
            },
            (i - 1) * segment + segment * 0.46,
          );
        }
      }

      if (videoSection) {
        gsap.from(videoSection, {
          opacity: 0,
          y: 40,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: videoSection,
            scroller: modal,
            start: "top 85%",
          },
        });
      }

      ScrollTrigger.refresh();
    }, modalRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.scroller === modal) trigger.kill();
      });
    };
  }, [open, service, slides.length]);

  if (!open || !service) return null;

  return (
    <div
      ref={overlayRef}
      className="service-modal-overlay-future"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        ref={modalRef}
        className="service-modal-shell-future"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="service-modal-close-future"
          onClick={onClose}
          aria-label="Cerrar modal"
        >
          ✕
        </button>

        <div className="service-modal-noise" />
        <div className="service-modal-orb service-modal-orb-1" />
        <div className="service-modal-orb service-modal-orb-2" />

        <section ref={introRef} className="service-modal-intro">
          <div className="service-modal-chip service-modal-reveal">
            Servicio especializado
          </div>

          <h2 className="service-modal-title-future service-modal-reveal">
            {service.title}
          </h2>

          {service.descriptionLarga && (
            <p className="service-modal-description-future service-modal-reveal">
              {service.descriptionLarga}
            </p>
          )}

          {symptoms.length > 0 && (
            <div className="service-modal-symptoms service-modal-reveal">
              <p className="service-modal-subheading">Síntomas</p>
              <ul>
                {symptoms.map((symptom, i) => (
                  <li key={i}>{symptom}</li>
                ))}
              </ul>
            </div>
          )}
        </section>

        {slides.length > 0 && (
          <section
            ref={gallerySectionRef}
            className="service-modal-gallery-section"
          >
            <div className="service-modal-gallery-copy">
              <p className="service-modal-subheading">Galería visual</p>
              <p className="service-modal-gallery-text">
                Desliza para explorar cada imagen. La transición entre imágenes
                acompaña el recorrido dentro de la ventana.
              </p>
            </div>

            <div ref={galleryStageRef} className="service-modal-gallery-stage">
              {slides.map((slide, index) => (
                <figure
                  key={`${slide.image}-${index}`}
                  ref={(el) => {
                    galleryPanelsRef.current[index] = el;
                  }}
                  className="service-modal-gallery-panel"
                >
                  <Image
                    src={slide.image}
                    alt={slide.altText || `${service.title} ${index + 1}`}
                    className="service-modal-gallery-image"
                    fill
                    sizes="(max-width: 960px) 92vw, 880px"
                  />
                  {slide.altText && (
                    <figcaption className="service-modal-gallery-caption">
                      {slide.altText}
                    </figcaption>
                  )}
                </figure>
              ))}
            </div>
          </section>
        )}

        {hasVideo && embedUrl && (
          <section
            ref={videoSectionRef}
            className="service-modal-video-section-future"
          >
            <p className="service-modal-subheading">Video explicativo</p>

            <div className="service-modal-video-frame-future">
              <iframe
                src={embedUrl}
                title={service.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
                sandbox="allow-scripts allow-same-origin allow-presentation"
              />
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

ServiceModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  service: PropTypes.object,
};
