import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Servicios from "./pages/Services";
import Contacto from "./pages/Contacto";

export default function App() {
  useEffect(() => {
    const whatsappBtn = document.querySelector(".whatsapp-button");
    const onClick = (event) => {
      event.preventDefault();
      const phoneNumber = "593990165538";
      const message = encodeURIComponent(
        "Hola, me gustaría obtener más información sobre sus servicios."
      );
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
      window.open(whatsappUrl, "_blank");
    };
    if (whatsappBtn) whatsappBtn.addEventListener("click", onClick);
    return () => {
      if (whatsappBtn) whatsappBtn.removeEventListener("click", onClick);
    };
  }, []);

  return (
    <div className="app d-flex flex-column min-vh-100">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/servicios" element={<Servicios />} />
        <Route path="/contacto" element={<Contacto />} />
      </Routes>
      <Footer />
      <a
        href="https://wa.me/593990165538?text=Hello,%20I%20need%20assistance!"
        target="_blank"
        rel="noreferrer"
        className="whatsapp-button"
      >
        <img
          src="/assets/icons/icons8-whatsapp-96.png"
          alt="Icono de WhatsApp"
        />
      </a>
    </div>
  );
}
