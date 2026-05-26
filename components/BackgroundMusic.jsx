"use client";

import { useRef, useState } from "react";

export default function BackgroundMusic() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.volume = 0.1; // Gentle background volume
      audioRef.current.play().catch((err) => {
        console.error("Error al reproducir la música:", err);
      });
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src="/assets/bg-music.mp3"
        preload="none"
        loop
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      <button
        onClick={toggleMusic}
        // This line connects the React state to the CSS animation
        className={`music-floating-button ${isPlaying ? "is-playing" : ""}`}
        title={isPlaying ? "Pausar Música" : "Reproducir Música"}
        aria-label={isPlaying ? "Pausar Música" : "Reproducir Música"}
      >
        {/* The 4 bars of the sound wave */}
        <span className="wave-bar"></span>
        <span className="wave-bar"></span>
        <span className="wave-bar"></span>
        <span className="wave-bar"></span>
      </button>
    </>
  );
}
