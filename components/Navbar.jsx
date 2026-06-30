"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const NAV_ITEMS = [
  { href: "/#inicio", label: "Inicio" },
  { href: "/#sobre-mi", label: "Sobre mí" },
  { href: "/servicios#tratamientos", label: "Tratamiento" },
  { href: "/servicios", label: "Servicios" },
  { href: "/contacto", label: "Contacto" },
  { href: "/blog", label: "Blog" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeHash, setActiveHash] = useState("");

  const overlayRef = useRef(null);
  const panelRef = useRef(null);
  const linksRef = useRef([]);

  // Check active state based on URL and current Hash
  const isActive = (path) => {
    if (path === "/blog") return pathname.startsWith("/blog");
    if (path === "/contacto") return pathname === "/contacto";
    if (path.startsWith("/servicios")) return pathname.startsWith("/servicios");
    return pathname === "/" && `/#${activeHash.replace("#", "")}` === path;
  };

  const closeMenu = () => setMenuOpen(false);
  const toggleMenu = () => setMenuOpen((prev) => !prev);

  /**
   * SMART NAVIGATION HANDLER
   * Handles SPA transitions if on Home, or hard routing if on Blog.
   */
  const handleNavigation = (e, href) => {
    e.preventDefault();
    closeMenu();

    if (
      href === "/blog" ||
      href === "/contacto" ||
      href.startsWith("/servicios")
    ) {
      router.push(href);
      return;
    }

    if (href.startsWith("/#")) {
      const targetId = href.replace("/#", "");

      // 1. If we are NOT on the Home page (e.g., Blog)
      if (pathname !== "/") {
        // Force a clean redirect to the root with the hash
        // Using window.location.href here is safer to prevent hash stacking
        window.location.href = `/${href.replace("/", "")}`;
      }
      // 2. If we ARE on the Home page (SPA Mode)
      else {
        window.dispatchEvent(
          new CustomEvent("spa-navigate", { detail: "home" }),
        );

        setTimeout(() => {
          import("gsap/ScrollTrigger").then((mod) => {
            mod.ScrollTrigger.refresh();

            const element = document.getElementById(targetId);
            if (element) {
              const headerOffset = 90;
              const bodyRect = document.body.getBoundingClientRect().top;
              const elementRect = element.getBoundingClientRect().top;
              const elementPosition = elementRect - bodyRect;

              window.scrollTo({
                top: elementPosition - headerOffset,
                behavior: "smooth",
              });

              // FIX: Use window.location.hash instead of pushState to prevent stacking
              window.location.hash = targetId;
              setActiveHash(`#${targetId}`);
            }
          });
        }, 150);
      }
    }
  };

  // UI Effect: Handle scroll background and Hash changes
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handleScroll);

    const handleHashChange = () => setActiveHash(window.location.hash);
    window.addEventListener("hashchange", handleHashChange);

    // Initial check
    handleScroll();
    handleHashChange();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  // GSAP: Slide Menu Animations
  useEffect(() => {
    if (!overlayRef.current || !panelRef.current) return;
    const links = linksRef.current.filter(Boolean);

    if (menuOpen) {
      gsap.killTweensOf([overlayRef.current, panelRef.current, ...links]);
      gsap.set(overlayRef.current, { display: "block" });
      gsap.set(panelRef.current, { x: "-100%" });
      gsap.set(links, { x: -18, opacity: 0 });

      gsap.to(overlayRef.current, {
        opacity: 1,
        duration: 0.25,
        ease: "power2.out",
      });
      gsap.to(panelRef.current, {
        x: "0%",
        duration: 0.55,
        ease: "power3.out",
      });
      gsap.to(links, {
        x: 0,
        opacity: 1,
        duration: 0.4,
        stagger: 0.06,
        delay: 0.12,
        ease: "power2.out",
      });
      document.body.style.overflow = "hidden";
    } else {
      gsap.killTweensOf([overlayRef.current, panelRef.current, ...links]);
      gsap.to(panelRef.current, {
        x: "-100%",
        duration: 0.42,
        ease: "power3.inOut",
      });
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.22,
        ease: "power2.out",
        onComplete: () => {
          if (overlayRef.current)
            gsap.set(overlayRef.current, { display: "none" });
        },
      });
      document.body.style.overflow = "";
    }
  }, [menuOpen]);

  return (
    <>
      {/* CIRCULAR NAVBAR BUTTON */}
      <nav
        className={`circle-navbar ${isScrolled ? "circle-navbar-scrolled" : ""}`}
      >
        <div className="desktop-nav-shell" aria-label="Navegación principal">
          <a
            href="/#inicio"
            className="desktop-nav-brand"
            onClick={(e) => handleNavigation(e, "/#inicio")}
          >
            Dr. Alexander Soto
          </a>
          <ul className="desktop-nav-links">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={(e) => handleNavigation(e, item.href)}
                  className={`desktop-nav-link ${isActive(item.href) ? "active" : ""}`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <button
          type="button"
          className={`circle-menu-button ${menuOpen ? "is-open" : ""}`}
          onClick={toggleMenu}
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={menuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>

      {/* FULL SCREEN MENU OVERLAY */}
      <div
        ref={overlayRef}
        className="mobile-menu-overlay"
        onClick={closeMenu}
        style={{ display: "none", opacity: 0 }}
      >
        <aside
          ref={panelRef}
          className="mobile-slide-menu"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="mobile-slide-menu-header">
            <div className="mobile-slide-brand">
              <div className="mobile-slide-brand-copy">
                <span className="mobile-slide-name">Dr. Alexander Soto</span>
                <span className="mobile-slide-subtitle">
                  Traumatología · Pie y Tobillo
                </span>
              </div>
            </div>
          </div>

          <ul className="mobile-slide-links">
            {NAV_ITEMS.map((item, index) => (
              <li
                key={item.href}
                ref={(el) => {
                  linksRef.current[index] = el;
                }}
              >
                <a
                  href={item.href}
                  onClick={(e) => handleNavigation(e, item.href)}
                  className={`mobile-slide-link ${isActive(item.href) ? "active" : ""}`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </>
  );
}
