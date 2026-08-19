/**
 * NORTHLINE FORGE — kit entry
 * Copy this folder to src/forge/ and import from here.
 *
 * Engine adapters (Phaser / R3F / canvas) live in ./engines and import those
 * libraries — import them from the game, not from this barrel.
 */

export { GameTime, expDamp, MAX_DT, DEFAULT_STEP } from "./time";
export { Juice, spawnFloater, updateFloaters } from "./juice";
export type { ImpactKind, ImpactOpts, Floater } from "./juice";
export { FollowCamera } from "./camera";
export type { Vec2 } from "./camera";
export { ForgeAudio, audio } from "./audio";
export type { Bus } from "./audio";
export { HowlerBus } from "./audio-howler";
export { ParticlePool } from "./particles";
export type { BurstOpts, Particle } from "./particles";
export { attachKeyboard, poll, setStick, setButton, stick, buttons } from "./input";
export type { InputState } from "./input";
export { mountTouch } from "./touch";
export { bindA11y, prefersReducedMotion } from "./a11y";
export type { A11yState } from "./a11y";
