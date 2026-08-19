# Art pipeline

Rectangles are collision. They are not the look.

Northline art is **generated, isolated, animated, and engine-ready**. You do not ask the player to imagine a character on a blue square.

## 2D sprites

Pipeline: Imagine sheet on solid **`#FF00FF`** → chroma → frame PNGs + GIF QC → atlas in Phaser/canvas.

Heroes (controllable):

| Action | Default grid | Notes |
|---|---|---|
| Idle | 2×2 (4) | Alive. Breathing, weight shift. |
| Run / walk | 2×2 or 2×3 | Side; top-down 4-dir is 4×4 locomotion only |
| Jump | 2×2 | Stretch on up, squash prep |
| Attack / shoot **body** | 2×2 or 2×3 | Body + weapon only |
| Slash / muzzle / projectile / impact | separate FX sheets | Do not bake wide FX into the body cell |

Rules:

- One action family per raw sheet. No “row1 idle, row2 run” raw atlases.
- No raw 1×N body strips (identity drifts, crops). Grid first; assemble strips after QC.
- Body centered, feet on a stable baseline, 60–70% safe area, nothing crossing cell edges.
- Attack body height within ~10–15% of idle.
- Loop must flip-test: last frame → first frame.

Dense locomotion: still on magenta → video **in place**, camera locked → harvest. Prefer grid sheets if video smears pixels or identity.

## Maps

A pretty JPG is a painting. A map is **layers + collision + hooks**.

| Mode | Use | Runtime |
|---|---|---|
| Tile | RPG, monster-tame, grid | Tileset + collision + object layer |
| Scene | TD, survivors, showcase | Foundation base + separate props |
| Side-scroll | Platformer, runner, brawler | Parallax plates + platform objects |
| Baked | Title, VN, battle backdrop | Single image **only** if nothing walks on it |

Foundation bases contain ground/sky/atmosphere. **No** trees, crates, doors, spikes, players. Those are props with collision.

Side-scroll parallax: `sky`, `far`, `mid`, `near`, optional foreground overlay. Same canvas size. Platforms are not painted into `near`.

## 3D

Image models do not emit meshes.

| Need | Do |
|---|---|
| Body, gun, kart, crate | Geometry or glTF |
| Skin, rust, sky, HUD | Generated 2D, as texture |
| FPS viewmodel | Parent a **mesh** to the camera |

A photoreal gun JPG has no alpha and no animation. It is how you ship a black box.

## UI art

Icons: one style, no text in the bitmap (we localize), 9-slice panels. HUD is DOM/overlay designed with tokens — not emoji, not system Arial.

## Consistency

Same character again = **edit the base image**, do not re-roll text-to-image. Palette, silhouette, eye highlights, costume marks stay.

## Fail closed

- Stick figures “until art”
- One sliding PNG
- Baked-in platforms on a side-scroller background
- Photo as mesh
