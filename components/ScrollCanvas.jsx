"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const ScrollCanvas = () => {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);

  // Text panels
  const text1Ref = useRef(null);
  const text2Ref = useRef(null);
  const text3Ref = useRef(null);

  const imagesRef = useRef([]);
  const frameCount = 192;

  const currentFrame = (index) =>
    `/assets/images/foot-sequence/frame_${index.toString().padStart(4, "0")}.webp`;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    if (!section) return;

    let ctx;
    let mm;
    let observer;
    let initialized = false;

    const setupCanvas = (frameStep = 1) => {
      const canvas = canvasRef.current;
      if (!canvas) return null;

      const context = canvas.getContext("2d");
      canvas.width = 1920;
      canvas.height = 1080;
      imagesRef.current = [];

      const frameIndexes = [];
      for (let i = 1; i <= frameCount; i += frameStep) {
        frameIndexes.push(i);
      }
      if (frameIndexes[frameIndexes.length - 1] !== frameCount) {
        frameIndexes.push(frameCount);
      }

      imagesRef.current = Array.from({ length: frameIndexes.length });

      const loadFrame = (index) => {
        if (imagesRef.current[index]) return imagesRef.current[index];

        const img = new Image();
        img.decoding = "async";
        img.src = currentFrame(frameIndexes[index]);
        imagesRef.current[index] = img;
        return img;
      };

      const preloadAround = (index, radius = 8) => {
        const start = Math.max(0, index - 2);
        const end = Math.min(frameIndexes.length - 1, index + radius);

        if ("requestIdleCallback" in window) {
          window.requestIdleCallback(() => {
            for (let i = start; i <= end; i += 1) loadFrame(i);
          });
          return;
        }

        window.setTimeout(() => {
          for (let i = start; i <= end; i += 1) loadFrame(i);
        }, 0);
      };

      loadFrame(0).onload = () =>
        context.drawImage(
          imagesRef.current[0],
          0,
          0,
          canvas.width,
          canvas.height,
        );

      const renderCanvas = (index) => {
        const img = loadFrame(index);
        preloadAround(index);

        if (img && img.complete) {
          context.clearRect(0, 0, canvas.width, canvas.height);
          context.drawImage(img, 0, 0, canvas.width, canvas.height);
        }
      };

      return {
        frameTotal: imagesRef.current.length,
        renderCanvas,
      };
    };

    const initSequence = () => {
      if (initialized) return;
      initialized = true;

      ctx = gsap.context(() => {
        mm = gsap.matchMedia();
        mm.add("(min-width: 768px)", () => {
          const sequence = setupCanvas();
          if (!sequence) return;

          const scrollObj = { frame: 0 };

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 78%",
              end: "bottom 22%",
              scrub: 0.85,
              refreshPriority: 2,
            },
          });

          tl.to(
            scrollObj,
            {
              frame: sequence.frameTotal - 1,
              snap: "frame",
              ease: "none",
              duration: 10,
              onUpdate: () =>
                sequence.renderCanvas(Math.round(scrollObj.frame)),
            },
            0,
          );
        });

        mm.add("(max-width: 767px)", () => {
          const sequence = setupCanvas(2);
          if (!sequence) return;

          const scrollObj = { frame: 0 };

          const tl = gsap.timeline({
            defaults: { ease: "power2.out" },
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 82%",
              end: "bottom 18%",
              scrub: 0.85,
              invalidateOnRefresh: true,
              refreshPriority: 2,
            },
          });

          tl.to(
            scrollObj,
            {
              frame: sequence.frameTotal - 1,
              snap: "frame",
              ease: "none",
              duration: 10,
              onUpdate: () =>
                sequence.renderCanvas(Math.round(scrollObj.frame)),
            },
            0,
          );

          return () => {
            tl.scrollTrigger?.kill();
            tl.kill();
          };
        });
      }, sectionRef);
    };

    observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        initSequence();
      },
      { rootMargin: "1200px 0px" },
    );

    observer.observe(section);

    const refreshAfterLoader = () => {
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
    };

    window.addEventListener("app-loader-complete", refreshAfterLoader);

    return () => {
      observer?.disconnect();
      window.removeEventListener("app-loader-complete", refreshAfterLoader);
      mm?.revert();
      ctx?.revert();
      imagesRef.current = [];
    };
  }, []);

  return (
    <div
      style={{ mixBlendMode: "screen", position: "relative", zIndex: 1 }}
      id="tratamientos"
    >
      {/* Scroll-driven video sequence that stays in the normal page flow. */}
      <section
        ref={sectionRef}
        className="svs-section"
        style={{ position: "relative", background: "transparent" }}
      >
        <div
          className="svs-video-wrap"
          style={{ position: "absolute", inset: 0, zIndex: 1 }}
        >
          <canvas
            ref={canvasRef}
            style={{
              display: "block",
              width: "100%",
              height: "100%",
              objectFit: "cover",
              // 1. Delete the black background
              mixBlendMode: "screen",
              // 2. Crush the dark grays into pure invisible black
              filter: "contrast(1.2) brightness(0.9)",
              // 3. Feather the top and bottom edges so it fades seamlessly
              WebkitMaskImage:
                "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
              maskImage:
                "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
            }}
          />
        </div>

        <div
          className="container svs-shell"
          style={{ zIndex: 10, position: "relative" }}
        >
          <div className="svs-stage">
            <div ref={text1Ref} className="svs-panel">
              <span className="svs-eyebrow">Paso 1</span>
              <h2 className="svs-heading">
                Análisis <span className="svs-heading-accent">Profundo</span>
              </h2>
              <p className="svs-body">
                Comenzamos entendiendo la biomecánica exacta de tu lesión para
                planificar el mejor enfoque.
              </p>
              <div className="svs-rule"></div>
            </div>

            <div ref={text2Ref} className="svs-panel">
              <span className="svs-eyebrow">Paso 2</span>
              <h2 className="svs-heading">
                Precisión <span className="svs-heading-accent">Quirúrgica</span>
              </h2>
              <p className="svs-body">
                Utilizamos técnicas mínimamente invasivas para reducir el tiempo
                de recuperación.
              </p>
              <div className="svs-rule"></div>
            </div>

            <div ref={text3Ref} className="svs-panel">
              <span className="svs-eyebrow">Paso 3</span>
              <h2 className="svs-heading">
                Recupera tu{" "}
                <span className="svs-heading-accent">Movilidad</span>
              </h2>
              <p className="svs-body">
                Vuelve a caminar, correr y vivir sin dolor con un seguimiento
                constante y personalizado.
              </p>
              <div className="svs-rule"></div>
            </div>
          </div>
        </div>

        {/* Subtle dark overlay so the white text stays readable against the bright foot hologram */}
        <div
          className="svs-overlay"
          style={{ zIndex: 5, opacity: 0.3, pointerEvents: "none" }}
        />
      </section>
    </div>
  );
};

export default ScrollCanvas;
