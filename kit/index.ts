/**
 * NORTHLINE FORGE — kit entry
 * Copy this folder to src/forge/ and import from here.
 */

export { GameTime, expDamp, MAX_DT, DEFAULT_STEP } from "./time";
export { Juice, spawnFloater, updateFloaters } from "./juice";
export type { ImpactKind, ImpactOpts, Floater } from "./juice";
export { FollowCamera } from "./camera";
export type { Vec2 } from "./camera";
export { ForgeAudio, audio } from "./audio";
export type { Bus } from "./audio";
export { HowlerBus } from "./audio-howler";
export { installDefaultSfx, SFX } from "./sfx-proc";
export { ParticlePool } from "./particles";
export type { BurstOpts, Particle } from "./particles";
export { attachKeyboard, poll, setStick, setButton, stick, buttons } from "./input";
export type { InputState } from "./input";
export { mountTouch } from "./touch";
export { bindA11y, prefersReducedMotion } from "./a11y";
export type { A11yState } from "./a11y";
export { haptic, hapticImpact, setHapticsEnabled } from "./haptics";
export type { HapticKind } from "./haptics";
export { ForgeSave, autosave } from "./save";
export type { SaveEnvelope } from "./save";
export { t, register, setLocale, en } from "./i18n";
export type { Dict } from "./i18n";
export { Events, setAnalyticsSink, track } from "./analytics";
export type { EventName, AnalyticsSink } from "./analytics";
export { defaultSettings, settingsSave, applySettings } from "./settings";
export type { Settings } from "./settings";
export { mountSessionChrome, mountLobbyChrome, showResults, injectChromeStyles } from "./chrome";
export type { SessionChrome, SessionChromeHooks, LobbyHooks } from "./chrome";
export { registerAudit, runAudit, auditToMarkdown } from "./audit";
export type { AuditFlags, AuditReport, AuditRow, EngineKind } from "./audit";
export { STORE_PREWORK, markStoreItem, storeItems, printStorePrework, storeReady } from "./stores/prework";
export type { StoreItem } from "./stores/prework";
export { emptyBrief, briefGaps, assertBriefReady } from "./research";
export type { ResearchBrief, Comparable, ChromeFamily, EnginePick } from "./research";
