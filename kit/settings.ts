/**
 * NORTHLINE FORGE — settings blob
 * Persist with ForgeSave. Drive audio / juice / haptics / a11y from here.
 */

import { ForgeSave } from "./save";
import { audio } from "./audio";
import type { Juice } from "./juice";
import { setHapticsEnabled } from "./haptics";
import { bindA11y, type A11yState } from "./a11y";
import { setLocale } from "./i18n";

export type Settings = {
  master: number;
  music: number;
  sfx: number;
  shake: number;
  haptics: boolean;
  reducedMotion: boolean;
  locale: string;
};

export const defaultSettings = (): Settings => ({
  master: 1,
  music: 0.5,
  sfx: 0.85,
  shake: 1,
  haptics: true,
  reducedMotion: false,
  locale: "en",
});

export const settingsSave = new ForgeSave<Settings>("northline.settings", 1, defaultSettings);

export function applySettings(s: Settings, juice: Juice): () => void {
  audio.setGain("master", s.master);
  audio.setGain("music", s.music);
  audio.setGain("sfx", s.sfx);
  setHapticsEnabled(s.haptics);
  setLocale(s.locale);
  const a11y: A11yState = {
    reducedMotion: s.reducedMotion,
    shake: s.shake,
    flash: s.shake > 0.05,
    mute: s.master <= 0,
  };
  return bindA11y(juice, a11y);
}
