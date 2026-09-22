"use client";

import { useEffect, useRef, useState } from "react";

/**
 * HeroScene — lightweight CSS 3D floating document cards + orbit rings.
 * No Three.js / WebGL. Cursor-reactive tilt via CSS custom properties.
 * Automatically disables on mobile (< 768px) and reduced-motion.
 */

interface DocCard {
  id: number;
  label: string;
  type: string;
  color: string;
  x: string;
  y: string;
  z: number;
  rotate: string;
  delay: string;
  duration: string;
  scale: number;
}

const DOC_CARDS: DocCard[] = [
  { id: 1, label: "OS Unit-2 Notes",      type: "Notes",      color: "#6366F1", x: "-42%", y: "-30%", z: 40,  rotate: "-8deg",  delay: "0s",    duration: "6s",   scale: 1    },
  { id: 2, label: "DBMS PYQ 2024",        type: "PYQ",        color: "#10B981", x: "38%",  y: "-38%", z: 20,  rotate: "6deg",   delay: "0.8s",  duration: "5.5s", scale: 0.9  },
  { id: 3, label: "CN Lab Manual",        type: "Lab Manual", color: "#22D3EE", x: "-48%", y: "28%",  z: 15,  rotate: "-5deg",  delay: "1.4s",  duration: "7s",   scale: 0.85 },
  { id: 4, label: "DSA Study Guide",      type: "Study",      color: "#8B5CF6", x: "44%",  y: "32%",  z: 30,  rotate: "9deg",   delay: "0.4s",  duration: "5s",   scale: 0.88 },
  { id: 5, label: "Maths Formula Sheet",  type: "Notes",      color: "#F59E0B", x: "8%",   y: "-52%", z: 10,  rotate: "-3deg",  delay: "1.8s",  duration: "6.5s", scale: 0.78 },
];

const NODE_POSITIONS = [
  { x: "20%",  y: "15%",  size: 5, opacity: 0.5, pulse: "2.1s" },
  { x: "75%",  y: "25%",  size: 4, opacity: 0.4, pulse: "2.7s" },
  { x: "12%",  y: "70%",  size: 6, opacity: 0.35, pulse: "3.1s" },
  { x: "85%",  y: "65%",  size: 4, opacity: 0.45, pulse: "1.9s" },
  { x: "50%",  y: "80%",  size: 3, opacity: 0.3, pulse: "2.5s" },
  { x: "32%",  y: "45%",  size: 4, opacity: 0.25, pulse: "3.5s" },
  { x: "65%",  y: "50%",  size: 5, opacity: 0.3, pulse: "2.3s" },
];

export default function HeroScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    setMounted(true);

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;
    if (window.innerWidth < 768) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const cx = window.innerWidth / 2;
        const cy = window.innerHeight / 2;
        const nx = (e.clientX - cx) / cx; // -1..1
        const ny = (e.clientY - cy) / cy;
        setTilt({ x: ny * -6, y: nx * 6 }); // subtle parallax tilt
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{ perspective: "1000px" }}
    >
      {/* 3D scene wrapper — tilts with cursor */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: "transform 0.15s linear",
          transformStyle: "preserve-3d",
        }}
      >
        {/* ── Floating Document Cards ── */}
        {DOC_CARDS.map((card) => (
          <div
            key={card.id}
            className="absolute hidden md:flex"
            style={{
              left: `calc(50% + ${card.x})`,
              top: `calc(50% + ${card.y})`,
              transform: `translateZ(${card.z}px) rotate(${card.rotate}) scale(${card.scale})`,
              animation: `floatSlow ${card.duration} ease-in-out ${card.delay} infinite`,
              transformOrigin: "center center",
            }}
          >
            <div
              style={{
                background: "rgba(12,15,28,0.82)",
                border: `1px solid ${card.color}30`,
                borderTop: `2px solid ${card.color}55`,
                boxShadow: `0 8px 32px rgba(0,0,0,0.4), 0 0 16px ${card.color}15, inset 0 1px 0 rgba(255,255,255,0.05)`,
                borderRadius: 12,
                padding: "10px 14px",
                minWidth: 148,
                backdropFilter: "blur(12px)",
              }}
            >
              {/* Doc card top bar */}
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
                <div style={{
                  width: 20, height: 20, borderRadius: 5,
                  background: `${card.color}25`,
                  border: `1px solid ${card.color}40`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
                }}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={card.color} strokeWidth="2.5" strokeLinecap="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14 2 14 8 20 8"/>
                  </svg>
                </div>
                <span style={{
                  fontSize: 9, fontWeight: 700, letterSpacing: "0.12em",
                  textTransform: "uppercase", color: card.color, opacity: 0.9,
                  fontFamily: "monospace",
                }}>
                  {card.type}
                </span>
              </div>
              {/* Title */}
              <div style={{
                fontSize: 11, fontWeight: 700, color: "rgba(241,245,249,0.9)",
                lineHeight: 1.3, maxWidth: 130,
              }}>
                {card.label}
              </div>
              {/* Fake lines */}
              <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 3 }}>
                {[70, 55, 40].map((w, i) => (
                  <div key={i} style={{
                    height: 2, borderRadius: 2,
                    background: `rgba(255,255,255,${0.06 - i * 0.01})`,
                    width: `${w}%`,
                  }} />
                ))}
              </div>
            </div>
          </div>
        ))}

        {/* ── Orbit Rings ── */}
        <div style={{
          position: "absolute",
          left: "50%", top: "50%",
          transform: "translate(-50%, -50%) translateZ(-20px)",
          width: 440, height: 440,
          borderRadius: "50%",
          border: "1px solid rgba(99,102,241,0.08)",
          animation: "orbitRingCW 40s linear infinite",
        }} className="hidden md:block" />
        <div style={{
          position: "absolute",
          left: "50%", top: "50%",
          transform: "translate(-50%, -50%) translateZ(-30px)",
          width: 640, height: 640,
          borderRadius: "50%",
          border: "1px dashed rgba(139,92,246,0.05)",
          animation: "orbitRingCCW 60s linear infinite",
        }} className="hidden lg:block" />

        {/* ── Node dots (knowledge graph) ── */}
        {NODE_POSITIONS.map((node, i) => (
          <div
            key={i}
            className="absolute hidden lg:block"
            style={{
              left: node.x, top: node.y,
              width: node.size, height: node.size,
              borderRadius: "50%",
              background: "rgba(99,102,241,0.6)",
              opacity: node.opacity,
              animation: `dotPulse ${node.pulse} ease-in-out infinite`,
              animationDelay: `${i * 0.3}s`,
              boxShadow: "0 0 8px rgba(99,102,241,0.5)",
            }}
          />
        ))}
      </div>

      {/* Inline keyframes for orbit rings */}
      <style>{`
        @keyframes orbitRingCW  { from { transform: translate(-50%,-50%) translateZ(-20px) rotate(0deg);   } to { transform: translate(-50%,-50%) translateZ(-20px) rotate(360deg);  } }
        @keyframes orbitRingCCW { from { transform: translate(-50%,-50%) translateZ(-30px) rotate(0deg);   } to { transform: translate(-50%,-50%) translateZ(-30px) rotate(-360deg); } }
      `}</style>
    </div>
  );
}
