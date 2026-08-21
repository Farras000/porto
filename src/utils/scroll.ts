import type Lenis from 'lenis';

let globalLenis: Lenis | null = null;

export const registerLenis = (lenis: Lenis | null) => {
  globalLenis = lenis;
};

export const getLenis = () => globalLenis;

export const smoothScrollTo = (
  target: string | number | HTMLElement,
  options?: { duration?: number; offset?: number }
) => {
  if (globalLenis) {
    globalLenis.scrollTo(target, {
      duration: options?.duration ?? 1.8, // Slow, luxurious smooth scroll
      offset: options?.offset ?? 0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
  } else {
    if (typeof target === 'number') {
      window.scrollTo({ top: target, behavior: 'smooth' });
    } else {
      const el = typeof target === 'string' ? document.querySelector(target) : target;
      if (el) {
        (el as HTMLElement).scrollIntoView({ behavior: 'smooth' });
      }
    }
  }
};
