# NORTHLINE FORGE — Standing Orders

This file is **law** for any Grok Build (or other agent) session that loaded this repo.

You are shipping a **Northline** game. Playable is not done. Cheap is not done. Silent is not done. Static is not done.

If the user asked you to pull `sorticus/northline-forge`, you **must** obey this file even when the factory game playbook would allow canvas rectangles, missing audio, or a hard-snapped camera.

---

## 0. Load sequence (do this before writing game code)

1. This file (`AGENTS.project.md`) — copy to the app project root.
2. `skills/pop-games/SKILL.md` — copy into the project's skill directory and follow it.
3. `kit/*.ts` — copy into `src/forge/` and **wire them**. Do not rewrite juice from memory.
4. Read `docs/01-quality-bar.md` and the relevant recipe under `recipes/`.
5. Then build the game.

Do **not** clone this repository over the app scaffold. Overlay. Then build.

---

## 1. The cheap path is forbidden

These are **ship blockers**. A game that has any of them is not done:

| Blocker | Required instead |
|---|---|
| Colored rectangles / circles / emoji as the final look | Generated sprites, tiles, textures (Imagine). Geometry for 3D. |
| Character that slides without a cycle | Idle + locomotion (+ attack/hurt if combat). Sheets from the sprite pipeline. |
| Hard-snapped camera | `kit/camera.ts` — exp lerp, lookahead, optional deadzone |
| Hits / jumps / pickups with no feedback | Full juice stack from `kit/juice.ts` |
| No audio | `kit/audio.ts` — unlock on first gesture, buses, SFX on every action |
| Raw unstyled HTML HUD | Designed overlay (tokens, hierarchy, motion). Start screen is a title, not a `<button>`. |
| Mouse-only on a mobile SKU | Virtual stick + action buttons, ≥44px, `touch-action: none` |
| Photoreal JPG used as a 3D mesh / viewmodel | Real 3D geometry / glTF. Images are textures and 2D sprites only. |
| Linear motion everywhere | Easing, squash/stretch, camera punch |
| `setInterval` game loop | RAF / engine loop, **dt-scaled**, delta capped |

Prototypes: only if the user **explicitly** says “greybox” or “blockout.” Even then, juice + audio still ship. Greybox is collision and layout, not “skip feel.”

---

## 2. Engine selection (mandatory, first decision)

| If the game is… | Engine | Install |
|---|---|---|
| 3D (FPS, kart, flight, voxel, third-person) | **three.js + @react-three/fiber + drei + rapier** | `npm i three @react-three/fiber @react-three/drei @react-three/rapier` + types |
| 2D action (platformer, twin-stick, runner, TD, beat-em-up) | **Phaser 3** | `npm i phaser` |
| Tiny puzzle (solitaire, match-3, Tetris, 2048, word) | Canvas 2D **allowed** | Still: generated art, juice, audio, designed HUD |

Do not put Three.js on Tetris. Do not put Canvas 2D on a kart racer.

3D must include: lighting + shadows, environment (HDRI or equivalent), camera feel, **not** unlit cubes. Post (bloom/vignette) when it serves the look.

---

## 3. Feel stack (every meaningful action)

On hit / jump-land / pickup / death / explosion / win, fire **all** of:

1. SFX (pitch-randomized ±5–15%)
2. Particles (pooled)
3. Hitstop (2–6 frames; longer for finishers)
4. White flash on the victim (1–2 frames)
5. Screenshake via **trauma²** (`kit/juice.ts`)
6. Squash/stretch or `easeOutBack` pop
7. Floating number / combo pop when relevant

Juice is **presentation**. It must not change simulation outcomes.

Camera: `kit/camera.ts`. `pos += (target - pos) * (1 - exp(-k * dt))`. Never `pos += (target - pos) * 0.1`.

---

## 4. Art

- **2D characters / FX / projectiles:** sprite sheets. Magenta `#FF00FF` pipeline. Idle/run/attack as separate sheets for heroes. No mixed-action raw atlases.
- **Locomotion that must feel dense:** video-to-sprite (still → in-place video → harvest). Prefer crisp grid sheets for production heroes if video drifts.
- **Maps:** layered. Foundation-only base + separate props + collision metadata. Side-scrollers get parallax plates, not one baked JPG as the level.
- **3D:** build meshes / glTF. Generated images = albedo/emissive/sky/UI only.
- Do not ship stick figures when generation is available.

---

## 5. Audio

- Unlock `AudioContext` **synchronously** on the first user gesture. Tap-to-start exists for this.
- Master / music / SFX buses. Mute + sliders. Map slider through `x²`.
- No `<audio>` elements for SFX. Howler or Web Audio buffers.
- Resume on `visibilitychange`.
- Every action has sound. Repeated sounds are not robotic.

---

## 6. Mobile

This is a **mobile game company**. Desktop is a preview. The SKU is a phone.

- Touch controls on screen. Keyboard is extra, not the only path.
- Targets ≥ 44px. Safe area. Letterbox to a design resolution.
- `touch-action: none` on the canvas.
- Screen-shake / flash sliders. Respect `prefers-reduced-motion`.
- Cap pixel ratio at 2. Pool bullets/particles. InstancedMesh for repeats in 3D.

---

## 7. Controls

WASD / steering / flight: A = **left**, D = **right** from a chase camera while moving forward. Verify by actually testing, not a screenshot. Invert one sign if it ships backwards.

---

## 8. Done bar (all must be true)

- [ ] Engine choice matches §2 and is in `package.json`
- [ ] FORGE kit wired (`src/forge/`) — not reimplemented ad-hoc
- [ ] No cheap-path blockers from §1
- [ ] Start screen (tap to play) unlocks audio
- [ ] Juice fires on every meaningful action
- [ ] Generated (or authored) art in world, not primitives-as-look
- [ ] Animation states exist for the player
- [ ] Mobile touch path works at ~390px, no horizontal overflow
- [ ] Production build renders; console clean
- [ ] Custom share card for the game (`og.jpg`, `og:type=x:game`)

If any box is unchecked, **keep working.** Do not present rectangles and call it v1.

---

## 9. Voice

Talk to the user in **product terms**. The game, the feel, what to try. Not tool internals.

When they say “make a game” without a reference, pick a coherent Northline-quality title and **name the reference feel** in one line before you build.
