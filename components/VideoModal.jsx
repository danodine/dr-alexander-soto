"use client";
import { motion, AnimatePresence } from "framer-motion";

export default function VideoModal({
  isOpen,
  onClose,
  videoId = "YOUR_VIDEO_ID",
}) {
  if (!isOpen) return null;

  const safeVideoId = /^[a-zA-Z0-9_-]{11}$/.test(videoId) ? videoId : null;

  return (
    <AnimatePresence>
      <div
        className="modal-backdrop"
        onClick={onClose}
        style={{ zIndex: 6000 }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotateX: -20 }}
          animate={{ opacity: 1, scale: 1, rotateX: 0 }}
          exit={{ opacity: 0, scale: 0.8, rotateX: 10 }}
          className="service-modal-shell-future" // Reusing your existing high-end shell class
          style={{
            width: "min(1000px, 94vw)",
            height: "auto",
            padding: "2px",
            overflow: "hidden",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className="doctor-video-frame"
            style={{ border: "none", borderRadius: "32px" }}
          >
            <button
              className="modal-close-btn"
              onClick={onClose}
              style={{ zIndex: 100 }}
            >
              ✕
            </button>

            <div className="video-container" style={{ borderRadius: "30px" }}>
              {safeVideoId && (
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${safeVideoId}?autoplay=1`}
                  title="Dr. Alexander Soto - Mi Misión"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  referrerPolicy="strict-origin-when-cross-origin"
                  sandbox="allow-scripts allow-same-origin allow-presentation"
                ></iframe>
              )}
            </div>
          </div>

          {/* Subtle tech label below video */}
          <div
            style={{
              padding: "20px",
              textAlign: "center",
              background: "rgba(0,0,0,0.3)",
            }}
          >
            <span className="doctor-video-kicker">
              PRESENTACIÓN OFICIAL — DR. ALEXANDER SOTO
            </span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
