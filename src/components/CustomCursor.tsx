import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [cursorText, setCursorText] = useState('');
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // Spring physics for smooth trailing effect
  const springConfig = { damping: 28, stiffness: 300, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Only enable on fine pointer devices (desktops)
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!isFinePointer) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Look for closest interactive element or data-cursor attribute
      const interactiveEl = target.closest('a, button, [role="button"], input, textarea, select, [data-cursor]');
      
      if (interactiveEl) {
        setIsHovering(true);
        const customText = interactiveEl.getAttribute('data-cursor');
        if (customText) {
          setCursorText(customText);
        } else {
          setCursorText('');
        }
      } else {
        setIsHovering(false);
        setCursorText('');
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    
    // Auto-hide native cursor
    document.body.setAttribute('data-cursor-hide', 'true');

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      document.body.removeAttribute('data-cursor-hide');
    };
  }, [cursorX, cursorY]);

  return (
    <>
      {/* Fast small dot */}
      <motion.div
        className="fixed top-0 left-0 w-2.5 h-2.5 bg-white rounded-full pointer-events-none z-[100] mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
      
      {/* Smooth trailing halo / text badge */}
      <motion.div
        className="fixed top-0 left-0 flex items-center justify-center rounded-full pointer-events-none z-[99] border-2 border-white/30 backdrop-blur-sm shadow-[0_0_15px_rgba(255,255,255,0.1)]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
        initial={{ width: 40, height: 40, opacity: 0 }}
        animate={{
          width: isHovering ? (cursorText ? 'auto' : 64) : 40,
          height: isHovering ? (cursorText ? 28 : 64) : 40,
          opacity: 1,
          padding: cursorText ? '0 12px' : 0,
          borderRadius: cursorText ? '16px' : '9999px',
          backgroundColor: isHovering ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
          borderColor: isHovering ? 'rgba(255, 255, 255, 0.5)' : 'rgba(255, 255, 255, 0.3)'
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 28 }}
      >
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: cursorText ? 1 : 0,
            scale: cursorText ? 1 : 0.8
          }}
          className="font-mono text-[10px] font-bold tracking-widest text-white whitespace-nowrap"
        >
          {cursorText}
        </motion.span>
      </motion.div>
    </>
  );
};
