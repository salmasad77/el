"use client";
import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export default function TiltWrapper({ children, className = "" }) {
  const ref = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  // Increased rotation for more obvious 3D effect
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateY,
        rotateX,
        transformStyle: "preserve-3d",
      }}
      className={`relative ${className}`}
    >
      <div 
        style={{ 
          transform: "translateZ(50px)", 
          transformStyle: "preserve-3d" 
        }}
        className="h-full"
      >
        {children}
      </div>
      
      {/* Subtle shine effect on tilt */}
      <motion.div
        style={{
          transform: "translateZ(51px)",
          opacity: useTransform(mouseXSpring, [-0.5, 0.5], [0, 0.2]),
        }}
        className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent pointer-events-none rounded-[2.5rem]"
      />
    </motion.div>
  );
}
