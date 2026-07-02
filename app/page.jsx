"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import HomePage from "@/components/HomePage";

const ServiciosPage = dynamic(() => import("@/components/ServiciosPage"), {
  ssr: false,
});

export default function MainApp() {
  const [currentView, setCurrentView] = useState("home");

  // 1. HANDLE ARRIVAL FROM BLOG
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    // Check if user landed with a hash (e.g., #servicios)
    const handleInitialScroll = () => {
      const hash = window.location.hash;
      if (hash) {
        const targetId = hash.replace("#", "");
        // If the hash is for a specific section, make sure we are in 'home' view
        setCurrentView("home");

        setTimeout(() => {
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
          }
        }, 600); // Wait for GSAP and DOM to settle
      }
    };

    handleInitialScroll();
  }, []);

  // 2. VIEW SWITCHING LOGIC
  useEffect(() => {
    if (currentView === "services") {
      window.scrollTo({ top: 0, behavior: "instant" });
      // Clear hash when moving to services view to prevent confusion
      if (window.location.hash) {
        window.history.replaceState(null, "", window.location.pathname);
      }
    }
  }, [currentView]);

  // 3. LISTEN FOR NAVBAR EVENTS
  useEffect(() => {
    const handleSpaNav = (e) => setCurrentView(e.detail);
    window.addEventListener("spa-navigate", handleSpaNav);
    return () => window.removeEventListener("spa-navigate", handleSpaNav);
  }, []);

  return (
    <>
      {currentView === "home" && <HomePage onNavigate={setCurrentView} />}
      {currentView === "services" && (
        <ServiciosPage onNavigate={setCurrentView} />
      )}
    </>
  );
}
