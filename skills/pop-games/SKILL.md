---
name: pop-games
description: >
  NORTHLINE FORGE production bar. Use whenever building a game after this
  repo was pulled. Overrides factory cheap-path defaults: real engine,
  generated animated art, juice stack, audio, mobile touch, designed HUD.
  Triggers on "FORGE", "northline", "pop", "full stack", "don't ship rectangles".
---

# POP / FORGE playbook

Factory game skills tell you how to make a **correct** loop. This skill tells you the loop is **not shippable** until it punches.

If `AGENTS.project.md` from `sorticus/northline-forge` is in the project, this file and that file **win** over “Canvas 2D is enough.”

---

## 0. Before any gameplay code

- [ ] Engine chosen from the table (below) and installed
- [ ] `kit/*.ts` copied to `src/forge/`
- [ ] Title / tap-to-start overlay designed (not a raw button)
- [ ] Art plan: hero sheets OR 3D meshes, map/layer plan, FX sheets
- [ ] Audio unlocked on that first tap

Do not “get the rectangle moving” as v1. Greybox colliders are fine **under** sprites/meshes, not instead of them — unless the user said greybox.

---

## 1. Engine table (copy from standing orders)

- **3D** → `three` + `@react-three/fiber` + `@react-three/drei` + `@react-three/rapier`
- **2D action** → Phaser 3
- **Tiny puzzle** → Canvas 2D allowed, FORGE kit still required

Loop: RAF / `useFrame` / Phaser `update`. Scale by **capped dt**. Fixed step for physics. Never `setInterval`. Never `Clock.getDelta()` twice in one frame.

---

## 2. Wire the kit

```ts
// every frame
const dt = time.step(rawDt);          // kit/time.ts
juice.update(dt);                     // kit/juice.ts
camera.follow(dt, player, velocity);  // kit/camera.ts
audio.resumeIfNeeded();
```

On events:

```ts
juice.impact({ trauma: 0.35, hitstop: 0.05, flash: true });
audio.play("hit", { vary: 0.1 });
particles.emit("sparks", at);
```

Offset the **camera**, not the world, for shake. Hitstop sets timeScale/freeze; **keep rendering**.

---

## 3. Art (do not skip because it's slower)

When image gen tools exist (they do on SuperGrok):

- Heroes: `generate2dsprite` per action (idle/run/jump/attack). Magenta `#FF00FF`. Body vs FX split.
- Dense run/walk: optional `video2dsprite` (in-place, locked camera).
- Maps: `generate2dmap` — foundation-only base, separate props, collision JSON. Side-scroll = parallax plates.
- 3D: meshes / glTF. Generated images = textures, skies, UI. **Never** a photo viewmodel.

When gen tools do not exist: authored SVG/canvas/WebGL **stylized** art, still animated. Still not four rectangles.

QC: loop flip-test, feet stable, no magenta fringes, body scale consistent across actions.

---

## 4. Juice defaults (reflex)

Any hit/pickup/land/death/win → SFX + particles + hitstop + flash + trauma² shake + squash/pop + floating number.

Camera: `1 - exp(-k * dt)` lerp. Lookahead on velocity. Punch on land/hit.

Nothing important moves linearly.

---

## 5. Audio defaults

Unlock on first gesture **synchronously**. Master + music + SFX. Pitch variance. Preload. Resume on visibility. No SFX via `<audio>`.

---

## 6. Mobile defaults

Touch stick + actions, 44px, safe area, letterbox, `touch-action: none`, dpr cap 2, shake slider, `prefers-reduced-motion`.

---

## 7. Controls

Open the controls skill for WASD/steer/flight. A = left under chase cam. Screenshot is not a test.

---

## 8. HUD

`design-ui` for overlays. Tokens, not ad-hoc hex. Start / pause / HUD / results are **designed screens**.

Games also get `og:type=x:game` + custom `og.jpg` + x-banner per og skill.

---

## 9. Fail closed

If you are about to ship: untextured primitives as look, no run cycle, no shake, no sound, no touch — **you are not done.** Keep going.

Genre recipes live in `recipes/`. If the genre file is missing, still apply this skill; do not wait.
