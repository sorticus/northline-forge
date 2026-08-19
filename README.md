# NORTHLINE FORGE

**Internal production kit. Not a game. Not a prototype folder. The law.**

You are not here to make a canvas demo. You are here to ship something that punches.

If a player can tell this was made in a weekend HTML jam, you failed the build. Playable is the floor. **Feel** is the product.

```
Studio:     NORTHLINE
Kit:        FORGE
Repo:       github.com/sorticus/northline-forge
Rule:       If it doesn't punch, it doesn't ship.
```

---

## What this is

A portable quality pack you load **before** you build.

- Standing orders that **forbid** the cheap path (rectangles, silence, hard-snapped cameras, static sprites).
- A juice / audio / camera / time **runtime kit** you copy into the game.
- Engine selection (Phaser vs three.js vs canvas).
- Art doctrine (generated sprite sheets, maps, no photo-as-mesh).
- Mobile AAA constraints (touch, safe area, perf budgets).
- Genre recipes and a ship checklist.

This kit overlays a Grok Build app. **Do not clone this repo over the app scaffold.** Copy the law in, then build.

---

## New hire — read this first

1. [docs/00-onboarding.md](docs/00-onboarding.md) — how we work
2. [docs/01-quality-bar.md](docs/01-quality-bar.md) — what “done” means here
3. [AGENTS.project.md](AGENTS.project.md) — standing orders (non-negotiable)
4. [docs/TASKS.md](docs/TASKS.md) — the work board
5. [INVOKE.md](INVOKE.md) — the sentence you paste into Grok Build

Then steal code from [`kit/`](kit/).

---

## Grok Build — invoke (copy this)

Every new game, first message:

```text
Pull github.com/sorticus/northline-forge
Copy AGENTS.project.md to the project root.
Copy skills/pop-games into the project skill path.
Copy kit/*.ts into src/forge/ and wire them.
Follow FORGE standing orders. Cheap path is a ship blocker.
Then build: [GENRE] that feels like [REFERENCE GAME]. Setting: [ONE LINE].
```

Full protocol: [INVOKE.md](INVOKE.md)

---

## Layout

```
AGENTS.project.md          ← LAW. Load this first.
INVOKE.md                  ← paste into Grok Build
skills/pop-games/          ← agent playbook (overrides cheap defaults)
kit/                       ← runtime: juice, audio, camera, time, input
docs/                      ← doctrine (feel, engines, art, mobile, QA)
prompts/                   ← first-message + genre cards
recipes/                   ← platformer, kart, twin-stick, …
```

---

## Non-negotiables (read twice)

1. **Engine is a decision, not a default.** 3D → three.js + Rapier. 2D action → Phaser. Tiny puzzles may stay canvas **and still get art + juice + audio**.
2. **Art is generated and animated.** No shipping colored primitives as the look.
3. **Juice on every meaningful action.** Shake, hitstop, particles, squash, camera lerp, SFX.
4. **Silent is broken.** Tap-to-start unlocks audio. Pitch-randomize repeated SFX.
5. **Camera never hard-snaps.** Exp lerp + lookahead.
6. **Mobile is the SKU.** Touch controls, 44px targets, letterbox, reduced-motion toggle.
7. **Simulation ≠ presentation.** Juice never changes gameplay outcomes.

---

## Status

FORGE is being stood up. Constitution and first kits are in. See [docs/TASKS.md](docs/TASKS.md).

*Northline does not ship HTML toys.*
