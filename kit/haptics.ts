/**
 * NORTHLINE FORGE — haptics
 * Phone vibration. No-ops on desktop. Never block the sim on this.
 */

export type HapticKind = "light" | "medium" | "heavy" | "success" | "warning";

const PATTERNS: Record<HapticKind, number | number[]> = {
  light: 10,
  medium: 20,
  heavy: [10, 30, 40],
  success: [8, 40, 12],
  warning: [30, 40, 30],
};

let enabled = true;

export function setHapticsEnabled(on: boolean): void {
  enabled = on;
}

export function haptic(kind: HapticKind = "light"): void {
  if (!enabled) return;
  const nav = typeof navigator !== "undefined" ? navigator : null;
  if (!nav || typeof nav.vibrate !== "function") return;
  try {
    nav.vibrate(PATTERNS[kind]);
  } catch {
    /* ignore */
  }
}

/** Pair with juice.impact — light hits buzz, heavies thud. */
export function hapticImpact(kind: "light" | "heavy" | "land" | "pickup" | "death" | "win"): void {
  if (kind === "heavy" || kind === "death") haptic("heavy");
  else if (kind === "win" || kind === "pickup") haptic("success");
  else haptic("light");
}
