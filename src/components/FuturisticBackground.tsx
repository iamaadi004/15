import React from 'react';
import { motion } from 'framer-motion';

const FuturisticBackground: React.FC = () => {
  // Create floating particles
  const particles = Array.from({ length: 15 }, (_, i) => i);

  return (
    <div className="fixed inset-0 overflow-hidden -z-10">
      {/* Main gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-bg-start via-brand-bg-mid to-brand-bg-end" />
      
      {/* Animated sphere */}
      <motion.div
        className="absolute top-1/2 left-1/2 w-[400px] h-[400px] md:w-[600px] md:h-[600px]"
        animate={{
          x: ['-50%', '-52%', '-48%', '-50%'],
          y: ['-50%', '-48%', '-52%', '-50%'],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <motion.div
          className="w-full h-full rounded-full opacity-30"
          style={{
            background: `radial-gradient(circle at 30% 30%, 
              rgba(255, 255, 255, 0.6) 0%,
              rgba(135, 180, 255, 0.4) 25%,
              rgba(70, 130, 255, 0.3) 50%,
              rgba(30, 80, 200, 0.2) 75%,
              rgba(10, 40, 150, 0.1) 100%)`,
            boxShadow: '0 0 80px rgba(135, 180, 255, 0.2)',
          }}
          animate={{
            filter: ['hue-rotate(0deg)', 'hue-rotate(360deg)'],
            scale: [1, 1.05, 1],
          }}
          transition={{
            filter: { duration: 30, repeat: Infinity, ease: 'linear' },
            scale: { duration: 20, repeat: Infinity, ease: 'easeInOut' },
          }}
        />
        
        {/* Inner highlight */}
        <motion.div
          className="absolute top-[25%] left-[25%] w-[50%] h-[50%] rounded-full"
          style={{
            background: `radial-gradient(circle at 40% 40%, 
              rgba(255, 255, 255, 0.3) 0%,
              rgba(255, 255, 255, 0.1) 40%,
              transparent 70%)`,
          }}
          animate={{
            opacity: [0.2, 0.5, 0.2],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </motion.div>

      {/* Floating particles */}
      {particles.map((i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white/40 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            y: ['100vh', '-10vh'],
            x: [0, Math.random() * 100 - 50],
            opacity: [0, 1, 1, 0],
            scale: [0, 1, 1, 0],
          }}
          transition={{
            duration: Math.random() * 20 + 15,
            repeat: Infinity,
            delay: Math.random() * 10,
            ease: 'linear',
          }}
        />
      ))}

      {/* Additional geometric shapes */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-32 h-32 border border-white/10 rounded-full"
        animate={{
          rotate: [0, 360],
          scale: [1, 1.1, 1],
        }}
        transition={{
          rotate: { duration: 50, repeat: Infinity, ease: 'linear' },
          scale: { duration: 15, repeat: Infinity, ease: 'easeInOut' },
        }}
      />

      <motion.div
        className="absolute bottom-1/4 left-1/4 w-24 h-24 border border-brand-accent/20 rotate-45"
        animate={{
          rotate: [45, 405],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  );
};

export default FuturisticBackground;
