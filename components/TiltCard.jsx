"use client";

import { useRef, useState } from "react";
import Image from "next/image";

export default function TiltCard({ href, image, alt }) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({
    x: 0,
    y: 0,
    glareX: 50,
    glareY: 50,
    active: false,
  });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -15;
    const rotateY = ((x - centerX) / centerX) * 15;

    setTilt({
      x: rotateX,
      y: rotateY,
      glareX: (x / rect.width) * 100,
      glareY: (y / rect.height) * 100,
      active: true,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0, glareX: 50, glareY: 50, active: false });
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="flare-card"
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: tilt.active
          ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(1.05, 1.05, 1.05)`
          : "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
        transition: tilt.active ? "none" : "transform 0.5s ease-out",
      }}
    >
      <div
        className="flare-glare"
        style={{
          opacity: tilt.active ? 1 : 0,
          background: `radial-gradient(circle at ${tilt.glareX}% ${tilt.glareY}%, rgba(124, 234, 255, 0.4), transparent 60%)`,
        }}
      />
      <div className="flare-card-content">
        <Image
          src={image}
          alt={alt}
          className="flare-logo"
          width={220}
          height={140}
          sizes="(max-width: 768px) 42vw, 220px"
        />
      </div>
    </a>
  );
}
