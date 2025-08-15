import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const AnimatedLine: React.FC = () => {
  const { scrollY } = useScroll();

  // Smoother animation: starts after a bit of scroll and over a larger range
  const height = useTransform(scrollY, [100, 600], ['0%', '100%']);

  return (
    // Taller line for better visibility in vertical layout
    <div className="w-0.5 h-20 bg-brand-primary/20 rounded-full overflow-hidden">
      <motion.div
        className="w-full bg-brand-primary"
        style={{ height }}
      />
    </div>
  );
};

export default AnimatedLine;
