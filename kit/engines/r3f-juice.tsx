/**
 * NORTHLINE FORGE — R3F camera adapter
 * Apply follow + trauma shake to the THREE camera via a rig group.
 * Never translate the world root to shake.
 *
 * Copy into the game. Imports three / R3F types only at call sites.
 */

import type { FollowCamera } from "../camera";
import type { Juice } from "../juice";

type Cam = {
  position: { x: number; y: number; z: number };
  rotation: { z: number };
  lookAt: (x: number, y: number, z: number) => void;
};

type Rig = { position: { x: number; y: number; z: number }; rotation: { z: number } } | null;

/**
 * 2.5D / top-ish follow (XZ plane, +Y up).
 * For a true chase cam, set camera.position from the follow point yourself
 * then add juice.offset as a local rig translation.
 */
export function applyJuiceToCameraRig(
  camera: Cam,
  follow: FollowCamera,
  juice: Juice,
  rig: Rig,
  height = 12,
): void {
  const x = follow.x + juice.offsetX * 0.04;
  const z = follow.y + juice.offsetY * 0.04;
  camera.position.x = x;
  camera.position.y = height;
  camera.position.z = z + 8;
  camera.lookAt(follow.x, 0, follow.y);
  camera.rotation.z = juice.angle;
  if (rig) {
    rig.position.x = juice.offsetX * 0.02;
    rig.position.y = juice.offsetY * 0.02;
    rig.rotation.z = juice.angle;
  }
}

/** Chase: camera sits behind a yawed body. `forward` is the move-forward vector. */
export function chaseCam(
  camera: Cam,
  body: { x: number; y: number; z: number },
  forward: { x: number; y: number; z: number },
  juice: Juice,
  opts?: { height?: number; dist?: number },
): void {
  const height = opts?.height ?? 1.6;
  const dist = opts?.dist ?? 7;
  camera.position.x = body.x + forward.x * -dist + juice.offsetX * 0.03;
  camera.position.y = body.y + height + juice.offsetY * 0.03;
  camera.position.z = body.z + forward.z * -dist;
  camera.lookAt(body.x, body.y + 1.1, body.z);
  camera.rotation.z = juice.angle;
}
