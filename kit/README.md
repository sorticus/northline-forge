# FORGE kit — runtime you copy

Drop this folder into the game as `src/forge/`.

These modules are **engine-agnostic**. They do not import Phaser or three. You call them from your loop.

## Wire (every game)

```ts
import { GameTime, Juice, FollowCamera, audio, ParticlePool, attachKeyboard, poll } from "@/forge";

const time = new GameTime();
const juice = new Juice();
const cam = new FollowCamera();
const fx = new ParticlePool();
attachKeyboard();
audio.attachUnlock();
audio.makeTick("hit", 180);
audio.makeTick("land", 90, 0.12);
audio.makeTick("jump", 320, 0.06);

function frame(rawDt: number) {
  const dt = time.step(rawDt);          // Phaser: rawDt/1000
  const frozen = juice.update(dt).frozen;
  if (!frozen) {
    const input = poll();
    // simulate with input + dt
    cam.follow(dt, player, playerVel);
    fx.update(dt);
  }
  // render using cam.x/y + juice.offsetX/Y
}
```

## Events

```ts
// land
juice.impact("land");
cam.punch(0, 6);
fx.emitLand(player.x, player.y + 12);
audio.play("land", { vary: 0.12 });

// hit
juice.impact("heavy");
fx.emitHit(x, y);
audio.play("hit", { vary: 0.15 });
```

## Rules

- Hitstop **skips sim**, not render.
- Shake offsets the **camera**, not every sprite.
- `expDamp` / `FollowCamera` only. No `* 0.1` lerp.
- Unlock audio on TAP TO START by calling `audio.unlock()` in that click handler **synchronously** (also `attachUnlock` as backup).
- Touch UI writes `setStick` / `setButton`. Gameplay reads `poll()` only.

## Phaser

- dt in `update(time, delta)` is **milliseconds**.
- `cameras.main.scrollX = cam.x - juice.offsetX` (plus your half-width).
- Prefer our trauma shake over `camera.shake` for directional control; Phaser shake is fine as extra punch.

## R3F

- `useFrame((_, d) => …)` dt is seconds. Cap via `time.step(d)`.
- Put shake on a camera rig group, not on the world root.
- Pointer lock is mouse-look only — WASD still comes from `poll()`.

## Canvas 2D (puzzles only)

Still use juice + audio + particles. A match-3 with pops, ticks, and shake is a Northline puzzle. A mute grid is not.
