---
name: pop-games
description: >
  NORTHLINE FORGE production bar. Use whenever building a game after this
  repo was pulled. Overrides factory cheap-path defaults: real engine,
  generated animated art, juice stack, audio, mobile touch, designed HUD.
  Also use for once-over / polish / prebuilt audits. Triggers on "FORGE",
  "northline", "pop", "full stack", "don't ship rectangles", "once over",
  "prebuilt", "polish this game".
---

# POP / FORGE playbook

Factory game skills tell you how to make a **correct** loop. This skill tells you the loop is **not shippable** until it punches.

If `AGENTS.project.md` from `sorticus/northline-forge` is in the project, this file and that file **win** over “Canvas 2D is enough.”

---

## 0. Before any gameplay code (new titles)

- [ ] Engine chosen from the table and installed
- [ ] `kit/` copied to `src/forge/` (engines too)
- [ ] Title / tap-to-start overlay designed
- [ ] Art plan: hero sheets OR 3D meshes
- [ ] Audio unlocked on that first tap
- [ ] Chrome family picked: **A session** (default) vs **B F2P lobby** — see docs/17-universal-chrome.md

Do not “get the rectangle moving” as v1.

---

## 0b. Prebuilt / once-over (existing titles)

If a game **already exists**, do **not** scaffold a new one.

1. Read `docs/15-prebuilt-audit.md`
2. Smell-test 60s → PASS / PATCH / REBUILD
3. Patch in the order in that doc (kit → audio unlock → camera → juice → touch → chrome → art)
4. Report: verdict, worst 3, next patch

Rebuild only on wrong engine / photo viewmodel / no sim.

---

## 1. Engine table

- **3D** → three + R3F + drei + rapier + `kit/engines/r3f-boot.tsx` (+ `r3f-post.tsx` for bloom)
- **2D action** → Phaser 3 + `kit/engines/phaser-boot.ts`
- **Tiny puzzle** → Canvas 2D + `kit/engines/canvas-boot.ts`

Loop: RAF / `useFrame` / Phaser `update`. Capped dt. Never `setInterval`.

---

## 2. Wire the kit

```ts
import { GameTime, Juice, FollowCamera, audio, ParticlePool, attachKeyboard, poll, installDefaultSfx, hapticImpact } from "@/forge";

const dt = time.step(rawDt);
const frozen = juice.update(dt).frozen;
if (!frozen) { /* sim */ }
juice.impact("heavy");
hapticImpact("heavy");
audio.play("hit", { vary: 0.1 });
```

`installDefaultSfx()` after unlock. Offset the **camera** for shake. Hitstop skips sim, not render.

---

## 3–8. Art / juice / audio / mobile / controls / HUD

Unchanged: generated sheets, juice stack, sync unlock, 44px touch, A=left, designed overlay. Strings via `t()`. Settings via `settingsSave` + pause (Family A) not a Clash lobby unless the title is live-ops.

HUD: `docs/17-universal-chrome.md`. Default **Family A**. Do not invent a profile button on a 3-level platformer.

---

## 9. Fail closed

Primitives as look, no run cycle, no shake, no sound, no touch — not done.

---

## 10. Stores

Only if the user asked for App Store / Play. Read `docs/16-app-stores.md`.  
Do not wrap a remote URL. Sign in with Apple if social login. No Stripe for digital on iOS.

---

## 11. Voice

Product terms. For once-overs: verdict + worst 3 + next patch. No essay.
