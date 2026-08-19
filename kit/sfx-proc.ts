/**
 * NORTHLINE FORGE — procedural SFX bank
 * Fills the mouth before foley exists. Replace buffers later; keep play() names.
 */

import { audio } from "./audio";

function beep(name: string, freq: number, seconds: number, type: OscillatorType = "sine"): void {
  audio.unlock();
  const ctx = audio.ctx;
  if (!ctx) return;
  const sr = ctx.sampleRate;
  const n = Math.floor(sr * seconds);
  const buffer = ctx.createBuffer(1, n, sr);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < n; i++) {
    const t = i / sr;
    const env = Math.pow(1 - i / n, 1.8);
    const osc =
      type === "square"
        ? Math.sign(Math.sin(2 * Math.PI * freq * t))
        : Math.sin(2 * Math.PI * freq * t);
    const noise = (Math.random() * 2 - 1) * (type === "sawtooth" ? 0.4 : 0.05);
    data[i] = (osc * 0.7 + noise * 0.3) * env * 0.32;
  }
  audio.register(name, buffer);
}

/** Call once after unlock / on the title tap. */
export function installDefaultSfx(): void {
  beep("jump", 320, 0.07, "sine");
  beep("land", 90, 0.12, "sine");
  beep("hit", 180, 0.08, "square");
  beep("heavy", 70, 0.16, "sawtooth");
  beep("pickup", 620, 0.1, "sine");
  beep("win", 520, 0.28, "sine");
  beep("death", 55, 0.22, "sawtooth");
  beep("ui", 440, 0.04, "sine");
  beep("pause", 200, 0.06, "sine");
}

export const SFX = {
  jump: "jump",
  land: "land",
  hit: "hit",
  heavy: "heavy",
  pickup: "pickup",
  win: "win",
  death: "death",
  ui: "ui",
  pause: "pause",
} as const;
