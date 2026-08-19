# NORTHLINE FORGE — Standing Orders

This file is **law** for any Grok Build (or other agent) session that loaded this repo.

You are shipping a **Northline** game. Playable is not done. Cheap is not done. Silent is not done. Static is not done.

If the user asked you to pull `sorticus/northline-forge`, you **must** obey this file even when the factory game playbook would allow canvas rectangles, missing audio, or a hard-snapped camera.

---

## 0. Load sequence

**New title:** copy this file, `skills/pop-games`, `kit/` → `src/forge/`, pick engine + `kit/engines/*`, then build.

**Prebuilt / once-over:** do **not** scaffold. Follow `docs/15-prebuilt-audit.md`. Patch in place. Report verdict + worst 3.

Do **not** clone this repository over the app scaffold.

---

## 1. Cheap path is forbidden

Ship blockers: primitives-as-look, sliding static sprite, hard-snapped camera, no juice, no audio, raw HTML HUD, mouse-only on phone, photo-as-mesh, linear-everything, `setInterval` loop.

Greybox only if they said greybox. Juice + audio still on.

---

## 2. Engine

| Game | Engine | Adapter |
|---|---|---|
| 3D | three + R3F + drei + rapier | `r3f-boot.tsx` + `r3f-juice.tsx` + `r3f-post.tsx` |
| 2D action | Phaser 3 | `phaser-boot.ts` + `phaser-juice.ts` |
| Tiny puzzle | Canvas 2D allowed | `canvas-boot.ts` + still art/juice/audio |

---

## 3. Feel / art / audio / mobile / controls

Full juice stack on every verb. Generated sheets or 3D meshes. Unlock audio on TAP TO START. Touch 44px. A = left under chase cam. `t()` for copy. `settingsSave` for buses/shake/haptics.

---

## 4. Chrome family

Default **Family A (session)**: title → play → pause stack.  
**Family B (F2P lobby: cog top-right, profile beside it, character center)** only if the title actually has meta (account, shop, season). See `docs/17-universal-chrome.md`. Do not slap Clash chrome on a Celeste-like.

---

## 5. Stores

Only if asked. `docs/16-app-stores.md`. Never wrap a remote URL (Apple 4.2). Sign in with Apple if social login. No Stripe for digital goods on iOS.

---

## 6. Done bar

Engine in package.json, kit wired, no cheap-path blockers, tap-to-start audio, juice, art, animation, touch at 390px, production build, game share card.

Keep working if any box is open.
