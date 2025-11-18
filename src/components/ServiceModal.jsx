// src/components/ServiceModal.jsx
import React, { useEffect, useState } from "react";

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
        alt={cur.altText || cur.symptom || "imagen"}
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

      {cur.symptom && (
        <div className="text-center mt-3">
          <p className="detail-label-2 m-0">{cur.symptom}</p>
          <small className="text-muted">
            {idx + 1} / {slides.length}
          </small>
        </div>
      )}
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

  // whenever you open the modal / change service, reset video mode
  useEffect(() => {
    setShowVideo(false);
  }, [open, service]);

  if (!open || !service) return null;

  const hasVideo = !!service.videoUrl; // expects an embed URL, e.g. https://www.youtube.com/embed/XXXX

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
                src={service.videoUrl}
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

            {service.slides?.length > 0 && (
              <p className="ph4 mt-4 mb-2">Síntomas</p>
            )}

            <SideCarousel slides={service.slides} />

            {/* ================= VIDEO THUMBNAIL ================= */}
            {hasVideo && (
              <div className="mt-4">
                <p className="ph4 mb-2">Conosca mas con este video</p>

                <button
                  type="button"
                  className="video-thumb"
                  onClick={() => setShowVideo(true)}
                >
                  <img
                    src={service.videoThumbnail || service.image}
                    alt={`Video ${service.title}`}
                  />
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
