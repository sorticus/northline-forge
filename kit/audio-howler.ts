/**
 * NORTHLINE FORGE — optional Howler adapter
 * Default remains kit/audio.ts (raw Web Audio).
 * Use this when you want Howler's unlock, sprites, and html5 music streaming.
 *
 *   npm i howler
 * Copy this file. Keep play() call sites identical to ForgeAudio where possible.
 */

export type HowlLike = {
  play: (sprite?: string) => number;
  rate: (v: number, id?: number) => void;
  volume: (v: number, id?: number) => void;
  stop: () => void;
};

type HowlerStatic = {
  volume: (v: number) => void;
  mute: (m: boolean) => void;
  ctx?: AudioContext;
};

export class HowlerBus {
  private Howl: new (o: Record<string, unknown>) => HowlLike;
  private Howler: HowlerStatic;
  private sfx = new Map<string, HowlLike>();
  private music: HowlLike | null = null;
  master = 1;
  sfxGain = 0.85;
  musicGain = 0.5;
  muted = false;

  constructor(Howl: new (o: Record<string, unknown>) => HowlLike, Howler: HowlerStatic) {
    this.Howl = Howl;
    this.Howler = Howler;
  }

  /** Call inside TAP TO START, synchronously. */
  unlock(): void {
    const ctx = this.Howler.ctx;
    if (ctx && ctx.state === "suspended") void ctx.resume();
  }

  loadSfx(name: string, src: string | string[], sprite?: Record<string, [number, number]>): void {
    this.sfx.set(
      name,
      new this.Howl({
        src: Array.isArray(src) ? src : [src],
        volume: this.sfxGain,
        sprite,
      }),
    );
  }

  loadMusic(src: string | string[]): void {
    this.music = new this.Howl({
      src: Array.isArray(src) ? src : [src],
      loop: true,
      html5: true,
      volume: this.musicGain,
    });
  }

  play(name: string, opts: { vary?: number; volume?: number; sprite?: string } = {}): void {
    const h = this.sfx.get(name);
    if (!h) return;
    const id = h.play(opts.sprite);
    const vary = opts.vary ?? 0.1;
    h.rate(1 + (Math.random() * 2 - 1) * vary, id);
    if (opts.volume !== undefined) h.volume(opts.volume, id);
  }

  playMusic(): void {
    this.music?.play();
  }

  stopMusic(): void {
    this.music?.stop();
  }

  setMuted(muted: boolean): void {
    this.muted = muted;
    this.Howler.mute(muted);
  }

  setMaster(slider01: number): void {
    this.master = Math.max(0, Math.min(1, slider01)) ** 2;
    this.Howler.volume(this.master);
  }
}
