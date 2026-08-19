/**
 * NORTHLINE FORGE — camera
 * Exp lerp follow, lookahead, deadzone, punch. Never hard-snap.
 */

import { expDamp } from "./time";

export type Vec2 = { x: number; y: number };

export class FollowCamera {
  x = 0;
  y = 0;
  /** Follow stiffness. 6–10 = tight, 3–5 = cinematic. */
  k = 7;
  lookahead = 0.35;
  maxLookahead = 80;
  deadzoneX = 0;
  deadzoneY = 0;
  punchX = 0;
  punchY = 0;
  punchDecay = 10;
  bounds: { x: number; y: number; w: number; h: number } | null = null;
  pixelRound = false;

  follow(dt: number, target: Vec2, velocity: Vec2 = { x: 0, y: 0 }): void {
    let tx = target.x + Math.max(-this.maxLookahead, Math.min(this.maxLookahead, velocity.x * this.lookahead));
    let ty = target.y + Math.max(-this.maxLookahead, Math.min(this.maxLookahead, velocity.y * this.lookahead));

    if (this.deadzoneX > 0 || this.deadzoneY > 0) {
      const dx = tx - this.x;
      const dy = ty - this.y;
      if (Math.abs(dx) < this.deadzoneX) tx = this.x;
      if (Math.abs(dy) < this.deadzoneY) ty = this.y;
    }

    this.x = expDamp(this.x, tx, this.k, dt) + this.punchX;
    this.y = expDamp(this.y, ty, this.k, dt) + this.punchY;
    this.punchX = expDamp(this.punchX, 0, this.punchDecay, dt);
    this.punchY = expDamp(this.punchY, 0, this.punchDecay, dt);

    if (this.bounds) {
      const b = this.bounds;
      this.x = Math.max(b.x, Math.min(b.x + b.w, this.x));
      this.y = Math.max(b.y, Math.min(b.y + b.h, this.y));
    }

    if (this.pixelRound) {
      this.x = Math.round(this.x);
      this.y = Math.round(this.y);
    }
  }

  /** Instant kick (land / recoil). Direction should oppose the hit. */
  punch(dx: number, dy: number): void {
    this.punchX += dx;
    this.punchY += dy;
  }

  snap(target: Vec2): void {
    this.x = target.x;
    this.y = target.y;
    this.punchX = 0;
    this.punchY = 0;
  }
}
