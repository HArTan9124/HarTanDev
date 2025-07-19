import React, { useEffect, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const InteractiveCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Raw mouse position motion values
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springed values
  const springMainX = useSpring(x, { stiffness: 500, damping: 28, mass: 0.5 });
  const springMainY = useSpring(y, { stiffness: 500, damping: 28, mass: 0.5 });

  const springTrailX = useSpring(x, { stiffness: 200, damping: 20, mass: 0.8 });
  const springTrailY = useSpring(y, { stiffness: 200, damping: 20, mass: 0.8 });

  const springGlowX = useSpring(x, { stiffness: 100, damping: 25 });
  const springGlowY = useSpring(y, { stiffness: 100, damping: 25 });

  // Named hover handlers
  const handleMouseEnterElement = useCallback(() => setIsHovering(true), []);
  const handleMouseLeaveElement = useCallback(() => setIsHovering(false), []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setIsVisible(true);
    };

    const handleMouseLeaveWindow = () => setIsVisible(false);
    const handleMouseEnterWindow = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeaveWindow);
    window.addEventListener("mouseenter", handleMouseEnterWindow);

    // Attach hover listeners
    const hoverElements = document.querySelectorAll("button, a, [data-cursor-hover]");
    hoverElements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnterElement);
      el.addEventListener("mouseleave", handleMouseLeaveElement);
    });

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeaveWindow);
      window.removeEventListener("mouseenter", handleMouseEnterWindow);

      hoverElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnterElement);
        el.removeEventListener("mouseleave", handleMouseLeaveElement);
      });
    };
  }, [x, y, handleMouseEnterElement, handleMouseLeaveElement]);

  if (!isVisible) return null;

  return (
    <>
      {/* Main Cursor */}
      <motion.div
        className="fixed top-0 left-0 z-50 pointer-events-none mix-blend-difference"
        style={{
          x: springMainX,
          y: springMainY,
        }}
      >
        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
          <div
            className={`transition-all duration-200 rounded-full ${
              isHovering ? "w-2 h-2 bg-android-green" : "w-1 h-1 bg-android-green"
            }`}
          />
        </div>
      </motion.div>

      {/* Trailing Cursor */}
      <motion.div
        className="fixed top-0 left-0 z-40 pointer-events-none"
        style={{
          x: springTrailX,
          y: springTrailY,
        }}
      >
        <div
          className={`transition-all duration-300 rounded-full border-2 ${
            isHovering
              ? "w-12 h-12 border-android-green"
              : "w-8 h-8 border-android-green/50"
          }`}
        />
      </motion.div>

      {/* Glow Effect */}
      <motion.div
        className="fixed top-0 left-0 z-30 pointer-events-none"
        style={{
          x: springGlowX,
          y: springGlowY,
          opacity: isHovering ? 0.3 : 0.1,
        }}
      >
        <div className="w-10 h-10 bg-android-green rounded-full blur-md" />
      </motion.div>
    </>
  );
};

export default InteractiveCursor;
