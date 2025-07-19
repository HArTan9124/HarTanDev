import React from "react";
import { motion } from "framer-motion";

interface HoverCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}

export const HoverCard: React.FC<HoverCardProps> = ({
  children,
  className = "",
  glowColor = "#3DDC84",
}) => {
  return (
    <motion.div
      className={`relative ${className}`}
      whileHover={{
        scale: 1.05,
        transition: { duration: 0.2 },
      }}
      whileTap={{ scale: 0.98 }}
    >
      <motion.div
        className="absolute inset-0 rounded-lg opacity-0"
        style={{
          background: `linear-gradient(45deg, ${glowColor}20, ${glowColor}10)`,
          boxShadow: `0 0 20px ${glowColor}40`,
        }}
        whileHover={{
          opacity: 1,
          transition: { duration: 0.3 },
        }}
      />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className = "",
  strength = 20,
}) => {
  const [position, setPosition] = React.useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;

    setPosition({
      x: deltaX * 0.1,
      y: deltaY * 0.1,
    });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      className={`relative ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        x: position.x,
        y: position.y,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}
    >
      {children}
    </motion.div>
  );
};

interface ParallaxTextProps {
  children: React.ReactNode;
  offset?: number;
  className?: string;
}

export const ParallaxText: React.FC<ParallaxTextProps> = ({
  children,
  offset = 50,
  className = "",
}) => {
  const [scrollY, setScrollY] = React.useState(0);

  React.useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.div
      className={className}
      style={{
        y: scrollY * offset * 0.01,
      }}
    >
      {children}
    </motion.div>
  );
};

interface GlitchTextProps {
  children: React.ReactNode;
  className?: string;
}

export const GlitchText: React.FC<GlitchTextProps> = ({
  children,
  className = "",
}) => {
  const [isGlitching, setIsGlitching] = React.useState(false);

  const handleGlitch = () => {
    setIsGlitching(true);
    setTimeout(() => setIsGlitching(false), 300);
  };

  return (
    <motion.div
      className={`relative cursor-pointer ${className}`}
      onClick={handleGlitch}
      whileHover={{ scale: 1.02 }}
    >
      <motion.div
        className="relative z-10"
        animate={
          isGlitching
            ? {
                x: [0, -2, 2, -1, 1, 0],
                y: [0, 1, -1, 0],
                skewX: [0, -1, 1, 0],
              }
            : {}
        }
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>

      {/* Glitch layers */}
      <motion.div
        className="absolute inset-0 text-red-500 opacity-0"
        style={{ clipPath: "inset(0 0 90% 0)" }}
        animate={
          isGlitching
            ? {
                opacity: [0, 0.7, 0],
                x: [-2, 2, -1],
              }
            : {}
        }
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>

      <motion.div
        className="absolute inset-0 text-blue-500 opacity-0"
        style={{ clipPath: "inset(90% 0 0 0)" }}
        animate={
          isGlitching
            ? {
                opacity: [0, 0.7, 0],
                x: [2, -2, 1],
              }
            : {}
        }
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};
