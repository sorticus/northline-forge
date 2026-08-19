/**
 * NORTHLINE FORGE — audio
 * Unlock on first gesture (sync), master/music/sfx buses, buffer playback, pitch variance.
 * Do not use <audio> for SFX.
 */

export type Bus = "master" | "music" | "sfx";

type Voice = {
  name: string;
  buffer: AudioBuffer;
};

export class ForgeAudio {
  ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private music: GainNode | null = null;
  private sfx: GainNode | null = null;
  private voices = new Map<string, Voice>();
  unlocked = false;
  muted = false;

  masterGain = 1;
  musicGain = 0.5;
  sfxGain = 0.85;

  /** Call from pointerdown / keydown / the TAP TO START button — synchronously. */
  unlock = (): void => {
    if (!this.ctx) {
      const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AC({ latencyHint: "interactive" });
      this.master = this.ctx.createGain();
      this.music = this.ctx.createGain();
      this.sfx = this.ctx.createGain();
      this.music.connect(this.master);
      this.sfx.connect(this.master);
      this.master.connect(this.ctx.destination);
      this.applyGains();
    }
    if (this.ctx.state === "suspended") {
      void this.ctx.resume();
    }
    this.unlocked = true;
  };

  attachUnlock(el: Window | HTMLElement = window): void {
    const once = () => {
      this.unlock();
      el.removeEventListener("pointerdown", once);
      el.removeEventListener("keydown", once);
      el.removeEventListener("touchend", once);
    };
    el.addEventListener("pointerdown", once);
    el.addEventListener("keydown", once);
    el.addEventListener("touchend", once);
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible") this.unlock();
    });
  }

  private bus(name: Bus): GainNode | null {
    if (name === "master") return this.master;
    if (name === "music") return this.music;
    return this.sfx;
  }

  private applyGains(): void {
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    const mute = this.muted ? 0 : 1;
    this.master?.gain.setTargetAtTime(this.masterGain * mute, t, 0.02);
    this.music?.gain.setTargetAtTime(this.musicGain, t, 0.02);
    this.sfx?.gain.setTargetAtTime(this.sfxGain, t, 0.02);
  }

  setGain(bus: Bus, slider01: number): void {
    const curved = Math.max(0, Math.min(1, slider01)) ** 2;
    if (bus === "master") this.masterGain = curved;
    if (bus === "music") this.musicGain = curved;
    if (bus === "sfx") this.sfxGain = curved;
    this.applyGains();
  }

  setMuted(muted: boolean): void {
    this.muted = muted;
    this.applyGains();
  }

  async load(name: string, url: string): Promise<void> {
    this.unlock();
    if (!this.ctx) return;
    const res = await fetch(url);
    const raw = await res.arrayBuffer();
    const buffer = await this.ctx.decodeAudioData(raw.slice(0));
    this.voices.set(name, { name, buffer });
  }

  /** Decode a buffer you already have (e.g. generated tick). */
  register(name: string, buffer: AudioBuffer): void {
    this.voices.set(name, { name, buffer });
  }

  play(
    name: string,
    opts: { vary?: number; volume?: number; bus?: Bus; rate?: number } = {},
  ): void {
    if (!this.ctx || !this.sfx || !this.music) return;
    const v = this.voices.get(name);
    if (!v) return;
    const src = this.ctx.createBufferSource();
    src.buffer = v.buffer;
    const vary = opts.vary ?? 0.1;
    const rate = (opts.rate ?? 1) * (1 + (Math.random() * 2 - 1) * vary);
    src.playbackRate.value = rate;
    const g = this.ctx.createGain();
    g.gain.value = opts.volume ?? 1;
    src.connect(g);
    g.connect(opts.bus === "music" ? this.music : this.sfx);
    src.start();
    src.onended = () => {
      src.disconnect();
      g.disconnect();
    };
  }

  /** Tiny procedural tick so juice has a voice before real assets exist. */
  makeTick(name = "tick", freq = 440, seconds = 0.08): AudioBuffer | null {
    this.unlock();
    if (!this.ctx) return null;
    const sr = this.ctx.sampleRate;
    const n = Math.floor(sr * seconds);
    const buffer = this.ctx.createBuffer(1, n, sr);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < n; i++) {
      const t = i / sr;
      const env = Math.pow(1 - i / n, 1.6);
      data[i] = Math.sin(2 * Math.PI * freq * t) * env * 0.35;
    }
    this.register(name, buffer);
    return buffer;
  }
}

export const audio = new ForgeAudio();
