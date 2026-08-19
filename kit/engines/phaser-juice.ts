/**
 * NORTHLINE FORGE — Phaser camera adapter
 * Scrolls the main camera from FollowCamera + trauma shake.
 * Offset the CAMERA, never every sprite.
 *
 * Imports `phaser`. Copy into the game, not compiled in this repo.
 */

import type Phaser from "phaser";
import type { FollowCamera } from "../camera";
import type { Juice } from "../juice";

export function applyJuiceToPhaserCam(
  cam: Phaser.Cameras.Scene2D.Camera,
  follow: FollowCamera,
  juice: Juice,
  viewW: number,
  viewH: number,
): void {
  cam.setScroll(
    follow.x - viewW / 2 + juice.offsetX,
    follow.y - viewH / 2 + juice.offsetY,
  );
  cam.setRotation(juice.angle);
}

/** Flash the whole view white (hit). Duration in ms. */
export function phaserHitFlash(cam: Phaser.Cameras.Scene2D.Camera, ms = 40): void {
  cam.flash(ms, 255, 255, 255, false);
}

export function squashSprite(
  sprite: { setScale: (x: number, y: number) => void; setOrigin?: (x: number, y: number) => void },
  juice: Juice,
  base = 1,
): void {
  sprite.setScale(base * juice.scaleX, base * juice.scaleY);
}
