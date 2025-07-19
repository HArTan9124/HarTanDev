import React from "react";
import { motion } from "framer-motion";

interface SpaceBackgroundProps {
  children: React.ReactNode;
  variant?: "stars" | "nebula" | "galaxy";
  className?: string;
}

const SpaceBackground: React.FC<SpaceBackgroundProps> = ({
  children,
  variant = "stars",
  className = "",
}) => {
  const generateStars = (count: number) => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      opacity: Math.random() * 0.8 + 0.2,
      animationDelay: Math.random() * 5,
    }));
  };

  const stars = generateStars(150);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Base Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background/90" />

      {/* Stars Layer */}
      {variant === "stars" && (
        <div className="absolute inset-0 opacity-30">
          {stars.map((star) => (
            <motion.div
              key={star.id}
              className="absolute bg-white rounded-full"
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                width: `${star.size}px`,
                height: `${star.size}px`,
                opacity: star.opacity,
              }}
              animate={{
                opacity: [star.opacity, star.opacity * 0.3, star.opacity],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: star.animationDelay,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      )}

      {/* Nebula Effect */}
      {variant === "nebula" && (
        <div className="absolute inset-0 opacity-20">
          <motion.div
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(circle at 20% 30%, rgba(61, 220, 132, 0.3) 0%, transparent 50%),
                radial-gradient(circle at 80% 70%, rgba(66, 133, 244, 0.2) 0%, transparent 50%),
                radial-gradient(circle at 60% 20%, rgba(255, 107, 107, 0.2) 0%, transparent 50%)
              `,
            }}
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 60,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </div>
      )}

      {/* Galaxy Spiral */}
      {variant === "galaxy" && (
        <div className="absolute inset-0 opacity-15">
          <motion.div
            className="absolute inset-0"
            style={{
              background: `
                conic-gradient(from 0deg at 50% 50%, 
                  transparent 0deg,
                  rgba(61, 220, 132, 0.3) 60deg,
                  transparent 120deg,
                  rgba(66, 133, 244, 0.2) 180deg,
                  transparent 240deg,
                  rgba(255, 107, 107, 0.2) 300deg,
                  transparent 360deg
                )
              `,
            }}
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 40,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </div>
      )}

      {/* Floating Particles */}
      <div className="absolute inset-0 opacity-10">
        {Array.from({ length: 20 }, (_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-android-green rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              x: [0, Math.random() * 50 - 25, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default SpaceBackground;
