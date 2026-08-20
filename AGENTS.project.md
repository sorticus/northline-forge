# NORTHLINE FORGE — Standing Orders

Law. Playable is not done. Cheap is not done.

## 0. Load

Copy this file, `skills/pop-games`, `kit/` → `src/forge/`.

**New title — blocking order:**
1. Copy kit.
2. **Research.** `docs/18-research.md`. Web-search ≥2 comparable shipped games. Fill `ResearchBrief`. `briefGaps()` must be empty. Write `src/forge/research.brief.json`.
3. Tell the user six lines (comparables, steal, never, engine, v1 loop, out of scope).
4. `mountSessionChrome` + engine boot, then build.

Do not write gameplay before the brief. Memory is not research. Guessing “how Celeste works” is a ship blocker.

**Prebuilt:** do not scaffold. `registerAudit` + patch. `runAudit()`. Light research: name 1–2 feel comparables for the patch.

## 1. Cheap path forbidden

Primitives-as-look, static slide, hard camera, no juice, no audio, raw HTML HUD, mouse-only phone, photo-mesh, `setInterval`.

## 2. Engine

3D → R3F+Rapier + `r3f-boot` + `r3f-post`.  
2D action → Phaser + `phaser-boot`.  
Puzzle → `canvas-boot` + still juice/art/audio.

## 3. Chrome

Default **Family A:** `mountSessionChrome`.  
**Family B:** `mountLobbyChrome` only if meta exists.

## 4. Wire

`installDefaultSfx` on tap. `juice.impact` + `hapticImpact` + `audio.play` on verbs. `FollowCamera`. `mountTouch`. Strings via `t()`.

## 5. IP

Steal feel. Never characters, logos, music, layouts, traced HUD.

## 6. Stores

Only if asked. `printStorePrework()`. Never wrap a remote URL.
