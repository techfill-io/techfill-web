import React from 'react';

interface ParticlesProps {
  particleCount?: number;
  particleColors?: string[];
  className?: string;
}

const Particles: React.FC<ParticlesProps> = ({
  particleCount = 150,
  particleColors = ['#ffffff', '#3b82f6'],
  className = ''
}) => {
  // Ensure we're on the client side before rendering
  if (typeof window === 'undefined') {
    return null;
  }

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      <div className="absolute inset-0">
        {[...Array(particleCount)].map((_, i) => {
          const color = particleColors[Math.floor(Math.random() * particleColors.length)];
          const size = Math.random() * 3 + 1;
          const duration = Math.random() * 20 + 10;
          const delay = Math.random() * 5;
          
          return (
            <div
              key={i}
              className="absolute rounded-full animate-pulse opacity-20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${size}px`,
                height: `${size}px`,
                backgroundColor: color,
                animationDelay: `${delay}s`,
                animationDuration: `${duration}s`,
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Particles;