import React, { useEffect, useState } from "react";

function SideCarousel({ slides = [] }) {
  const [idx, setIdx] = useState(0);
  if (!slides.length) return null;

  const next = () => setIdx((i) => (i + 1) % slides.length);
  const prev = () => setIdx((i) => (i - 1 + slides.length) % slides.length);
  const cur = slides[idx];

  return (
    <div className="position-relative my-3">
      {/* Left arrow */}
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

      {/* Image */}
      <img
        src={cur.image}
        alt={cur.altText || cur.symptom || "imagen"}
        className="d-block mx-auto img-fluid carucel-image"
      />

      {/* Right arrow */}
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

      {/* Caption (symptom text) */}
      {(cur.symptom) && (
        <div className="text-center mt-3">
          <p className="detail-label-2 m-0">{cur.symptom}</p>
          <small className="text-muted">{idx + 1} / {slides.length}</small>
        </div>
      )}
    </div>
  );
}

export default function ServiceModal({ open, onClose, service }) {
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!open || !service) return null;

  return (
    <div
      className="position-fixed w-100 h-100"
      style={{ inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 1050 }}
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="bg-white rounded shadow p-3 p-md-4"
        style={{
          maxWidth: 900,
          width: "92%",
          maxHeight: "90vh",
          overflowY: "auto",
          margin: "5vh auto",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="d-flex justify-content-between align-items-center">
          <h3 className="m-0">{service.title}</h3>
          <button type="button" className="btn btn-outline-secondary" onClick={onClose}>
            Cerrar ✕
          </button>
        </div>

        <p className="mt-3">{service.descriptionLarga}</p>

        {/* NEW: Symptoms heading above carousel */}
        {service.slides?.length > 0 && (
          <p className="ph4 mt-4 mb-2">Síntomas</p>
        )}

        <SideCarousel slides={service.slides} />
      </div>
    </div>
  );
}
