# Recipe — FPS

**Feel like:** a tight arena shooter (kick, muzzle, hip-fire spread) — not a COD clone  
**Engine:** three + R3F + Rapier + pointer lock  
**SKU:** look via drag / lock; fire + jump on the right. WASD + mouse on desktop.

## v1 must

- **Viewmodel is a mesh** parented to the camera. Never a gun photograph (no alpha, no reload).
- Rapier capsule controller, snap-to-ground, jump.
- Muzzle light + pooled tracers + impact decals/sparks + trauma kick **opposite** the shot.
- Reload is an animation + SFX, not a UI bar only.
- A/D strafe player-left/right. Self-test. PointerLockControls is mouse-look **only**.
- One arena, lighting + shadows + environment. Audio spatialized to listener.
- Tap-to-start unlocks audio **and** lock.

## Juice map

| Verb | Stack |
|---|---|
| Fire | muzzle, kick, vary SFX, tracer |
| Hit (confirm) | spark, tick, tiny punch |
| Damage taken | directional trauma, grunt, vignette flash |
| Reload | click layers, viewmodel motion |
| Kill | hitstop 4–6, burst, sting |

## Fail

- JPG gun
- Silent shots
- Inverted strafe
- Unlit void with a capsule
- Mouse-only on the phone SKU
