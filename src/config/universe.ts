export type ShapeName = 'sphere' | 'torusKnot' | 'galaxy' | 'helix' | 'nebula';

export interface SectionTheme {
  id: string;
  shape: ShapeName;
  /** [colorA, colorB] pair crossfaded while this section is in view */
  palette: [string, string];
}

/**
 * Central tuning surface for the particle universe.
 * Adjust numbers/palettes here without touching shader code.
 */
export const UNIVERSE = {
  background: '#040109',

  particles: {
    desktop: 14000,
    lite: 6000,
  },

  /** Base sprite size (world units fed to gl_PointSize scaling) */
  size: {
    desktop: 0.098,
    lite: 0.16,
  },

  /** Pointer repulsion */
  pointerRadius: 3.4,
  pointerPush: 1.7,

  /** Idle wobble amplitude */
  wobbleAmp: 0.12,

  camera: {
    fov: 62,
    parallaxX: 1.1,
    parallaxY: 0.7,
    fovPunch: 9,
    /** velocity → FOV gain (scroll-speed warp feel) */
    fovGain: 150,
  },

  bloom: {
    desktop: { intensity: 1.15, threshold: 0.12 },
    lite: { intensity: 0.55, threshold: 0.2 },
  },

  stars: {
    desktop: { count: 3200, depth: 50 },
    lite: { count: 1400, depth: 30 },
  },

  sparkles: {
    desktop: { count: 90 },
    lite: { count: 36 },
  },

  /**
   * One entry per page section, in document order.
   * Shape morphs + palette crossfades happen between neighbours.
   */
  sections: [
    { id: 'hero', shape: 'sphere', palette: ['#c4f041', '#eaffa8'] },
    { id: 'about', shape: 'torusKnot', palette: ['#7dd3fc', '#a5f3fc'] },
    { id: 'skills', shape: 'galaxy', palette: ['#c4b5fd', '#f0abfc'] },
    { id: 'projects', shape: 'helix', palette: ['#c4f041', '#67e8f9'] },
    { id: 'contact', shape: 'nebula', palette: ['#eaffa8', '#c4b5fd'] },
  ] as SectionTheme[],
} as const;
