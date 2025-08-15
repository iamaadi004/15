import React from 'react';
import { motion } from 'framer-motion';

const AnimatedSphere: React.FC = () => {
  return (
    <div className="absolute top-1/2 left-1/2 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] md:w-[800px] md:h-[800px]">
      <motion.div
        className="relative w-full h-full"
        animate={{
          x: ['-50%', '-52%', '-50%', '-48%', '-50%'],
          y: ['-50%', '-48%', '-52%', '-50%', '-50%'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: `radial-gradient(circle at 30% 30%, 
              rgba(255, 255, 255, 0.8) 0%,
              rgba(135, 180, 255, 0.6) 20%,
              rgba(70, 130, 255, 0.4) 40%,
              rgba(30, 80, 200, 0.3) 60%,
              rgba(10, 40, 150, 0.2) 80%,
              rgba(5, 20, 100, 0.1) 100%)`,
            boxShadow: '0 0 100px rgba(135, 180, 255, 0.3), inset 0 0 200px rgba(255, 255, 255, 0.1)',
          }}
          animate={{
            filter: ['hue-rotate(0deg)', 'hue-rotate(360deg)'],
          }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        <motion.div
          className="absolute top-[20%] left-[20%] w-[60%] h-[60%] rounded-full"
          style={{
            background: `radial-gradient(circle at 40% 40%, 
              rgba(255, 255, 255, 0.4) 0%,
              rgba(255, 255, 255, 0.2) 30%,
              transparent 70%)`,
          }}
          animate={{
            opacity: [0.3, 0.7, 0.3],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </motion.div>
    </div>
  );
};

export default AnimatedSphere;
