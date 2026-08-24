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
  const duration = options?.duration ?? 2.2; // Slow, luxurious glide (2.2 seconds)

  if (globalLenis) {
    globalLenis.scrollTo(target, {
      duration,
      offset: options?.offset ?? 0,
      easing: (t) => 1 - Math.pow(1 - t, 3), // Smooth cubic deceleration
      immediate: false,
      lock: false,
    });
    return;
  }

  // High-precision rAF smooth glide fallback
  const startY = window.scrollY;
  let targetY = 0;
  if (typeof target === 'number') {
    targetY = target;
  } else {
    const el = typeof target === 'string' ? (document.querySelector(target) as HTMLElement) : target;
    if (el) {
      targetY = el.getBoundingClientRect().top + window.scrollY + (options?.offset ?? 0);
    }
  }

  const distance = targetY - startY;
  const startTime = performance.now();
  const durationMs = duration * 1000;

  function step(currentTime: number) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / durationMs, 1);
    const ease = 1 - Math.pow(1 - progress, 3);

    window.scrollTo(0, startY + distance * ease);

    if (progress < 1) {
      requestAnimationFrame(step);
    }
  }

  requestAnimationFrame(step);
};

