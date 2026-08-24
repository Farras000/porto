import { useRef } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { UNIVERSE } from '../config/universe';
import { generateShape, seededRandoms } from './shapes';
import { uni } from './universeStore';

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uWobble;
  uniform vec4 uW0;      // blend weights for shapes 0..3
  uniform float uW4;     // blend weight for shape 4
  uniform vec3 uPointer; // world-space pointer
  uniform float uPointerStrength;
  uniform float uRadius;
  uniform float uPush;
  uniform float uSize;
  uniform float uScale;

  attribute vec3 aT1;
  attribute vec3 aT2;
  attribute vec3 aT3;
  attribute vec3 aT4;
  attribute float aRand;

  varying float vRand;
  varying float vGlow;

  void main() {
    vRand = aRand;

    // Blend all morph targets
    vec3 pos = position      * uW0.x
             + aT1           * uW0.y
             + aT2           * uW0.z
             + aT3           * uW0.w
             + aT4           * uW4;

    // Gentle idle wobble with per-particle phase
    float t = uTime + aRand * 6.2831;
    pos += uWobble * vec3(
      sin(t * 0.9 + pos.y * 0.6),
      sin(t * 1.3 + pos.z * 0.5),
      sin(t * 1.1 + pos.x * 0.55)
    );

    // Pointer repulsion inside a radius
    vec3 d = pos - uPointer;
    float dist = length(d);
    float influence = 1.0 - smoothstep(0.0, uRadius, dist);
    float push = influence * uPointerStrength;
    pos += (d / max(dist, 0.001)) * push * uPush;
    vGlow = push;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    // Depth-attenuated point size
    gl_PointSize = uSize * (0.55 + 0.9 * aRand) * uScale / max(0.5, -mvPosition.z);
  }
`;

const fragmentShader = /* glsl */ `
  uniform vec3 uColorA;
  uniform vec3 uColorB;

  varying float vRand;
  varying float vGlow;

  void main() {
    float d = length(gl_PointCoord - 0.5);
    float alpha = smoothstep(0.5, 0.04, d);
    if (alpha < 0.01) discard;

    vec3 col = mix(uColorA, uColorB, vRand);
    col += vGlow * 1.1;

    gl_FragColor = vec4(col, alpha * (0.5 + 0.5 * min(vGlow + 0.35, 1.0)));
  }
