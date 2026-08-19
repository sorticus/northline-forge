# New hire briefing

Welcome to Northline.

You were hired because you can finish things. That is not why you will stay. You will stay if the things you finish **feel expensive**.

This studio ships **browser / mobile** games. No native engine. No Unreal. No “we’ll polish in a month.” The first playable **is** the vertical slice. If v1 looks like a CS assignment, we killed the title.

---

## What we make

Short-session mobile games that feel like they had a feel programmer in the room.

We steal *feel*, never IP. You may say “Celeste dash, Hollow Knight pogo, Gungeon reload, MK8 drift.” You may not ship Mario, a Nestle HUD, or a gun-photo glued to the camera.

The unannounced flagship is not your problem yet. FORGE is. Every prototype, jam, and Grok Build session runs through FORGE so the flagship does not inherit HTML DNA.

---

## How you will actually work (Grok Build)

You do not have a local toolchain in the chat. Grok Build **is** the compiler, the art department, and the QA intern.

**Every new title, first message:**

See [../INVOKE.md](../INVOKE.md). If you skip the pull, you get factory defaults: canvas rectangles, no juice, no audio. That is how the last intern spent two weeks. Don’t.

Grok will try to be helpful and ship a playable rectangle. Your job is to **not let it**. FORGE is the document you hand it so “helpful” means “Northline.”

---

## The three layers (memorize)

### 1. Juice — 80% of “it feels dead”

Same mechanics. Different body.

Screenshake (trauma²), hitstop, particles, squash/stretch, eased motion, camera lerp, layered SFX. Every input produces *disproportionate* feedback. Presentation never writes the sim.

### 2. Art — the other 80% people notice first

Generated sprite sheets. Animated. Maps with layers and collision. 3D is geometry, not a JPEG of a gun. A pixel platformer with a run cycle will embarrass a 3D kart made of unlit cubes.

### 3. Engine — pick once, then commit

| 3D | 2D action | Tiny puzzle |
|---|---|---|
| three + R3F + Rapier | Phaser 3 | Canvas 2D + FORGE kit |

Three.js without lights, shadows, and camera feel is just 3D rectangles. Phaser without tweens and cameras is just a fancier canvas. The engine is not the flex. The **wiring** is.

---

## What I will call you out for

- Shipping a start screen that says `Click to start` in system type on a white canvas.
- A character that translates across the screen with one sprite.
- Camera glued to the player (`camera.x = player.x`).
- Hits that do not shake, stop, flash, or speak.
- “I’ll add audio later.”
- Mouse-only controls on a phone SKU.
- Asking the factory game playbook to save you. It allows the cheap path. We don’t.

---

## First week

1. Read `AGENTS.project.md`. Aloud, if you have to.
2. Read `kit/README.md`. Copy the modules into a throwaway game.
3. Build one recipe from `recipes/` (when they land) **or** a 30-second juice test: a square that jumps, lands with squash, dust, shake, and a tick.
4. If that square already feels better than your last shipped game, you understand the job.

---

## Chain of command

- **Law:** `AGENTS.project.md`
- **Board:** `docs/TASKS.md`
- **Code you copy:** `kit/`
- **Agent brain:** `skills/pop-games/SKILL.md`

If those disagree, law wins. If you disagree with law, you change law in a commit — you do not quietly ship rectangles.

Welcome to the floor.
