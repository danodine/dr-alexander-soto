"use client";

import { useEffect, useRef } from "react";

/**
 * GridCanvas
 */
export default function GridCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    /* ── Tunables ───────────────────────────────────────────────── */
    const LINE_COUNT = 9; // flowing lines
    const LINE_SEGS = 140; // smoothness per line
    const DOT_COUNT = 60; // scattered dots
    const PUSH_RADIUS = 170; // mouse influence radius (px)
    const LINE_PUSH = 55; // max line displacement
    const DOT_PUSH = 110; // max dot displacement (dots fly further)
    const RETURN_LINE = 0.016; // line return speed per frame
    const RETURN_DOT = 0.01; // dot return speed (slower = stays longer)
    const TIME_SCALE = 0.00022; // animation speed

    /* Colors tuned for a dark navy background */
    const LINE_RGBA = "rgba(140, 210, 255, 0.18)";
    const DOT_SMALL = "rgba(210, 235, 255, 0.72)"; // bright white-blue
    const DOT_LARGE = "rgba(90,  155, 220, 0.42)"; // muted blue

    let W = 0,
      H = 0,
      rafId;
    let time = 0;
    const mouse = { x: -9999, y: -9999 };

    /* ── Resize ─────────────────────────────────────────────────── */
    function resize() {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
      buildLines();
      buildDots();
    }

    /* ────────────────────────────────────────────────────────────
       LINES
       Each line has:
         yBase  — vertical anchor
         amp    — wave amplitude
         freq   — wave spatial frequency
         phase  — wave phase offset
         speed  — animation speed multiplier
         pts[]  — array of {ox, oy} displacement offsets
                  (base position is recomputed each frame from the wave)
    ──────────────────────────────────────────────────────────── */
    let lines = [];

    function buildLines() {
      lines = [];
      for (let i = 0; i < LINE_COUNT; i++) {
        // Distribute lines across the vertical space with slight randomness
        const yBase =
          H * ((i + 0.5 + (Math.random() - 0.5) * 0.4) / LINE_COUNT);
        lines.push({
          yBase,
          amp: H * (0.03 + Math.random() * 0.07),
          freq: 0.0014 + Math.random() * 0.0024,
          phase: Math.random() * Math.PI * 2,
          speed: (0.4 + Math.random() * 0.8) * (Math.random() < 0.5 ? 1 : -1),
          pts: Array.from({ length: LINE_SEGS + 1 }, () => ({ ox: 0, oy: 0 })),
        });
      }
    }

    /* Compute base (x,y) for a line point at segment index s */
    function lineBase(line, s) {
      const bx = (s / LINE_SEGS) * W;
      const by =
        line.yBase +
        Math.sin(bx * line.freq + line.phase + time * line.speed) * line.amp +
        Math.sin(bx * line.freq * 0.38 + time * line.speed * 0.55) *
          line.amp *
          0.3;
      return { bx, by };
    }

    function tickLines() {
      if (mouse.x < -999) {
        // Just decay offsets
        for (const ln of lines)
          for (const pt of ln.pts) {
            pt.ox *= 1 - RETURN_LINE;
            pt.oy *= 1 - RETURN_LINE;
          }
        return;
      }

      for (const ln of lines) {
        for (let s = 0; s <= LINE_SEGS; s++) {
          const pt = ln.pts[s];
          const { bx, by } = lineBase(ln, s);
          const wx = bx + pt.ox;
          const wy = by + pt.oy;

          // Mouse push
          const dx = wx - mouse.x;
          const dy = wy - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < PUSH_RADIUS && dist > 0) {
            const t = 1 - dist / PUSH_RADIUS;
            const smooth = t * t * (3 - 2 * t);
            const force = LINE_PUSH * smooth * 0.2;
            pt.ox += (dx / dist) * force;
            pt.oy += (dy / dist) * force;

            // Cap offset
            const len = Math.sqrt(pt.ox * pt.ox + pt.oy * pt.oy);
            if (len > LINE_PUSH) {
              pt.ox = (pt.ox / len) * LINE_PUSH;
              pt.oy = (pt.oy / len) * LINE_PUSH;
            }
          }

          // Return
          pt.ox *= 1 - RETURN_LINE;
          pt.oy *= 1 - RETURN_LINE;
        }
      }
    }

    function drawLines() {
      ctx.strokeStyle = LINE_RGBA;
      ctx.lineWidth = 1.15;

      for (const ln of lines) {
        ctx.beginPath();
        for (let s = 0; s <= LINE_SEGS; s++) {
          const pt = ln.pts[s];
          const { bx, by } = lineBase(ln, s);
          const x = bx + pt.ox;
          const y = by + pt.oy;
          s === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
    }

    /* ────────────────────────────────────────────────────────────
       DOTS
       Two visual types:
         type 0 — small bright (2-4px)
         type 1 — larger muted blue (5-9px)
       Dots have a slow ambient drift plus mouse-push displacement.
       The ox/oy offset persists longer than lines.
    ──────────────────────────────────────────────────────────── */
    let dots = [];

    function buildDots() {
      dots = [];
      for (let i = 0; i < DOT_COUNT; i++) {
        const type = Math.random() < 0.62 ? 0 : 1;
        dots.push({
          x: Math.random() * W,
          y: Math.random() * H,
          ox: 0,
          oy: 0,
          r: type === 0 ? 1.8 + Math.random() * 2.4 : 4 + Math.random() * 5,
          type,
          vx: (Math.random() - 0.5) * 0.14,
          vy: (Math.random() - 0.5) * 0.09,
        });
      }
    }

    function tickDots() {
      for (const d of dots) {
        // Ambient drift
        d.x += d.vx;
        d.y += d.vy;
        if (d.x < -20) d.x = W + 20;
        if (d.x > W + 20) d.x = -20;
        if (d.y < -20) d.y = H + 20;
        if (d.y > H + 20) d.y = -20;

        // Mouse push
        if (mouse.x > -999) {
          const wx = d.x + d.ox;
          const wy = d.y + d.oy;
          const dx = wx - mouse.x;
          const dy = wy - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < PUSH_RADIUS && dist > 0) {
            const t = 1 - dist / PUSH_RADIUS;
            const smooth = t * t * (3 - 2 * t);
            const force = DOT_PUSH * smooth * 0.26;
            d.ox += (dx / dist) * force;
            d.oy += (dy / dist) * force;

            const len = Math.sqrt(d.ox * d.ox + d.oy * d.oy);
            if (len > DOT_PUSH) {
              d.ox = (d.ox / len) * DOT_PUSH;
              d.oy = (d.oy / len) * DOT_PUSH;
            }
          }
        }

        // Return offset slowly
        d.ox *= 1 - RETURN_DOT;
        d.oy *= 1 - RETURN_DOT;
      }
    }

    function drawDots() {
      for (const d of dots) {
        const x = d.x + d.ox;
        const y = d.y + d.oy;
        ctx.beginPath();
        ctx.arc(x, y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = d.type === 0 ? DOT_SMALL : DOT_LARGE;
        ctx.fill();
      }
    }

    /* ── Main loop ──────────────────────────────────────────────── */
    function tick() {
      time += TIME_SCALE * 60;
      ctx.clearRect(0, 0, W, H);

      tickLines();
      tickDots();
      drawLines();
      drawDots();

      rafId = requestAnimationFrame(tick);
    }

    /* ── Input ──────────────────────────────────────────────────── */
    function onMouseMove(e) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    }
    function onTouchMove(e) {
      const t = e.touches[0];
      mouse.x = t.clientX;
      mouse.y = t.clientY;
    }
    function onLeave() {
      mouse.x = -9999;
      mouse.y = -9999;
    }

    /* Bind canvas events */
    resize();
    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("mouseleave", onLeave, { passive: true });
    tick();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
      }}
      aria-hidden="true"
    />
  );
}
