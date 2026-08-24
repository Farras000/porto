/**
 * Plain mutable module-level store for the 3D layer.
 * Never put these in React state — animation must cause zero re-renders.
 */
export const uni = {
  /** smoothed scroll progress 0..1 */
  progress: 0,
  /** raw target scroll progress 0..1 */
  target: 0,
  /** smoothed scroll velocity (progress units / second) */
  velocity: 0,
  /** pointer NDC (-1..1), smoothed */
  pointerX: 0,
  pointerY: 0,
  /** pointer NDC targets */
  pointerTX: 0,
  pointerTY: 0,
  /** whether a pointer/touch has been seen recently */
  pointerActive: false,
  lastPointerMove: 0,
};

let cleanup: (() => void) | null = null;

export function initUniverseEvents(): () => void {
  if (cleanup) return cleanup;

  const onScroll = () => {
    const doc = document.documentElement;
    const max = Math.max(1, doc.scrollHeight - window.innerHeight);
    uni.target = Math.min(1, Math.max(0, window.scrollY / max));
  };

  const setPointer = (x: number, y: number) => {
    uni.pointerTX = (x / window.innerWidth) * 2 - 1;
    uni.pointerTY = -((y / window.innerHeight) * 2 - 1);
    uni.pointerActive = true;
    uni.lastPointerMove = performance.now();
  };

  const onMouseMove = (e: MouseEvent) => setPointer(e.clientX, e.clientY);
  const onTouchMove = (e: TouchEvent) => {
    const t = e.touches[0];
    if (t) setPointer(t.clientX, t.clientY);
  };

  const onVisibility = () => {
    // Reset smoothing anchors when returning to the tab to avoid velocity spikes
    if (!document.hidden) {
      uni.velocity = 0;
      onScroll();
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  window.addEventListener('mousemove', onMouseMove, { passive: true });
  window.addEventListener('touchmove', onTouchMove, { passive: true });
  document.addEventListener('visibilitychange', onVisibility);

  onScroll();

  cleanup = () => {
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('resize', onScroll);
    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('touchmove', onTouchMove);
    document.removeEventListener('visibilitychange', onVisibility);
    cleanup = null;
  };
  return cleanup;
}
