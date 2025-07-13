'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useEffect } from 'react';

export default function ScrollAnimation({ children, className = '', delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: '-50px 0px -50px 0px' });

  // Use a simpler animation when not in view to reduce repaints
  return (
    <div ref={ref} className={className}>
      <motion.div
        initial={false}
        animate={isInView ? 'visible' : 'hidden'}
        variants={{
          hidden: { 
            opacity: 0, 
            y: 60,
            scale: 0.98,
            transition: {
              duration: 0.3,
              ease: [0.4, 0, 0.2, 1]
            }
          },
          visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
              type: 'spring',
              stiffness: 100,
              damping: 15,
              mass: 0.7,
              delay: delay * 0.06,
              bounce: 0.2
            }
          }
        }}
        className="will-change-transform"
      >
        {children}
      </motion.div>
    </div>
  );
}
