// src/components/Footer.jsx
import React from "react";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer_container">
          <div className="row footer-container-row">
            {/* Horario */}
            <div className="col-sm footer-container-col-1">
              <h6 className="text-uppercase mb-4 font-weight-bold">
                Horario de atención
              </h6>
              <p>Lunes: 09:00h a 13:00h - 15:00h a 18:00h</p>
              <p>Miércoles: 09:00h a 13:00h - 14h a 17h Cumbayá</p>
              <p>Jueves: 15:00h a 19:00h</p>
              <p>Viernes: 15:00h a 19:00h</p>
            </div>

            {/* Contacto */}
            <div className="col-sm">
              <h6 className="text-uppercase mb-4 font-weight-bold">Contacto</h6>
              <p>Av. Mariana de Jesús OE7-02 y Nuño de Valderrama P.B.</p>
              <p>info@gmail.com</p>
              <p>(+593) 990165538</p>
              <p>(+593) 999889098</p>
              <p>alexandersototoledo@gmail.com (Personal)</p>
              <p>(+593) 990257861 (Personal)</p>
            </div>

            {/* Redes sociales */}
            <div className="col-sm footer-container-3">
              <h6 className="text-uppercase mb-4 font-weight-bold">Síguenos</h6>
              <div className="footer_icons">
                <a
                  className="footer_icon"
                  href="https://www.facebook.com/dralexandersoto"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    src="/assets/icons/icons8-facebook-50.png"
                    alt="Icono logo Facebook"
                  />
                  <span hidden={true}>
                    Facebook doctor Alexander Soto (enlace externo)
                  </span>
                </a>
              </div>
              <div className="footer_icons">
                <a
                  className="footer_icon"
                  href="https://www.instagram.com/dralexandersoto/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    src="/assets/icons/icons8-instagram-50.png"
                    alt="Icono logo Instagram"
                  />
                  <span hidden={true}>
                    Instagram doctor Alexander Soto (enlace externo)
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
        <p>&copy; 2025 Dr. Alexander Soto. All rights reserved.</p>
      </div>
    </footer>
  );
}
