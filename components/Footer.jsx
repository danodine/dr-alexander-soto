import FooterContactButton from "./FooterContactButton";

export default function Footer() {
  return (
    <footer className="site-footer-modern">
      {/* Decorative Background Glows */}
      <div className="site-footer-glow site-footer-glow-1" />
      <div className="site-footer-glow site-footer-glow-2" />

      <div className="container">
        <div className="site-footer-top">
          <div className="site-footer-brand">
            <div className="site-footer-brand-badge">Dr. Alexander Soto</div>
            <h2 className="site-footer-title">
              AtenciÃ³n especializada en pie y tobillo
            </h2>
            <p className="site-footer-description">
              TraumatologÃ­a y ortopedia con un enfoque preciso, humano y
              personalizado para recuperar tu movilidad.
            </p>

            <div className="site-footer-socials">
              {/* Instagram */}
              <a
                href="https://www.instagram.com/dralexandersoto/"
                target="_blank"
                rel="noopener noreferrer"
                className="site-footer-social-link"
                aria-label="Instagram"
              >
                <svg
                  className="site-footer-social-icon"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.791-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.209-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              {/* Facebook */}
              <a
                href="https://www.facebook.com/dralexandersoto"
                target="_blank"
                rel="noopener noreferrer"
                className="site-footer-social-link"
                aria-label="Facebook"
              >
                <svg
                  className="site-footer-social-icon"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                </svg>
              </a>
              {/* TikTok */}
              <a
                href="https://www.tiktok.com/@dr.alexandersoto?_r=1&_t=ZS-97eEYpGVQUp"
                target="_blank"
                rel="noopener noreferrer"
                className="site-footer-social-link"
                aria-label="TikTok"
              >
                <svg
                  className="site-footer-social-icon"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.3 0 .59.05.86.14V9.4a6.34 6.34 0 0 0-.86-.06A6.34 6.34 0 0 0 3.17 15.68a6.34 6.34 0 0 0 10.83 4.48 6.31 6.31 0 0 0 1.86-4.48V8.77a8.27 8.27 0 0 0 4.84 1.55V6.88c-.38 0-.75-.07-1.11-.19z" />
                </svg>
              </a>
            </div>
          </div>

          <div className="site-footer-grid">
            <div className="site-footer-card">
              <p className="site-footer-card-label">Horario de atenciÃ³n</p>
              <ul className="site-footer-list">
                <li>
                  <span>Lunes</span>
                  <strong>09h00 a 13h00 Â· 15h00 a 18h00 (Quito)</strong>
                </li>
                <li>
                  <span>MiÃ©rcoles</span>
                  <strong>09h00 a 13h00 (Tumbaco - La Martina)</strong>
                  <strong>15h00 a 19h00 (Quito)</strong>
                </li>
                <li>
                  <span>Jueves y Viernes</span>
                  <strong>15h00 a 19h00 (Quito)</strong>
                </li>
              </ul>
            </div>

            <div className="site-footer-card">
              <p className="site-footer-card-label">Contacto</p>

              <div className="site-footer-contact-block">
                <p className="site-footer-contact-title">UbicaciÃ³n Principal</p>
                <a
                  className="site-footer-link"
                  href="https://www.google.com/maps/search/?api=1&query=Av. Mariana de JesÃºs OE7-02 y NuÃ±o de Valderrama P.B., Quito"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Av. Mariana de JesÃºs OE7-02 y NuÃ±o de Valderrama P.B., Quito.
                </a>
              </div>
              <FooterContactButton />

              <div
                className="site-footer-contact-block"
                style={{ marginTop: "20px" }}
              >
                <p className="site-footer-contact-title">
                  AtenciÃ³n TelefÃ³nica / WhatsApp
                </p>
                <a
                  href="tel:+593990165538"
                  className="site-footer-link"
                  style={{ fontWeight: "700" }}
                >
                  (+593) 990165538
                </a>
                <p className="site-footer-contact-title">
                  Contactos personales
                </p>
                <a
                  href="mailto:alexandersototoledo@gmail.com"
                  className="site-footer-link"
                  style={{ fontWeight: "700" }}
                >
                  alexandersototoledo@gmail.com
                </a>
                <a
                  href="tel:+593990165538"
                  className="site-footer-link"
                  style={{ fontWeight: "700" }}
                >
                  (+593) 990165538
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="site-footer-bottom">
          <p>
            Â© {new Date().getFullYear()} Dr. Alexander Soto. Todos los derechos
            reservados.
          </p>

          <p style={{ fontSize: "0.8rem", opacity: 0.8 }}>
            Developed by{" "}
            <a
              // href=""
              // target="_blank"
              // rel="noopener noreferrer"
              style={{
                color: "var(--cyan)",
                textDecoration: "none",
                fontWeight: "700",
                letterSpacing: "0.05em",
              }}
            >
              HeiLabs
            </a>{" "}
            Germany
          </p>
        </div>
      </div>
    </footer>
  );
}
