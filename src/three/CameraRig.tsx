import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { UNIVERSE } from '../config/universe';
import { uni } from './universeStore';

// Module-level, hook-free assets: safe to mutate inside useFrame every frame.
const curve = new THREE.CatmullRomCurve3(
  [
    new THREE.Vector3(0, 0, 16),
    new THREE.Vector3(2.6, -1.2, 14.5),
    new THREE.Vector3(-2.8, 1.3, 12.8),
    new THREE.Vector3(2.2, 1.1, 14.2),
    new THREE.Vector3(0, 0, 17.5),
  ],
  false,
  'catmullrom',
  0.5
);

const tmpPos = new THREE.Vector3();
const tmpLook = new THREE.Vector3();
let smoothedFov: number = UNIVERSE.camera.fov;

/**
 * Camera flies along a CatmullRomCurve3 path as the user scrolls,
 * looks at a slowly drifting/orbiting target, gets subtle pointer parallax,
 * and a small FOV punch driven by scroll velocity ("warp" feel).
 */
export function CameraRig() {
  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05);
    const cam = state.camera;
    const p = uni.progress;
    const t = state.clock.elapsedTime;

    curve.getPointAt(Math.min(0.999, Math.max(0, p)), tmpPos);

    // Pointer parallax
    tmpPos.x += uni.pointerX * UNIVERSE.camera.parallaxX;
    tmpPos.y += uni.pointerY * UNIVERSE.camera.parallaxY;

    cam.position.lerp(tmpPos, Math.min(1, dt * 6));

    // Slowly drifting look target
    tmpLook.set(Math.sin(t * 0.07) * 1.6, Math.cos(t * 0.09) * 1.1, 0);
    cam.lookAt(tmpLook);

    // FOV punch from scroll velocity
    const punch = Math.min(
      UNIVERSE.camera.fovPunch,
      Math.abs(uni.velocity) * UNIVERSE.camera.fovGain
    );
    smoothedFov = THREE.MathUtils.lerp(smoothedFov, UNIVERSE.camera.fov - punch, Math.min(1, dt * 5));
    const persp = cam as THREE.PerspectiveCamera;
    if (Math.abs(persp.fov - smoothedFov) > 0.01) {
      persp.fov = smoothedFov;
      persp.updateProjectionMatrix();
    }
  });

  return null;
}
