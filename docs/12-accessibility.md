# Accessibility

Feel is not an excuse to hospitalize people.

## Ship by default

| Control | Default |
|---|---|
| Master / music / SFX + mute | on |
| Screen shake 0–1 | `1`, but `0` must still be playable |
| Flash | off-toggle |
| Reduced motion | follow `prefers-reduced-motion`, player can override |
| Color-only fail states | don’t. Shape + text + color |

`kit/a11y.ts` binds OS reduced-motion onto `Juice.reducedMotion` and scales `maxOffset`.

## Motion

When reduced:

- Trauma adds become no-ops
- Hitstop may stay tiny (≤ 2 frames) — it is readability, not shake
- Camera lerp stays (that is comfort)
- No full-screen strobe, ever

## Input

- Stick + buttons + keyboard. One state.
- Don’t require a precise flick as the only way to dash; a button exists.
- Pause is reachable.

## Cognitive / session

- Death is fast (burst → respawn). No 40-second lecture.
- One primary verb on screen. Don’t bury dash in a combo the tutorial never taught.

## Photosensitivity

No 10Hz full-frame flashes. Hit flash is 1–2 frames and local-to-sprite preferred.
