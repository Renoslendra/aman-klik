'use client';

import React from 'react';

interface ParticlesProps {
  particleCount?: number;
  particleSpread?: number;
  speed?: number;
  particleColors?: string[];
  moveParticlesOnHover?: boolean;
  particleHoverFactor?: number;
  alphaParticles?: boolean;
  particleBaseSize?: number;
  sizeRandomness?: number;
  cameraDistance?: number;
  disableRotation?: boolean;
  pixelRatio?: number;
  maxFps?: number;
  className?: string;
}

const Particles: React.FC<ParticlesProps> = ({ className }) => {
  return (
    <div 
      className={className} 
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0
      }}
    />
  );
};

export default Particles;
