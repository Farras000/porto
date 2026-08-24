import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  AdaptiveDpr,
  PerformanceMonitor,
  Sparkles,
  Stars,
} from '@react-three/drei';
import {
  Bloom,
  ChromaticAberration,
  EffectComposer,
  Noise,
  Vignette,
} from '@react-three/postprocessing';
import { UNIVERSE } from '../config/universe';
import { initUniverseEvents, uni } from './universeStore';
import { Particles } from './Particles';
import { CameraRig } from './CameraRig';

function detectLiteDevice(): boolean {
  const coarse = window.matchMedia('(pointer: coarse)').matches;
  const small = Math.min(window.innerWidth, window.innerHeight) < 768;
  const fewCores = (navigator.hardwareConcurrency ?? 8) <= 4;
  return (coarse && small) || fewCores;
}

/** Scroll-velocity-modulated chromatic aberration */
function VelocityAberration() {
  const ref = useRef<{ offset: THREE.Vector2 } | null>(null);
  useFrame(() => {
    const effect = ref.current;
    if (!effect) return;
    const v = Math.min(0.004, Math.abs(uni.velocity) * 0.02);
    effect.offset.set(v, v * 0.6);
  });
  return (
    <ChromaticAberration
      ref={ref as never}
      offset={new THREE.Vector2(0.0008, 0.0005)}
      radialModulation={false}
      modulationOffset={0}
    />
  );
}

function Scene({ lite }: { lite: boolean }) {
  const count = lite ? UNIVERSE.particles.lite : UNIVERSE.particles.desktop;
  const size = lite ? UNIVERSE.size.lite : UNIVERSE.size.desktop;

  return (
    <>
      <color attach="background" args={[UNIVERSE.background]} />
      <fog attach="fog" args={[UNIVERSE.background, 20, 46]} />

      <Stars
        radius={70}
        depth={lite ? UNIVERSE.stars.lite.depth : UNIVERSE.stars.desktop.depth}
        count={lite ? UNIVERSE.stars.lite.count : UNIVERSE.stars.desktop.count}
        factor={4}
        saturation={0}
        fade
        speed={0.6}
      />
      <Sparkles
        count={lite ? UNIVERSE.sparkles.lite.count : UNIVERSE.sparkles.desktop.count}
        scale={[26, 18, 14]}
        size={2.2}
        speed={0.25}
        color="#c4f041"
        opacity={0.55}
      />

      <Particles count={count} size={size} lite={lite} />
      <CameraRig />

      <EffectComposer multisampling={0}>
        <Bloom
          mipmapBlur
          intensity={
            lite ? UNIVERSE.bloom.lite.intensity : UNIVERSE.bloom.desktop.intensity
          }
          luminanceThreshold={
            lite ? UNIVERSE.bloom.lite.threshold : UNIVERSE.bloom.desktop.threshold
          }
          luminanceSmoothing={0.22}
        />
        {!lite && <VelocityAberration />}
        {!lite && <Noise opacity={0.05} />}
        <Vignette eskil={false} offset={0.24} darkness={0.72} />
      </EffectComposer>
    </>
  );
}

export function Universe() {
  // Client-only SPA: detect device class once during first render.
  const [liteDetected] = useState(detectLiteDevice);
  const [degraded, setDegraded] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    initUniverseEvents();
  }, []);

  // Dev-only diagnostic so render-mode issues are instantly visible
  useEffect(() => {
    if (import.meta.env.DEV) {
      console.info('[universe] mode', { lite: liteDetected || degraded });
    }
  }, [liteDetected, degraded]);

  // Pause rendering ONLY while the tab is hidden — battery friendly.
  // Delta clamping + velocity reset make the resume seamless (~1 frame).
  useEffect(() => {
    const onVis = () => setPaused(document.hidden);
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, []);

  const lite = liteDetected || degraded;

  return (
    <div className="universe-canvas" aria-hidden="true">
      <Canvas
        frameloop={paused ? 'never' : 'always'}
        dpr={lite ? [1, 1.25] : [1, 2]}
        camera={{ fov: UNIVERSE.camera.fov, position: [0, 0, 16], near: 0.1, far: 120 }}
        gl={{
          antialias: false,
          alpha: false,
          powerPreference: 'high-performance',
          stencil: false,
        }}
      >
        <PerformanceMonitor onDecline={() => setDegraded(true)} />
        <AdaptiveDpr pixelated={false} />
        <Scene lite={lite} />
      </Canvas>
    </div>
  );
}