`;

interface ParticleAssets {
  count: number;
  size: number;
  lite: boolean;
}

interface AssetBundle {
  key: string;
  geometry: THREE.BufferGeometry;
  material: THREE.ShaderMaterial;
}

let assetCache: AssetBundle | null = null;

function buildGeometry(count: number): THREE.BufferGeometry {
  const geo = new THREE.BufferGeometry();
  const shapes = UNIVERSE.sections.map((s) => generateShape(s.shape, count));
  const rand = seededRandoms(count);

  geo.setAttribute('position', new THREE.BufferAttribute(shapes[0], 3));
  geo.setAttribute('aT1', new THREE.BufferAttribute(shapes[1], 3));
  geo.setAttribute('aT2', new THREE.BufferAttribute(shapes[2], 3));
  geo.setAttribute('aT3', new THREE.BufferAttribute(shapes[3], 3));
  geo.setAttribute('aT4', new THREE.BufferAttribute(shapes[4], 3));
  geo.setAttribute('aRand', new THREE.BufferAttribute(rand, 1));
  return geo;
}

function buildMaterial(p: ParticleAssets): THREE.ShaderMaterial {
  const colorA = new THREE.Color(UNIVERSE.sections[0].palette[0]);
  const colorB = new THREE.Color(UNIVERSE.sections[0].palette[1]);
  return new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: {
      uTime: { value: 0 },
      uWobble: { value: UNIVERSE.wobbleAmp },
      uW0: { value: new THREE.Vector4(1, 0, 0, 0) },
      uW4: { value: 0 },
      uPointer: { value: new THREE.Vector3(999, 999, 999) },
      uPointerStrength: { value: 0 },
      uRadius: { value: p.lite ? UNIVERSE.pointerRadius * 1.25 : UNIVERSE.pointerRadius },
      uPush: { value: UNIVERSE.pointerPush },
      uSize: { value: p.size },
      uScale: { value: 400 },
      uColorA: { value: colorA },
      uColorB: { value: colorB },
    },
  });
}

/** Module-level cache so geometry/material are built once and never re-created in render */
function getAssets(p: ParticleAssets): AssetBundle {
  const key = `${p.count}|${p.size}|${p.lite}`;
  if (assetCache && assetCache.key === key) return assetCache;
  if (assetCache) {
    assetCache.geometry.dispose();
    assetCache.material.dispose();
  }
  assetCache = { key, geometry: buildGeometry(p.count), material: buildMaterial(p) };
  return assetCache;
}

// Reused temp vectors — never allocate inside useFrame
const tmpDir = new THREE.Vector3();
const tmpPointerWorld = new THREE.Vector3();

const NUM_SHAPES = UNIVERSE.sections.length;
const shapeColorsA = UNIVERSE.sections.map((s) => new THREE.Color(s.palette[0]));
const shapeColorsB = UNIVERSE.sections.map((s) => new THREE.Color(s.palette[1]));

export function Particles(props: ParticleAssets) {
  const { geometry, material } = getAssets(props);
  const pointsRef = useRef<THREE.Points>(null!);
  const timeRef = useRef(0);
  const strengthRef = useRef(0);
  const camera = useThree((s) => s.camera);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05);

    timeRef.current += dt;

    // Smooth scroll progress & derive velocity (progress units / second)
    const prevProgress = uni.progress;
    uni.progress += (uni.target - uni.progress) * Math.min(1, dt * 5.5);
    const rawVel = dt > 0 ? (uni.progress - prevProgress) / dt : 0;
    uni.velocity += (rawVel - uni.velocity) * Math.min(1, dt * 8);

    const pts = pointsRef.current;
    if (!pts) return;
    const u = (pts.material as THREE.ShaderMaterial).uniforms;
    u.uTime.value = timeRef.current;
    u.uPointerStrength.value = strengthRef.current;

    // Morph weights across sections: continuous coordinate s in [0, NUM_SHAPES-1]
    const s = uni.progress * (NUM_SHAPES - 1);
    const i0 = Math.min(NUM_SHAPES - 2, Math.max(0, Math.floor(s)));
    let f = s - i0;
    f = f * f * (3 - 2 * f); // smoothstep dissolve

    const w = [0, 0, 0, 0, 0];
    w[i0] = 1 - f;
    w[i0 + 1] += f;
    (u.uW0.value as THREE.Vector4).set(w[0], w[1], w[2], w[3]);
    u.uW4.value = w[4];

    // Palette crossfade between neighbouring sections
    (u.uColorA.value as THREE.Color).copy(shapeColorsA[i0]).lerp(shapeColorsA[i0 + 1], f);
    (u.uColorB.value as THREE.Color).copy(shapeColorsB[i0]).lerp(shapeColorsB[i0 + 1], f);

    // Smoothed pointer NDC
    uni.pointerX += (uni.pointerTX - uni.pointerX) * Math.min(1, dt * 7);
    uni.pointerY += (uni.pointerTY - uni.pointerY) * Math.min(1, dt * 7);

    // Unproject pointer onto the z=0 plane in world space
    tmpDir.set(uni.pointerX, uni.pointerY, 0.5).unproject(camera);
    tmpDir.sub(camera.position).normalize();
    const tPlane = -camera.position.z / (tmpDir.z || -0.0001);
    tmpPointerWorld.copy(camera.position).addScaledVector(tmpDir, tPlane || 16);
    (u.uPointer.value as THREE.Vector3).copy(tmpPointerWorld);

    // Ease repulsion strength based on pointer recency
    const targetStrength =
      uni.pointerActive && performance.now() - uni.lastPointerMove < 2500 ? 1 : 0.15;
    strengthRef.current += (targetStrength - strengthRef.current) * Math.min(1, dt * 3);

    // Point-size scale from drawing-buffer height
    u.uScale.value = state.size.height * state.gl.getPixelRatio() * 0.5;
  });

  return (
    <points ref={pointsRef} frustumCulled={false}>
      <primitive object={geometry} attach="geometry" />
      <primitive object={material} attach="material" />
    </points>
  );
}
