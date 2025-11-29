// src/components/ServiceModal.jsx
import React, { useEffect, useState } from "react";

function getYouTubeId(url) {
  if (!url) return null;
  try {
    const u = new URL(url);

    // youtu.be/<id>
    if (u.hostname.includes("youtu.be")) {
      return u.pathname.slice(1);
    }

    // youtube.com/watch?v=<id>
    const vParam = u.searchParams.get("v");
    if (vParam) return vParam;

    // youtube.com/embed/<id> or other path-based
    const parts = u.pathname.split("/");
    const embedIndex = parts.indexOf("embed");
    if (embedIndex !== -1 && parts[embedIndex + 1]) {
      return parts[embedIndex + 1];
    }

    // fallback: last non-empty segment
    const last = parts.filter(Boolean).pop();
    return last || null;
  } catch {
    return null;
  }
}

function getYouTubeThumbnail(url) {
  const id = getYouTubeId(url);
  if (!id) return null;
  // hqdefault is a good quality default
  return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
}

function getYouTubeEmbedUrl(url) {
  const id = getYouTubeId(url);
  if (!id) return null;
  return `https://www.youtube.com/embed/${id}`;
}

function SideCarousel({ slides = [] }) {
  const [idx, setIdx] = useState(0);
  if (!slides.length) return null;

  const next = () => setIdx((i) => (i + 1) % slides.length);
  const prev = () => setIdx((i) => (i - 1 + slides.length) % slides.length);
  const cur = slides[idx];

  return (
    <div className="position-relative my-3">
      {slides.length > 1 && (
        <button
          type="button"
          className="btn btn-light shadow position-absolute"
          aria-label="Anterior"
          onClick={prev}
          style={{
            top: "50%",
            left: 0,
            transform: "translate(-40%, -50%)",
            borderRadius: "9999px",
          }}
        >
          ◀
        </button>
      )}

      <img
        src={cur.image}
        alt={cur.altText || "imagen"}
        className="d-block mx-auto img-fluid carucel-image"
      />

      {slides.length > 1 && (
        <button
          type="button"
          className="btn btn-light shadow position-absolute"
          aria-label="Siguiente"
          onClick={next}
          style={{
            top: "50%",
            right: 0,
            transform: "translate(40%, -50%)",
            borderRadius: "9999px",
          }}
        >
          ▶
        </button>
      )}

      <div className="text-center mt-2">
        <small className="text-muted">
          {idx + 1} / {slides.length}
        </small>
      </div>
    </div>
  );
}

export default function ServiceModal({ open, onClose, service }) {
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    setShowVideo(false);
  }, [open, service]);

  if (!open || !service) return null;

  const hasVideo = !!service.videoUrl && !!getYouTubeId(service.videoUrl);
  const embedUrl = getYouTubeEmbedUrl(service.videoUrl) || service.videoUrl;

  const videoThumbSrc =
    (hasVideo && getYouTubeThumbnail(service.videoUrl)) ||
    service.videoThumbnail ||
    service.image;

  // 👉 Use imagesCarucel as the main source for the carousel
  const slides = service.imagesCarucel || service.slides || [];

  // 👉 Symptoms now come from service.symptoms (your JSON)
  const symptoms = service.symptoms || [];

  return (
    <div
      className="position-fixed w-100 h-100"
      style={{ inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 1050 }}
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="bg-white rounded shadow p-3 p-md-4 service-modal-inner"
        style={{
          maxWidth: 900,
          width: "92%",
          maxHeight: "90vh",
          overflowY: "auto",
          margin: "5vh auto",
          height: "100%",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* ================= VIDEO MODE ================= */}
        {showVideo && hasVideo ? (
          <div className="service-modal-video-overlay">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <button
                type="button"
                className="btn btn-outline-light"
                onClick={() => setShowVideo(false)}
              >
                ← Volver
              </button>

              <button
                type="button"
                className="btn btn-outline-light"
                onClick={onClose}
              >
                Cerrar ✕
              </button>
            </div>

            <div className="service-modal-video-wrapper">
              <iframe
                src={embedUrl}
                title={service.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        ) : (
          <>
            {/* ================= NORMAL CONTENT ================= */}
            <div className="d-flex justify-content-between align-items-center">
              <h3 className="m-0">{service.title}</h3>
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={onClose}
              >
                Cerrar ✕
              </button>
            </div>

            <p className="mt-3">{service.descriptionLarga}</p>

            {/* ================= SÍNTOMAS AS BULLETS ================= */}
            {symptoms.length > 0 && (
              <div className="mt-4">
                <p className="ph4 mb-2">Síntomas</p>
                <ul className="ps-3">
                  {symptoms.map((symptom, i) => (
                    <li key={i}>{symptom}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* ================= IMAGE CAROUSEL ================= */}
            {slides.length > 0 && <SideCarousel slides={slides} />}

            {/* ================= VIDEO THUMBNAIL ================= */}
            {hasVideo && (
              <div className="mt-4">
                <p className="ph4 mb-2">Conozca más con este video</p>

                <button
                  type="button"
                  className="video-thumb"
                  onClick={() => setShowVideo(true)}
                >
                  <img src={videoThumbSrc} alt={`Video ${service.title}`} />
                  <span className="video-thumb-play-icon">▶</span>
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
