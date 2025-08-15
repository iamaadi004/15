import React from 'react';
import { motion } from 'framer-motion';

const AnimatedBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Light grey base background */}
      <div className="absolute inset-0 bg-gray-50" />
      
      {/* Subtle geometric shapes */}
      <motion.div
        className="absolute top-32 left-20 w-80 h-80 rounded-full"
        style={{
          background: 'linear-gradient(135deg, #1f2937 0%, #374151 30%, #0f766e 60%, #dc2626 100%)',
        }}
        animate={{
          rotate: [0, 360],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Connecting lines */}
      <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.1 }}>
        <motion.path
          d="M 200 300 Q 400 200 600 400 T 1000 300"
          stroke="#6b7280"
          strokeWidth="2"
          fill="none"
          strokeDasharray="5,5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3, ease: "easeInOut" }}
        />
        <motion.path
          d="M 300 500 Q 500 300 800 600 T 1200 400"
          stroke="#6b7280"
          strokeWidth="1"
          fill="none"
          strokeDasharray="3,3"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 4, delay: 1, ease: "easeInOut" }}
        />
      </svg>
      
      {/* Subtle floating elements */}
      <motion.div
        className="absolute top-96 right-32 w-4 h-4 bg-gray-400 rounded-full opacity-30"
        animate={{
          y: [0, -20, 0],
          x: [0, 10, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="absolute bottom-48 left-1/3 w-6 h-6 bg-gray-300 rounded-full opacity-20"
        animate={{
          y: [0, 15, 0],
          x: [0, -15, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  );
};

export default AnimatedBackground;
