/**
 * NORTHLINE FORGE — accessibility
 * Wire once at boot. Juice.reducedMotion follows the OS unless the player overrides.
 */

import type { Juice } from "./juice";

export type A11yState = {
  reducedMotion: boolean;
  shake: number;
  flash: boolean;
  mute: boolean;
};

export function prefersReducedMotion(): boolean {
  if (typeof matchMedia !== "function") return false;
  return matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function bindA11y(juice: Juice, state: A11yState): () => void {
  const apply = () => {
    juice.reducedMotion = state.reducedMotion || prefersReducedMotion() || state.shake <= 0;
    juice.maxOffset = 18 * state.shake;
    juice.maxAngle = 0.06 * state.shake;
  };
  apply();
  const mq = typeof matchMedia === "function" ? matchMedia("(prefers-reduced-motion: reduce)") : null;
  const on = () => {
    if (prefersReducedMotion()) state.reducedMotion = true;
    apply();
  };
  mq?.addEventListener("change", on);
  return () => mq?.removeEventListener("change", on);
}
