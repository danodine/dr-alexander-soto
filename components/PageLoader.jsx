"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const MIN_LOADER_MS = 900;
const MAX_LOADER_MS = 2200;

export default function PageLoader() {
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const waitForWindowLoad = () =>
      new Promise((resolve) => {
        if (document.readyState === "complete") {
          resolve();
          return;
        }

        window.addEventListener("load", resolve, { once: true });
      });

    const waitForFonts = () => {
      if (!document.fonts?.ready) return Promise.resolve();
      return document.fonts.ready.catch(() => undefined);
    };

    const waitForCriticalImages = async () => {
      const images = Array.from(document.images).filter(
        (img) =>
          img.loading !== "lazy" &&
          img.getBoundingClientRect().top < window.innerHeight * 1.25,
      );

      await Promise.all(
        images.map((img) => {
          if (img.complete && img.naturalWidth > 0) return Promise.resolve();
          if (typeof img.decode === "function") {
            return img.decode().catch(() => undefined);
          }

          return new Promise((resolve) => {
            img.addEventListener("load", resolve, { once: true });
            img.addEventListener("error", resolve, { once: true });
          });
        }),
      );
    };

    const minimumDelay = new Promise((resolve) =>
      setTimeout(resolve, MIN_LOADER_MS),
    );
    const safetyTimeout = new Promise((resolve) =>
      setTimeout(resolve, MAX_LOADER_MS),
    );

    Promise.race([
      Promise.all([
        waitForWindowLoad(),
        waitForFonts(),
        waitForCriticalImages(),
        minimumDelay,
      ]),
      safetyTimeout,
    ]).then(() => {
      if (!isMounted) return;

      setIsExiting(true);
      window.setTimeout(() => {
        if (!isMounted) return;

        document.body.classList.remove("app-loading");
        window.dispatchEvent(new Event("app-loader-complete"));
        setIsVisible(false);
      }, 420);
    });

    return () => {
      isMounted = false;
      document.body.classList.remove("app-loading");
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className={`page-loader ${isExiting ? "is-exiting" : ""}`}
      role="status"
      aria-live="polite"
    >
      <div className="page-loader-shell">
        <div className="page-loader-logo-mark" aria-hidden="true">
          <Image
            src="/assets/images/logo.png"
            alt=""
            width={112}
            height={112}
            priority
            className="page-loader-logo"
          />
        </div>
        <p className="page-loader-kicker">Dr. Alexander Soto</p>
        <p className="page-loader-title">Preparando tu experiencia</p>
        <div className="page-loader-progress" aria-hidden="true">
          <span />
        </div>
      </div>
    </div>
  );
}
