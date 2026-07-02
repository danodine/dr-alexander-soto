"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ContactModal({ isOpen, onClose }) {
  const [status, setStatus] = useState({ type: "idle", message: "" });
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setStatus({ type: "idle", message: "" });
      setIsSending(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const formData = new FormData(form);
    setIsSending(true);
    setStatus({ type: "idle", message: "" });

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          message: formData.get("message"),
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.error || "No se pudo enviar el mensaje.");
      }

      form.reset();
      setStatus({
        type: "success",
        message: data.message || "Mensaje enviado correctamente.",
      });
    } catch (error) {
      setStatus({
        type: "error",
        message:
          error.message || "No se pudo enviar el mensaje. Intente nuevamente.",
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="modal-backdrop" onClick={onClose}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20, rotateX: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="tech-modal-content"
          onClick={(e) => e.stopPropagation()}
        >
          <button className="modal-close-btn" onClick={onClose}>
            X
          </button>

          <div className="text-center mb-4">
            <h2
              className="service-modal-title-future"
              style={{ fontSize: "2.5rem" }}
            >
              Escríbanos
            </h2>
            <p className="site-footer-description">
              Escríbanos sus inquietudes
            </p>
          </div>

          <form className="form-container" onSubmit={handleSubmit}>
            <input
              name="name"
              type="text"
              placeholder="Nombre completo"
              className="tech-input"
              maxLength={100}
              required
            />
            <input
              name="email"
              type="email"
              placeholder="Correo electrónico"
              className="tech-input"
              maxLength={254}
              required
            />
            <textarea
              name="message"
              placeholder="¿En qué podemos ayudarle?"
              className="tech-input"
              style={{ height: "120px" }}
              maxLength={4000}
              required
            />

            {status.message && (
              <p className={`contact-form-status ${status.type}`}>
                {status.message}
              </p>
            )}

            <motion.button
              whileHover={{ scale: isSending ? 1 : 1.02 }}
              whileTap={{ scale: isSending ? 1 : 0.98 }}
              type="submit"
              className="future-link"
              disabled={isSending}
              style={{
                width: "100%",
                border: "none",
                cursor: isSending ? "wait" : "pointer",
              }}
            >
              {isSending ? "Enviando..." : "Enviar Mensaje"}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
