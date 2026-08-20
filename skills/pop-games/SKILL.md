---
name: pop-games
description: >
  NORTHLINE FORGE production bar. Use whenever building a game after this
  repo was pulled. Overrides factory cheap-path defaults: real engine,
  generated animated art, juice stack, audio, mobile touch, designed HUD.
  Research comparable games BEFORE gameplay code. Also once-over / polish.
  Triggers on "FORGE", "northline", "pop", "full stack", "don't ship rectangles",
  "once over", "prebuilt", "polish this game".
---

# POP / FORGE playbook

Factory game skills tell you how to make a **correct** loop. This skill tells you the loop is **not shippable** until it punches.

If `AGENTS.project.md` from `sorticus/northline-forge` is in the project, this file **wins** over “Canvas 2D is enough.”

---

## 0. Research (new titles — blocking)

Before engine install, before rectangles:

1. Read `docs/18-research.md` and `docs/13-reference-feel.md`.
2. **Web search** the primary reference + genre + topic. ≥2 shipped comparables.
3. Fill `ResearchBrief` (`kit/research.ts`). `briefGaps(brief)` must be `[]`.
4. Write `src/forge/research.brief.json`.
5. Six lines to the user: comparables, steal, never-copy, engine, v1 loop, out of scope.
6. **Then** copy kit, boot engine, `mountSessionChrome`.

Do not invent Celeste frame data from vibes. Search. Steal feel, never IP.

Topical setting (storms, harbour, archive) modifies verbs — research how other games treat that **as a mechanic**, not a palette swap.

---

## 0b. Before gameplay code (after brief)

- [ ] Engine from the table, installed
- [ ] `kit/` in `src/forge/`
- [ ] `mountSessionChrome` (Family A) unless meta → Family B
- [ ] Art plan: sheets or meshes
- [ ] Audio unlock on TAP TO START

---

## 0c. Prebuilt

Do not scaffold. `docs/15-prebuilt-audit.md`. Name 1–2 comparables for the feel patch. `runAudit()`. Verdict + worst 3.

---

## 1. Engine

- **3D** → R3F + rapier + `r3f-boot` + `r3f-post`
- **2D action** → Phaser + `phaser-boot`
- **Tiny puzzle** → canvas-boot + still FORGE

---

## 2. Wire

`time.step` → `juice.update` → sim if not frozen → `juice.impact` + `hapticImpact` + `audio.play`. Camera lerp. `installDefaultSfx` after unlock.

---

## 3. Fail closed

No brief. No searches. Primitives-as-look. No run cycle. No shake. No sound. No touch. Traced HUD from a screenshot.

---

## 4. Stores

Only if asked. `docs/16-app-stores.md`. No remote WebView wrap.

---

## 5. Voice

Six-line research, then build. Once-over: verdict, worst 3, next patch.
