# Performance budget (phone SKU)

We ship to a mid-range phone, not a 144Hz tower. Jank is a feel bug.

## Budgets

| Item | Target |
|---|---|
| Frame | 16.6ms (60fps). 33ms on thermal throttle is the floor, not the goal |
| 3D draw calls | `< 100` (`renderer.info.render.calls`) |
| DPR | `min(devicePixelRatio, 2)` |
| Particles | pooled, cap 256–512 |
| Concurrent SFX voices | cap ~16, disconnect on ended |
| Per-frame alloc | **zero** in the hot path (reuse vectors) |

## Always

- Pool bullets, enemies, particles, floaters. Recycle, don’t `destroy()`.
- Texture atlases (2D). Same-texture batches.
- 3D: `InstancedMesh` / R3F `<Instances>` for repeats.
- Dispose GPU resources on scene change (three does **not** GC textures).
- Fixed-step physics, capped dt (`kit/time.ts`). Backgrounded tabs must not teleport.
- Pixel art: nearest + round camera.
- Don’t update Text/DOM every frame if a bitmap / pre-rendered label will do.

## Phaser

- `init()` reset, `shutdown` cleanup
- Physics debug **off** in ship
- Static bodies for world
- `Scale.FIT` at a modest design res, upscale

## R3F / three

- `dpr={[1, 2]}`
- Shadows: one directional, 1024 map unless you can prove 2048
- Don’t upload new textures per frame
- Rapier for colliders; don’t raycast the world 200 times on JS

## Fail closed

Thousands of unpooled particles. Per-frame `new THREE.Vector3()`. Uncapped retina on an iPhone Pro. That’s how a juice stack becomes a 20fps slideshow.
