# FORGE kit — runtime you copy

Drop this folder into the game as `src/forge/`.

Core modules are **engine-agnostic**. Engine boots live in `engines/` and import Phaser / three — only use those inside a game that installed the deps.

## Wire (every game)

```ts
import { GameTime, Juice, FollowCamera, audio, ParticlePool, attachKeyboard, poll, bindA11y } from "@/forge";

const time = new GameTime();
const juice = new Juice();
const cam = new FollowCamera();
const fx = new ParticlePool();
attachKeyboard();
audio.attachUnlock();
audio.makeTick("hit", 180);
audio.makeTick("land", 90, 0.12);
audio.makeTick("jump", 320, 0.06);
bindA11y(juice, { reducedMotion: false, shake: 1, flash: true, mute: false });

function frame(rawDt: number) {
  const dt = time.step(rawDt);          // Phaser: rawDt/1000
  const frozen = juice.update(dt).frozen;
  if (!frozen) {
    const input = poll();
    cam.follow(dt, player, playerVel);
    fx.update(dt);
  }
  // render using cam.x/y + juice.offsetX/Y
}
```

Prefer the boot for your engine:

- 2D action → `engines/phaser-boot.ts`
- 3D → `engines/r3f-boot.tsx`
- Tiny puzzle → `engines/canvas-boot.ts`

## Events

```ts
juice.impact("land");
cam.punch(0, 6);
fx.emitLand(player.x, player.y + 12);
audio.play("land", { vary: 0.12 });
```

## Rules

- Hitstop **skips sim**, not render.
- Shake offsets the **camera**, not every sprite.
- `expDamp` / `FollowCamera` only. No `* 0.1` lerp.
- Unlock audio on TAP TO START by calling `audio.unlock()` in that click handler **synchronously**.
- Touch UI writes `setStick` / `setButton`. Gameplay reads `poll()` only.
