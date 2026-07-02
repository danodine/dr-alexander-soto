"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

const ContactModal = dynamic(() => import("./ContactModal"), {
  ssr: false,
});

export default function FooterContactButton() {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setModalOpen(true)}
        className="future-link"
        style={{
          width: "100%",
          marginTop: "20px",
          border: "none",
          cursor: "pointer",
          fontSize: "0.85rem",
        }}
      >
        ESCRÍBANOS
      </button>
      {isModalOpen && (
        <ContactModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
      )}
    </>
  );
}
