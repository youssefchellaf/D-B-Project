import React, { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: 'gold' | 'purple' | 'ivory' | 'green';
  delay: number;
  duration: number;
  opacity: number;
}

export default function FloatingParticles() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Generate 32 premium floating particles including green ones
    const generated: Particle[] = Array.from({ length: 32 }).map((_, i) => {
      const colors: ('gold' | 'purple' | 'ivory' | 'green')[] = [
        'gold', 'purple', 'gold', 'ivory', 'green', 'purple', 'green'
      ];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      
      return {
        id: i,
        // Distribute nicely across the viewport
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 5 + 2, // 2px to 7px
        color: randomColor,
        delay: Math.random() * 8,
        duration: Math.random() * 15 + 15, // 15s to 30s
        opacity: Math.random() * 0.4 + 0.2, // 0.2 to 0.6 opacity
      };
    });
    setParticles(generated);
  }, []);

  return (
    <div 
      className="absolute inset-0 overflow-hidden pointer-events-none z-0 select-none"
      style={{
        maskImage: 'radial-gradient(ellipse 60% 75% at center, transparent 10%, rgba(0, 0, 0, 0.15) 45%, black 80%)',
        WebkitMaskImage: 'radial-gradient(ellipse 60% 75% at center, transparent 10%, rgba(0, 0, 0, 0.15) 45%, black 80%)',
      }}
    >
      {particles.map((particle) => {
        const colorClasses = {
          gold: 'bg-brand-gold shadow-[0_0_8px_rgba(212,175,55,0.7)]',
          purple: 'bg-brand-purple shadow-[0_0_8px_rgba(90,20,142,0.7)]',
          ivory: 'bg-white shadow-[0_0_6px_rgba(255,255,255,0.8)]',
          green: 'bg-brand-green shadow-[0_0_8px_rgba(46,79,50,0.7)]',
        };

        return (
          <div
            key={particle.id}
            className={`absolute rounded-full animate-float-slow transition-transform ${colorClasses[particle.color]}`}
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              opacity: particle.opacity,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.duration}s`,
            }}
          />
        );
      })}
    </div>
  );
}
