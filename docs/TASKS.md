# FORGE work board

Northline internal. This is how we stand the kit up. Checkboxes are the source of truth.

Status key: `OPEN` · `DOING` · `DONE`

---

## P0 — Constitution *(first ship)*

The kit is useless without law. This is the new-hire packet.

| ID | Task | Status |
|---|---|---|
| P0.1 | Create public repo `sorticus/northline-forge` | DONE |
| P0.2 | Root README — studio voice, layout, non-negotiables | DONE |
| P0.3 | `AGENTS.project.md` — standing orders (cheap path forbidden) | DONE |
| P0.4 | `INVOKE.md` — Grok Build first-message protocol | DONE |
| P0.5 | `docs/00-onboarding.md` — new hire briefing | DONE |
| P0.6 | `docs/01-quality-bar.md` — definition of done | DONE |
| P0.7 | `skills/pop-games/SKILL.md` — agent playbook that **overrides** cheap defaults | DONE |
| P0.8 | This board | DONE |

---

## P1 — Feel runtime (`kit/`)

If it's not in code, it won't get copied. Doctrine without a module is a poster.

| ID | Task | Status |
|---|---|---|
| P1.1 | `kit/time.ts` — RAF dt, cap, fixed-step accumulator | DONE |
| P1.2 | `kit/juice.ts` — trauma² shake, hitstop, flash, pops, squash | DONE |
| P1.3 | `kit/camera.ts` — exp lerp, lookahead, deadzone, punch | DONE |
| P1.4 | `kit/particles.ts` — pooled emitters, engine-agnostic interface | DONE |
| P1.5 | `kit/README.md` — how to wire into Phaser / R3F / canvas | DONE |
| P1.6 | `docs/03-juice.md` — feel doctrine (Vlambeer stack, guardrails) | DONE |

---

## P2 — Audio runtime

Silent games are broken games. iOS unlock is not optional.

| ID | Task | Status |
|---|---|---|
| P2.1 | `kit/audio.ts` — unlock, buses, buffer playback, pitch variance | DONE |
| P2.2 | `docs/04-audio.md` — mixer, formats, mobile unlock, layering | DONE |
| P2.3 | Placeholder procedural ticks so a game has SFX before assets land | DONE |
| P2.4 | Howler adapter (optional path) | OPEN |

---

## P3 — Input & mobile

The SKU is a phone. Keyboard is a debug device.

| ID | Task | Status |
|---|---|---|
| P3.1 | `kit/input.ts` — unified keyboard + touch + (optional) gamepad | DONE |
| P3.2 | `kit/touch.ts` — virtual stick + action buttons, 44px, safe area | DONE |
| P3.3 | `docs/06-mobile.md` — orientation, letterbox, DPR, reduced motion | DONE |
| P3.4 | `docs/08-controls.md` — A=left law, chase-cam self-test | DONE |

---

## P4 — Engine adapters

FORGE is engine-agnostic. Adapters stop people inventing a third loop.

| ID | Task | Status |
|---|---|---|
| P4.1 | `docs/02-engine-selection.md` — decision table | DONE |
| P4.2 | `kit/engines/phaser-boot.ts` — Boot → Preload → Menu → Game + UI scene | OPEN |
| P4.3 | `kit/engines/r3f-boot.tsx` — Canvas, dpr cap, shadows, pointer-lock gate | OPEN |
| P4.4 | `kit/engines/canvas-boot.ts` — only for tiny puzzles; still wires juice+audio | OPEN |
| P4.5 | Phaser juice/camera adapters (trauma → camera container + our trauma) | OPEN |
| P4.6 | R3F juice/camera adapters (offset the camera rig, not the world) | OPEN |

---

## P5 — Art doctrine

This is how we stop shipping rectangles when Imagine is sitting right there.

| ID | Task | Status |
|---|---|---|
| P5.1 | `docs/05-art-pipeline.md` — sprites, video-to-sprite, maps, 3D rule | DONE |
| P5.2 | Hero sheet spec (idle/run/jump/attack, 2x2 / 2x3, body vs FX split) | DONE |
| P5.3 | Magenta `#FF00FF` contract + QC flip-test | DONE |
| P5.4 | Map modes (tile / scene / side-scroll parallax) — foundation-only bases | DONE |
| P5.5 | 3D: geometry/glTF only; images = textures/sky/UI | DONE |
| P5.6 | HUD/icon set doctrine | OPEN |

---

## P6 — Performance & cameras (doctrine)

| ID | Task | Status |
|---|---|---|
| P6.1 | `docs/07-camera.md` — lerp, lookahead, punch, pixel rounding | OPEN |
| P6.2 | `docs/09-performance.md` — pools, instancing, draw-call budget, dispose | OPEN |
| P6.3 | Accessibility: shake/flash sliders, `prefers-reduced-motion` | OPEN |

---

## P7 — Genre recipes

A recipe is a Northline title pitch + engine + art + juice notes. Not a GDD novel.

| ID | Task | Status |
|---|---|---|
| P7.1 | `recipes/2d-platformer.md` | DONE |
| P7.2 | `recipes/twin-stick.md` | OPEN |
| P7.3 | `recipes/kart-3d.md` | OPEN |
| P7.4 | `recipes/endless-runner.md` | OPEN |
| P7.5 | `recipes/fps.md` | OPEN |
| P7.6 | `recipes/tower-defense.md` | OPEN |
| P7.7 | `prompts/genre-cards.md` — short invoke add-ons | OPEN |

---

## P8 — QA / ship checklist

| ID | Task | Status |
|---|---|---|
| P8.1 | `docs/10-checklists.md` — feel, controls, mobile, audio, art | DONE |
| P8.2 | Controls self-test notes (A=left under chase cam) | DONE |
| P8.3 | “Silent / static / rectangles” fail-closed list | DONE |

---

## P9 — Prompts & packaging

| ID | Task | Status |
|---|---|---|
| P9.1 | `prompts/grok-build-first-message.txt` | DONE |
| P9.2 | LICENSE | DONE |
| P9.3 | `.gitignore` | DONE |
| P9.4 | Example: one reference feel clip list (games we are allowed to *feel like*) | OPEN |

---

## How a new hire uses this board

1. Do not start a feature not on this board unless you add the row first.
2. P0–P3 are the floor. Runtime + law exist. Use them.
3. When you finish a row, mark `DONE` in the same commit.
4. Next up: **P4 engine adapters** and remaining **P7 recipes**. Those are how Grok Build stops inventing a fourth loop.

---

*Last updated: founding drop — constitution + kit + core doctrine.*
