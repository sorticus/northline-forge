# Camera doctrine

The camera is a character. Hard-snapping it to the player is how you make a game feel cheap even with great art.

## Laws

1. **Never** `camera = player`.
2. Frame-rate-correct follow: `pos += (target - pos) * (1 - exp(-k * dt))`. Naive `* 0.1` is faster on 144Hz than 60Hz.
3. **Lookahead** on velocity / aim so the player sees the threat.
4. **Deadzone** (soft box) so idle fidget does not nauseate.
5. **Punch** on land / recoil — a kick that damps, not a teleport.
6. **Shake** is trauma² on the camera container (`kit/juice.ts`). Not on the world.
7. Pixel art: round the **final** camera to integers or the tiles shimmer.
8. Clamp to level bounds.

`kit/camera.ts` is the 2D implementation. 3D chase: `kit/engines/r3f-juice.tsx` `chaseCam()`.

## Stiffness

| Feel | `k` |
|---|---|
| Cinematic / Alto | 3–5 |
| Platformer | 7–9 |
| Twin-stick | 8–12 |
| Kart chase | 6–8 plus lookahead on speed |

## Debug order

If the camera “feels wrong,” isolate: (1) keys, (2) movement signs, (3) camera. Do not retune lerp while A is inverted.

## Accessibility

Shake slider. `Juice.reducedMotion`. See `kit/a11y.ts`.
