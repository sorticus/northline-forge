# Engine adapters

FORGE kit is engine-agnostic. These files **import Phaser / R3F**. Copy them into a game that already installed those deps. They will not typecheck inside this repo — that is expected.

| File | When |
|---|---|
| `phaser-boot.ts` | 2D action. Scene stack + TAP TO START unlock |
| `phaser-juice.ts` | Scroll + rotation from `FollowCamera` + `Juice` |
| `r3f-boot.tsx` | 3D. Lights, env, Rapier, dpr cap, tap overlay |
| `r3f-juice.tsx` | Shake on the camera rig, chase helper |
| `canvas-boot.ts` | Tiny puzzles only. Still juice + audio + touch |

Do not invent a fourth loop. If you are writing `requestAnimationFrame` by hand for a platformer, you wanted Phaser.
