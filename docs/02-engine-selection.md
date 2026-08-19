# Engine selection

Pick once. First decision after the pitch. Put it in `package.json` the same hour.

## Table

| Game | Engine | Why |
|---|---|---|
| FPS, third-person, kart, flight, voxel, 3D brawler | **three.js + R3F + drei + Rapier** | Lights, camera, physics, React HUD |
| Platformer, twin-stick, runner, TD, beat-em-up, metroidvania | **Phaser 3** | Scenes, arcade physics, cameras, tweens, particles |
| Tetris, match-3, solitaire, word, 2048, chess-like | **Canvas 2D** | Simple sim — **FORGE kit still required** |

## Illegal defaults

- Canvas 2D kart / FPS / “3D” CSS cubes
- Three.js Tetris
- Phaser for a 3D flight model
- Any engine with `setInterval` as the loop

## 3D must-haves (or it is still rectangles)

- `Canvas` with `shadows` and `dpr={[1,2]}`
- At least one directional or hemisphere light + shadows on the hero
- Environment (HDRI / `Environment` / colored fog + sky) — not a void
- Camera rig with FORGE follow/shake
- Rapier for anything that walks, drives, or flies
- Meshes / glTF for weapons and bodies. **No photo viewmodels**

## Phaser must-haves

- Scene stack: Boot → Preload (progress) → Menu → Game + parallel UI
- Per-run state reset in `init()`, cleanup on `shutdown`
- Arcade physics unless the physics *is* the game (then Matter)
- `Scale.FIT` + fixed design res + center
- Texture atlas / spritesheet animations, not one image
- Object pools for bullets/enemies

## Canvas 2D must-haves

- FORGE `GameTime`, `Juice`, `ForgeAudio`, particles
- Generated or authored art
- Designed HUD
- Touch

If you cannot justify Canvas, you wanted Phaser.
