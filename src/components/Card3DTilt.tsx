import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';

interface Card3DTiltProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  glare?: boolean;
  onClick?: () => void;
  id?: string;
}

export const Card3DTilt: React.FC<Card3DTiltProps> = ({
  children,
  className = '',
  maxTilt = 12,
  glare = true,
  onClick,
  id
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width;
    const yPct = mouseY / height;

    const tiltX = (0.5 - yPct) * maxTilt;
    const tiltY = (xPct - 0.5) * maxTilt;

    setTilt({ x: tiltX, y: tiltY });
    setGlarePos({
      x: xPct * 100,
      y: yPct * 100,
      opacity: 0.35
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setGlarePos(prev => ({ ...prev, opacity: 0 }));
  };

  return (
    <motion.div
      id={id}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        transformStyle: 'preserve-3d',
        perspective: 1000
      }}
      animate={{
        rotateX: tilt.x,
        rotateY: tilt.y,
        scale: glarePos.opacity > 0 ? 1.02 : 1
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 20
      }}
      className={`relative cursor-pointer select-none transition-shadow ${className}`}
    >
      <div style={{ transform: 'translateZ(18px)' }} className="w-full h-full relative z-10">
        {children}
      </div>

      {glare && (
        <div
          className="absolute inset-0 pointer-events-none rounded-3xl transition-opacity duration-300 z-20 overflow-hidden"
          style={{
            opacity: glarePos.opacity,
            background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0) 65%)`
          }}
        />
      )}
    </motion.div>
  );
};
