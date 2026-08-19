/**
 * NORTHLINE FORGE — particles
 * Tiny pooled 2D emitter. Phaser/R3F should wrap this or replace the draw.
 * Never allocate in the hit path — spawn() recycles.
 */

export type Particle = {
  alive: boolean;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  max: number;
  size: number;
  rot: number;
  vr: number;
  r: number;
  g: number;
  b: number;
  a: number;
};

export type BurstOpts = {
  n: number;
  speed: number;
  life: number;
  size: number;
  gravity?: number;
  color?: [number, number, number];
  spread?: number;
};

function rand(a: number, b: number): number {
  return a + Math.random() * (b - a);
}

export class ParticlePool {
  readonly items: Particle[];
  gravity = 420;

  constructor(capacity = 256) {
    this.items = Array.from({ length: capacity }, () => ({
      alive: false,
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      life: 0,
      max: 1,
      size: 2,
      rot: 0,
      vr: 0,
      r: 255,
      g: 255,
      b: 255,
      a: 1,
    }));
  }

  private grab(): Particle | null {
    for (let i = 0; i < this.items.length; i++) {
      if (!this.items[i].alive) return this.items[i];
    }
    return null;
  }

  burst(x: number, y: number, opts: BurstOpts): void {
    const [cr, cg, cb] = opts.color ?? [255, 220, 160];
    const spread = opts.spread ?? Math.PI * 2;
    for (let i = 0; i < opts.n; i++) {
      const p = this.grab();
      if (!p) return;
      const a = rand(-spread / 2, spread / 2) - Math.PI / 2;
      const s = opts.speed * rand(0.4, 1);
      p.alive = true;
      p.x = x;
      p.y = y;
      p.vx = Math.cos(a) * s;
      p.vy = Math.sin(a) * s;
      p.life = 0;
      p.max = opts.life * rand(0.7, 1.2);
      p.size = opts.size * rand(0.6, 1.3);
      p.rot = rand(0, Math.PI * 2);
      p.vr = rand(-8, 8);
      p.r = cr;
      p.g = cg;
      p.b = cb;
      p.a = 1;
    }
  }

  emitLand(x: number, y: number): void {
    this.burst(x, y, { n: 8, speed: 90, life: 0.35, size: 3, color: [210, 190, 150], spread: Math.PI });
  }

  emitHit(x: number, y: number): void {
    this.burst(x, y, { n: 14, speed: 220, life: 0.28, size: 2.5, color: [255, 240, 200] });
  }

  emitPickup(x: number, y: number): void {
    this.burst(x, y, { n: 10, speed: 70, life: 0.5, size: 2, color: [120, 255, 200] });
  }

  update(dt: number): void {
    const g = this.gravity;
    for (let i = 0; i < this.items.length; i++) {
      const p = this.items[i];
      if (!p.alive) continue;
      p.life += dt;
      if (p.life >= p.max) {
        p.alive = false;
        continue;
      }
      p.vy += g * dt;
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.rot += p.vr * dt;
      p.a = 1 - p.life / p.max;
    }
  }

  /** Canvas 2D draw. Phaser/R3F: iterate `items` where alive. */
  draw(ctx: CanvasRenderingContext2D): void {
    for (let i = 0; i < this.items.length; i++) {
      const p = this.items[i];
      if (!p.alive) continue;
      ctx.save();
      ctx.globalAlpha = p.a;
      ctx.fillStyle = `rgb(${p.r|0},${p.g|0},${p.b|0})`;
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
      ctx.restore();
    }
  }
}
