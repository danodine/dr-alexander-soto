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
    `/assets/images/foot-sequence/frame_${index.toString().padStart(4, "0")}.jpg`;

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

      frameIndexes.forEach((frameIndex, index) => {
        const img = new Image();
        img.src = currentFrame(frameIndex);
        imagesRef.current.push(img);
        if (index === 0) {
          img.onload = () =>
            context.drawImage(img, 0, 0, canvas.width, canvas.height);
        }
      });

      const renderCanvas = (index) => {
        const img = imagesRef.current[index];
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
              trigger: sectionRef.current, // We pin the section, keeping the layout stable!
              start: "top top",
              end: "+=600%",
              scrub: 1,
              pin: true,
              pinSpacing: true,
              refreshPriority: 2,
            },
          });

          // 1. Animate the frames
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

          // 2. Animate the Text Blocks smoothly
          tl.to(text1Ref.current, { opacity: 0, y: -50, duration: 1 }, 2.5);
          tl.fromTo(
            text2Ref.current,
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 1 },
            3.5,
          ).to(text2Ref.current, { opacity: 0, y: -50, duration: 1 }, 6.5);
          tl.fromTo(
            text3Ref.current,
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 1 },
            7.5,
          );
        });

        mm.add("(max-width: 767px)", () => {
          const sequence = setupCanvas(4);
          if (!sequence) return;

          let frame = 0;
          let animationFrameId;
          let lastFrameTime = 0;
          let isVisible = true;

          const visibilityObserver = new IntersectionObserver(([entry]) => {
            isVisible = entry.isIntersecting;
          });

          visibilityObserver.observe(section);

          const animate = (time) => {
            if (isVisible && time - lastFrameTime > 90) {
              sequence.renderCanvas(frame);
              frame = (frame + 1) % sequence.frameTotal;
              lastFrameTime = time;
            }

            animationFrameId = requestAnimationFrame(animate);
          };

          animationFrameId = requestAnimationFrame(animate);

          return () => {
            visibilityObserver.disconnect();
            cancelAnimationFrame(animationFrameId);
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

    return () => {
      observer?.disconnect();
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
      {/* THE PINNED SECTION: Back in the normal layout flow, so no more overlapping! */}
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
              height: "100vh",
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

            <div ref={text2Ref} className="svs-panel" style={{ opacity: 0 }}>
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

            <div ref={text3Ref} className="svs-panel" style={{ opacity: 0 }}>
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
