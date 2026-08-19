/**
 * NORTHLINE FORGE — juice
 * Trauma² screenshake, hitstop, flash, squash, floating pops.
 * Presentation only. Do not write gameplay state from here.
 */

export type ImpactKind = "light" | "heavy" | "land" | "pickup" | "death" | "win";

export type ImpactOpts = {
  trauma?: number;
  hitstop?: number;
  flash?: boolean;
  squash?: number;
  pop?: number;
};

const PRESETS: Record<ImpactKind, ImpactOpts> = {
  light: { trauma: 0.28, hitstop: 0.04, flash: true, squash: 0.12 },
  heavy: { trauma: 0.72, hitstop: 0.09, flash: true, squash: 0.22 },
  land: { trauma: 0.12, hitstop: 0, squash: 0.18 },
  pickup: { trauma: 0, pop: 1 },
  death: { trauma: 0.85, hitstop: 0.12, flash: true },
  win: { trauma: 0.15, pop: 1 },
};

function hashNoise(t: number, seed: number): number {
  const x = Math.sin(t * 47.13 + seed * 19.19) * 43758.5453;
  return (x - Math.floor(x)) * 2 - 1;
}

export class Juice {
  trauma = 0;
  traumaDecay = 1.6;
  maxOffset = 18;
  maxAngle = 0.06;

  hitstop = 0;
  flash = 0;
  squash = 1;
  squashVel = 0;

  offsetX = 0;
  offsetY = 0;
  angle = 0;

  reducedMotion = false;

  addTrauma(amount: number): void {
    if (this.reducedMotion) return;
    this.trauma = Math.min(1, this.trauma + amount);
  }

  freeze(seconds: number): void {
    if (this.reducedMotion) {
      this.hitstop = Math.min(this.hitstop, 0.03);
      return;
    }
    this.hitstop = Math.max(this.hitstop, seconds);
  }

  pulseFlash(): void {
    this.flash = 1;
  }

  /** Squash y-scale toward `amount` (1 = rest). Volume-preserving x = 1/y at render. */
  pulseSquash(amount: number): void {
    this.squashVel -= amount * 8;
  }

  impact(kind: ImpactKind | ImpactOpts): void {
    const o: ImpactOpts = typeof kind === "string" ? PRESETS[kind] : kind;
    if (o.trauma) this.addTrauma(o.trauma);
    if (o.hitstop) this.freeze(o.hitstop);
    if (o.flash) this.pulseFlash();
    if (o.squash) this.pulseSquash(o.squash);
  }

  /**
   * Call every frame with dt seconds.
   * If hitstop > 0, caller should skip *simulation* but keep rendering.
   * Returns whether simulation is frozen this frame.
   */
  update(dt: number): { frozen: boolean } {
    if (this.hitstop > 0) {
      this.hitstop = Math.max(0, this.hitstop - dt);
      this.flash = Math.max(0, this.flash - dt * 18);
      this.updateShake(dt);
      return { frozen: true };
    }

    this.trauma = Math.max(0, this.trauma - this.traumaDecay * dt);
    this.flash = Math.max(0, this.flash - dt * 14);
    this.squashVel += (1 - this.squash) * 48 * dt;
    this.squashVel *= Math.exp(-12 * dt);
    this.squash += this.squashVel * dt;
    this.updateShake(dt);
    return { frozen: false };
  }

  private updateShake(dt: number): void {
    if (this.reducedMotion || this.trauma <= 0) {
      this.offsetX = 0;
      this.offsetY = 0;
      this.angle = 0;
      return;
    }
    const shake = this.trauma * this.trauma;
    const t = performance.now() * 0.001;
    this.offsetX = this.maxOffset * shake * hashNoise(t, 1);
    this.offsetY = this.maxOffset * shake * hashNoise(t, 2);
    this.angle = this.maxAngle * shake * hashNoise(t, 3);
    void dt;
  }

  /** Apply to a camera container / 2D camera scroll. */
  applyToCamera(cam: { x: number; y: number; rotation?: number }): void {
    cam.x += this.offsetX;
    cam.y += this.offsetY;
    if (cam.rotation !== undefined) cam.rotation += this.angle;
  }

  get scaleX(): number {
    const y = Math.max(0.6, this.squash);
    return 1 / y;
  }

  get scaleY(): number {
    return Math.max(0.6, this.squash);
  }
}

export type Floater = {
  x: number;
  y: number;
  text: string;
  life: number;
  max: number;
  vy: number;
};

export function spawnFloater(list: Floater[], x: number, y: number, text: string): void {
  list.push({ x, y, text, life: 0, max: 0.7, vy: -48 });
}

export function updateFloaters(list: Floater[], dt: number): void {
  for (let i = list.length - 1; i >= 0; i--) {
    const f = list[i];
    f.life += dt;
    f.y += f.vy * dt;
    f.vy += 40 * dt;
    if (f.life >= f.max) list.splice(i, 1);
  }
}
