# FORGE kit — runtime you copy

Drop this folder into the game as `src/forge/`.

Core is engine-agnostic. `engines/` imports Phaser / three — only in a game that installed them.

## Wire

```ts
import {
  GameTime, Juice, FollowCamera, audio, ParticlePool,
  attachKeyboard, poll, installDefaultSfx, hapticImpact,
  settingsSave, applySettings, t,
} from "@/forge";

attachKeyboard();
audio.attachUnlock();
installDefaultSfx();
const juice = new Juice();
applySettings(settingsSave.load(), juice);

function frame(rawDt: number) {
  const dt = time.step(rawDt);
  const frozen = juice.update(dt).frozen;
  if (!frozen) {
    const input = poll();
    cam.follow(dt, player, playerVel);
    fx.update(dt);
  }
}

// on land:
juice.impact("land");
hapticImpact("land");
audio.play("land", { vary: 0.12 });
```

Boots: `engines/phaser-boot.ts` · `engines/r3f-boot.tsx` · `engines/canvas-boot.ts`  
3D grade: `engines/r3f-post.tsx`

## Also in this folder

| Module | Job |
|---|---|
| `haptics.ts` | `navigator.vibrate` |
| `save.ts` | versioned localStorage |
| `i18n.ts` | `t("pause.title")` |
| `settings.ts` | audio / shake / locale blob |
| `analytics.ts` | named events, **no-op** sink until you opt in |
| `sfx-proc.ts` | procedural bank so day one isn’t mute |

## Rules

- Hitstop skips sim, not render
- Shake the camera, not the world
- Unlock audio on TAP TO START, synchronously
- Touch writes `setStick`; gameplay reads `poll()`
- Do not turn analytics on without updating store privacy forms
