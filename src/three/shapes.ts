import type { ShapeName } from '../config/universe';

/** Deterministic PRNG so the universe looks identical across reloads */
export function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Seeded per-particle random floats (pure, reload-stable) */
export function seededRandoms(count: number): Float32Array {
  const rnd = mulberry32(7777);
  const out = new Float32Array(count);
  for (let i = 0; i < count; i++) out[i] = rnd();
  return out;
}

const TAU = Math.PI * 2;

/**
 * Generate `count` particle positions for a named shape.
 * Returns a flat Float32Array (xyz per particle), computed once on the CPU.
 */
export function generateShape(name: ShapeName, count: number): Float32Array {
  switch (name) {
    case 'sphere':
      return sphere(count);
    case 'torusKnot':
      return torusKnot(count);
    case 'galaxy':
      return galaxy(count);
    case 'helix':
      return helix(count);
    case 'nebula':
      return nebula(count);
  }
}

function sphere(count: number): Float32Array {
  const rnd = mulberry32(1337);
  const out = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    // Uniform direction on unit sphere
    const u = rnd() * 2 - 1;
    const phi = rnd() * TAU;
    const s = Math.sqrt(1 - u * u);
    let r = 4.8 * (0.9 + rnd() * 0.14);
    if (rnd() < 0.16) r *= rnd() * 0.85; // sparse inner sprinkle
    out[i * 3] = Math.cos(phi) * s * r;
    out[i * 3 + 1] = u * r;
    out[i * 3 + 2] = Math.sin(phi) * s * r;
  }
  return out;
}

function torusKnot(count: number): Float32Array {
  const rnd = mulberry32(4242);
  const out = new Float32Array(count * 3);
  const scale = 1.55;
  const p = 2;
  const q = 3;
  for (let i = 0; i < count; i++) {
    const t = rnd() * TAU;
    // Tube jitter
    const jr = 0.32 * Math.cbrt(rnd());
    const ja = rnd() * TAU;
    const jx = Math.cos(ja) * jr;
    const jy = Math.sin(ja) * jr;
    const r = 2 + Math.cos(q * t);
    out[i * 3] = (r * Math.cos(p * t)) * scale + jx;
    out[i * 3 + 1] = (r * Math.sin(p * t)) * scale + jy;
    out[i * 3 + 2] = Math.sin(q * t) * scale + jx * 0.5;
  }
  return out;
}

function galaxy(count: number): Float32Array {
  const rnd = mulberry32(9001);
  const out = new Float32Array(count * 3);
  const arms = 3;
  const radius = 6.2;
  const gauss = () => (rnd() + rnd() + rnd() - 1.5) / 1.5;
  for (let i = 0; i < count; i++) {
    if (rnd() < 0.18) {
      // Central bulge
      out[i * 3] = gauss() * 1.3;
      out[i * 3 + 1] = gauss() * 0.9;
      out[i * 3 + 2] = gauss() * 1.3;
      continue;
    }
    const arm = Math.floor(rnd() * arms);
    const rr = Math.pow(rnd(), 0.65) * radius;
    const angle = arm * ((TAU / arms)) + rr * 0.52 + gauss() * 0.22;
    const spread = (1 - rr / radius) * 0.5 + 0.12;
    out[i * 3] = Math.cos(angle) * rr + gauss() * spread;
    out[i * 3 + 1] = gauss() * spread * 0.75;
    out[i * 3 + 2] = Math.sin(angle) * rr + gauss() * spread;
  }
  return out;
}

function helix(count: number): Float32Array {
  const rnd = mulberry32(2718);
  const out = new Float32Array(count * 3);
  const turns = 3;
  const height = 11;
  const radius = 2.4;
  const steps = 14;
  const gauss = () => (rnd() + rnd() + rnd() - 1.5) / 1.5;
  for (let i = 0; i < count; i++) {
    const kind = rnd();
    const t = rnd() * turns * TAU;
    const y = (t / (turns * TAU) - 0.5) * height;
    if (kind < 0.44) {
      // Strand A
      out[i * 3] = Math.cos(t) * radius + gauss() * 0.14;
      out[i * 3 + 1] = y;
      out[i * 3 + 2] = Math.sin(t) * radius + gauss() * 0.14;
    } else if (kind < 0.88) {
      // Strand B (opposite phase)
      out[i * 3] = Math.cos(t + Math.PI) * radius + gauss() * 0.14;
      out[i * 3 + 1] = y;
      out[i * 3 + 2] = Math.sin(t + Math.PI) * radius + gauss() * 0.14;
    } else {
      // Rungs bridging both strands at quantized heights
      const step = Math.floor(rnd() * steps) / steps;
      const rt = step * turns * TAU;
      const mix = rnd();
      const ax = Math.cos(rt) * radius;
      const az = Math.sin(rt) * radius;
      out[i * 3] = ax * (1 - 2 * mix) ;
      out[i * 3 + 1] = (step - 0.5) * height + gauss() * 0.05;
      out[i * 3 + 2] = az * (1 - 2 * mix);
    }
  }
  return out;
}

function nebula(count: number): Float32Array {
  const rnd = mulberry32(5555);
  const out = new Float32Array(count * 3);
  const gauss = () => (rnd() + rnd() + rnd() - 1.5) / 1.5;
  for (let i = 0; i < count; i++) {
    if (rnd() < 0.68) {
      // Anisotropic drifting clouds
      const cluster = Math.floor(rnd() * 4);
      const cx = [-3.4, 3.2, -1.2, 2.6][cluster];
      const cy = [1.4, -1.8, 2.4, -2.2][cluster];
      const cz = [-1.5, 0.8, 1.8, -1.2][cluster];
      out[i * 3] = cx + gauss() * 2.1;
      out[i * 3 + 1] = cy + gauss() * 1.5;
      out[i * 3 + 2] = cz + gauss() * 1.8;
    } else {
      // Tilted halo ring
      const a = rnd() * TAU;
      const rr = 5.2 + gauss() * 0.45;
      const y = gauss() * 0.35;
      const z0 = Math.sin(a) * rr;
      // Tilt around X
      out[i * 3] = Math.cos(a) * rr;
      out[i * 3 + 1] = y * 0.86 - z0 * 0.5;
      out[i * 3 + 2] = y * 0.5 + z0 * 0.86;
    }
  }
  return out;
}
