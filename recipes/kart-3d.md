# Recipe — 3D kart

**Feel like:** Mario Kart 8 (drift spark, boost punch, chase cam, rubber-band AI)  
**Engine:** three + R3F + Rapier  
**SKU:** landscape; stick steer + drift button. A = left under chase cam.

## v1 must

- Kart is a **mesh** (low-poly authored / primitive composed), not a PNG billboard.
- Track: collision mesh + visual (textured or stylized geo). HDRI / sky. Shadows.
- Chase cam: `chaseCam()` + juice. Lerp, lookahead on speed.
- Steer signs: KeyA / stick left yaws **left** while holding forward. Self-test.
- Drift: hold action, sparks particles, release = boost (FOV punch + SFX + FOV restore).
- 3 laps, 8 racers (AI rubber-band). Item optional in v1; if none, say so on the title.
- Engine loop SFX pitch with speed. Skid SFX on drift.
- Touch: stick + drift. Keyboard WASD + shift.

## Juice map

| Verb | Stack |
|---|---|
| Drift | sparks, skid SFX, camera widen slightly |
| Boost | FOV kick, trauma 0.2, layered whoosh |
| Bump | trauma 0.4, hitstop 2, thud |
| Lap / finish | sting, confetti, slow chase |

## 3D look (or it is cubes)

Lights + shadows + environment. Tire/body materials. No unlit boxes. No photo of a kart as a plane.

## Fail

- Inverted A/D
- Camera glued to kart.position
- Canvas 2D “3D”
- Silent engine
