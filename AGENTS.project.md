# NORTHLINE FORGE — Standing Orders

Law. Playable is not done. Cheap is not done.

## 0. Load

Copy this file, `skills/pop-games`, `kit/` → `src/forge/`.  
**New title:** `mountSessionChrome` + engine boot, then build.  
**Prebuilt:** do not scaffold. `registerAudit` + patch. `runAudit()`.

## 1. Cheap path forbidden

Primitives-as-look, static slide, hard camera, no juice, no audio, raw HTML HUD, mouse-only phone, photo-mesh, `setInterval`.

## 2. Engine

3D → R3F+Rapier + `r3f-boot` + `r3f-post`.  
2D action → Phaser + `phaser-boot`.  
Puzzle → `canvas-boot` + still juice/art/audio.

## 3. Chrome

Default **Family A:** `mountSessionChrome` (title, ⚙ top-right, pause, settings).  
**Family B:** `mountLobbyChrome` only if meta exists. Do not invent a profile on a session game.

## 4. Wire

`installDefaultSfx` on tap. `juice.impact` + `hapticImpact` + `audio.play` on verbs. `FollowCamera`. `mountTouch`. Strings via `t()`.

## 5. Stores

Only if asked. `printStorePrework()`. Never wrap a remote URL.
