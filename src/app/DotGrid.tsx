"use client";

import { useEffect } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";

const DOT_SIZE = 1;
const DOT_GAP = 22;
const GLOW_RADIUS = 180;

export default function DotGrid() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const smoothX = useSpring(x, { stiffness: 120, damping: 20, mass: 0.2 });
  const smoothY = useSpring(y, { stiffness: 120, damping: 20, mass: 0.2 });

  useEffect(() => {
    function handleMove(event: MouseEvent) {
      x.set(event.clientX);
      y.set(event.clientY);
    }

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [x, y]);

  const mask = useMotionTemplate`radial-gradient(${GLOW_RADIUS}px at ${smoothX}px ${smoothY}px, rgba(0,0,0,0.95), rgba(0,0,0,0.45) 45%, transparent 70%)`;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `radial-gradient(rgba(0, 0, 0, 0.12) ${DOT_SIZE}px, transparent ${DOT_SIZE}px)`,
          backgroundSize: `${DOT_GAP}px ${DOT_GAP}px`,
          opacity: 0.35,
        }}
      />
      <motion.div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `radial-gradient(rgba(0, 0, 0, 0.25) ${DOT_SIZE}px, transparent ${DOT_SIZE}px)`,
          backgroundSize: `${DOT_GAP}px ${DOT_GAP}px`,
          opacity: 0.9,
          WebkitMaskImage: mask,
          maskImage: mask,
          filter: "drop-shadow(0 8px 12px rgba(0,0,0,0.12))",
        }}
      />
    </div>
  );
}
