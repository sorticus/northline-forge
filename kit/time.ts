/**
 * NORTHLINE FORGE — time
 * Cap delta, fixed-step accumulator. Never let a backgrounded tab teleport the sim.
 */

export const MAX_DT = 0.1;
export const DEFAULT_STEP = 1 / 60;

export class GameTime {
  readonly stepSeconds: number;
  private accum = 0;
  private _dt = 0;
  timeScale = 1;

  constructor(stepSeconds = DEFAULT_STEP) {
    this.stepSeconds = stepSeconds;
  }

  /** rawDt in seconds (RAF / useFrame). Phaser passes ms — divide by 1000 first. */
  step(rawDt: number): number {
    const dt = Math.min(Math.max(rawDt, 0), MAX_DT) * this.timeScale;
    this._dt = dt;
    this.accum += dt;
    return dt;
  }

  /** Drain fixed steps. Callback receives the fixed dt (seconds). */
  fixed(fn: (dt: number) => void, maxSubsteps = 8): void {
    let n = 0;
    while (this.accum >= this.stepSeconds && n < maxSubsteps) {
      fn(this.stepSeconds);
      this.accum -= this.stepSeconds;
      n++;
    }
    if (n === maxSubsteps) this.accum = 0;
  }

  get dt(): number {
    return this._dt;
  }

  get alpha(): number {
    return this.accum / this.stepSeconds;
  }
}

/** Frame-rate independent smoothing. Use this, never `x += (t-x)*0.1`. */
export function expDamp(current: number, target: number, k: number, dt: number): number {
  return current + (target - current) * (1 - Math.exp(-k * dt));
}
