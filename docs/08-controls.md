# Controls law

Inverted A/D is the most expensive bug we still ship. It makes a 3D game feel cursed in five seconds.

## Player-visible rule

From a **chase camera**, while moving **forward**:

- **A** turns / strafes **left**
- **D** turns / strafes **right**

If A goes right, you failed. Flip **one** sign. Do not flip both (you will invert twice and “fix” nothing).

## FPS / twin-stick (strafe)

```
forward = camera forward on XZ
right   = cross(forward, up)
position += (forward * input.y + right * input.x) * speed * dt
```

`input.x < 0` is A / stick left.

## Vehicle / kart (yaw the body, camera follows)

```
forward = (-sin(yaw), 0, -cos(yaw))   // three.js, +Y up, look -Z
// KeyA → steer = +1   (NOT -1)
yaw += steer * turnRate * speedFactor * dt
```

Wrong pattern that ships inverted: `KeyA → steer = -1` plus `yaw += steer * rate`.

## Flight

Ailerons: A rolls the craft so the following pull-up / stick still reads as left from the camera. Test it. Do not trust the first matrix.

## Self-test (mandatory for movement games)

1. Hold W / forward.
2. Tap A. The vehicle/body must go **left** on screen.
3. Tap D. Right.
4. If chase cam is offset behind the player, still left = left.

Screenshot-only QA is insufficient. If you cannot drive the keys in a headless pass, instrument `window.__controlsTest` and log the yaw delta on KeyA.

## Touch

Stick left must be the same axis as KeyA. One input state (`kit/input.ts`). Two code paths is how inversion comes back on phones only.
