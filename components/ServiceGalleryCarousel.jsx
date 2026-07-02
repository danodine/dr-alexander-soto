"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

export default function ServiceGalleryCarousel({ gallery = [], title }) {
  const slides = useMemo(
    () => gallery.filter((item) => item?.image),
    [gallery],
  );
  const [activeIndex, setActiveIndex] = useState(0);

  if (!slides.length) return null;

  const activeSlide = slides[activeIndex];
  const hasMultipleSlides = slides.length > 1;

  const goToPrevious = () => {
    setActiveIndex((current) =>
      current === 0 ? slides.length - 1 : current - 1,
    );
  };

  const goToNext = () => {
    setActiveIndex((current) =>
      current === slides.length - 1 ? 0 : current + 1,
    );
  };

  return (
    <section className="service-detail-carousel" aria-label="Galería visual">
      <div className="service-detail-carousel-frame">
        <Image
          key={activeSlide.image}
          src={activeSlide.image}
          alt={activeSlide.altText || `${title} ${activeIndex + 1}`}
          width={960}
          height={640}
          className="service-detail-carousel-image"
          sizes="(max-width: 991px) calc(100vw - 48px), 720px"
          priority={activeIndex === 0}
        />

        {hasMultipleSlides && (
          <>
            <button
              type="button"
              className="service-detail-carousel-button is-prev"
              onClick={goToPrevious}
              aria-label="Ver imagen anterior"
            >
              <FaChevronLeft aria-hidden="true" />
            </button>
            <button
              type="button"
              className="service-detail-carousel-button is-next"
              onClick={goToNext}
              aria-label="Ver imagen siguiente"
            >
              <FaChevronRight aria-hidden="true" />
            </button>
          </>
        )}
      </div>

      {hasMultipleSlides && (
        <div className="service-detail-carousel-footer">
          <p>
            Imagen {activeIndex + 1} de {slides.length}
          </p>
          <div className="service-detail-carousel-dots">
            {slides.map((slide, index) => (
              <button
                key={slide.image}
                type="button"
                className={index === activeIndex ? "is-active" : ""}
                onClick={() => setActiveIndex(index)}
                aria-label={`Ver imagen ${index + 1}`}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
