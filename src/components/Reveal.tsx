import React from 'react';
import { motion, type Variants } from 'framer-motion';

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  duration?: number;
  once?: boolean;
  as?: 'div' | 'section' | 'span';
  /** When set, animates direct children sequentially (staggered reveal). */
  stagger?: number;
  /** Extra delay applied to each staggered child (in addition to stagger). */
  staggerDelay?: number;
}

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Reusable scroll-reveal wrapper.
 * Fades in + slides up when the element enters the viewport.
 * When `stagger` is provided, direct children reveal one-by-one.
 */
export const Reveal: React.FC<RevealProps> = ({
  children,
  className = '',
  delay = 0,
  y = 40,
  duration = 0.7,
  once = true,
  as = 'div',
  stagger,
  staggerDelay = 0,
}) => {
  const Tag = motion[as as keyof typeof motion] as typeof motion.div;

  // Staggered mode: parent orchestrates children via variants.
  if (stagger !== undefined) {
    const container: Variants = {
      hidden: {},
      show: {
        transition: {
          staggerChildren: stagger,
          delayChildren: delay,
        },
      },
    };

    const item: Variants = {
      hidden: { opacity: 0, y },
      show: {
        opacity: 1,
        y: 0,
        transition: {
          duration,
          ease: EASE,
          delay: staggerDelay,
        },
      },
    };

    return (
      <Tag
        className={className}
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once, margin: '-60px' }}
      >
        {React.Children.map(children, (child) =>
          React.isValidElement(child) ? (
            <motion.div variants={item} style={{ willChange: 'transform, opacity' }}>
              {child}
            </motion.div>
          ) : (
            child
          )
        )}
      </Tag>
    );
  }

  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-60px' }}
      transition={{
        duration,
        ease: EASE,
        delay,
      }}
    >
      {children}
    </Tag>
  );
};