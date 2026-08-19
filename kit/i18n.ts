/**
 * NORTHLINE FORGE — strings
 * No text in bitmaps. All copy goes through t().
 * Add locales as Record<string, string>. Missing key → the key (loud, fixable).
 */

export type Dict = Record<string, string>;

const catalogs = new Map<string, Dict>();
let locale = "en";
let fallback = "en";

export const en: Dict = {
  "title.tap": "TAP TO START",
  "pause.title": "PAUSED",
  "pause.resume": "Resume",
  "pause.retry": "Retry",
  "pause.settings": "Settings",
  "pause.quit": "Quit",
  "settings.title": "Settings",
  "settings.master": "Master",
  "settings.music": "Music",
  "settings.sfx": "SFX",
  "settings.shake": "Screen shake",
  "settings.haptics": "Haptics",
  "settings.reduced": "Reduced motion",
  "settings.language": "Language",
  "hud.score": "Score",
  "hud.pause": "Pause",
  "result.win": "COMPLETE",
  "result.lose": "DEFEATED",
  "result.retry": "Play again",
  "a11y.shakeOff": "Shake off",
};

register("en", en);

export function register(code: string, dict: Dict): void {
  catalogs.set(code, { ...(catalogs.get(code) ?? {}), ...dict });
}

export function setLocale(code: string): void {
  locale = code;
}

export function t(key: string, vars?: Record<string, string | number>): string {
  const dict = catalogs.get(locale) ?? catalogs.get(fallback) ?? {};
  const fb = catalogs.get(fallback) ?? {};
  let out = dict[key] ?? fb[key] ?? key;
  if (vars) {
    for (const [k, v] of Object.entries(vars)) {
      out = out.replaceAll(`{${k}}`, String(v));
    }
  }
  return out;
}
