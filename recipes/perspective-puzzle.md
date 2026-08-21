# Recipe — impossible architecture / perspective puzzle

**Feel like:** Monument Valley (perspective snap, quiet juice, tap-to-rotate)  
**Engine:** three + R3F. Canvas “fake 3D” is a rebuild trigger.  
**SKU:** portrait tap. **No stick. No WASD. No Rapier walker.** Chrome **Family A**, almost empty HUD.  
**Juice profile: QUIET.** Default trauma/hitstop spam will **ruin** this title. Override FORGE loud defaults.

## Legal (read twice)

This is **not** a Monument Valley remake. That name, Ida, the crow, those levels, that soundtrack, that UI — **ustwo IP**. Shipping a trace is a lawyer, not a vibe.

You steal: rotating a piece **is** the puzzle; walking a path that only exists after the snap; stillness; one tap = one honest rotation.

You invent: setting, character, geometry, music, chapter names.

## The actual game (if you miss this you shipped an orbiting cube)

The walker lives on a **waypoint graph**. Edges are `on` or `off` depending on the rotation state of named pieces.

1. Player taps a **handle** (ring / stair / plank), not the void.
2. Piece eases 90°. Walker is locked (or parented if the piece they stand on is moving).
3. On snap: recompute which edges exist (alignment of platforms within a threshold).
4. Walker **auto-walks** along a shortest path toward the goal when a path exists. Tap the goal or just let them go — do not require analog steer.
5. Goal reached → chapter resolve.

No `RigidBody` character controller. Rapier is optional for *static* mesh vibes, not locomotion. `mountTouch` **off**. `ForgeCanvas` gravity **off**.

Camera is a **postcard**: fixed pose per beat, lerp to the next. Not `OrbitControls`. Not FPS.

## v1 must (ship chapter 1 first)

**Playable bar = chapter 1 completable on a phone.** Then chapters 2–4, each a *different* mechanic:

| Ch | Mechanic |
|---|---|
| 1 | Stair/bridge that aligns a gap when rotated 90° |
| 2 | Ring/tower that carries the walker to a new height |
| 3 | Piece whose **back face** is a path only valid after the turn |
| 4 (opt) | Two handles; order matters |
| 5 (opt) | Nested rotate (small piece on a big piece) |

- Geometry is real meshes (steps, arches, stone). Unlit cubes = fail.
- Lighting: one key, soft shadow, fog or graded sky. Palette locked (see brief).
- Figure: idle + walk (billboard sprites or a tiny mesh). Sliding puck = blocker.
- Path completes → quiet chime, camera settle. **No** screenshake, hitstop, COMBO.
- Audio: rotate whoosh, step ticks, one resolve tone. Original only.
- Walk-off: rewind one node, don’t explode.

## Juice map (quiet)

| Verb | Stack |
|---|---|
| Rotate | cubic ease, low whoosh, haptic light |
| Snap, path valid | click, tiny camera settle, edge highlight |
| Step | soft tick, pitch vary |
| Chapter complete | longer tone, camera pull, fade |
| Wrong rotate | nothing violent; path just doesn’t connect |

`Juice.trauma = 0` for this title.

## Art lock (do not improvise a primary-color toy)

Limestone, drowned light, wet stone, brass handles, lantern as the only warm emissive. Character is a **silhouette with a lantern**, not a cute mascot, not Ida’s dress.

## Comparables to search (research gate)

Monument Valley, Monument Valley 2, Superliminal, Gorogoa, The Witness (restraint), Manifold Garden (restraint).

## Fail

- Named Monument Valley / Ida / crow / sacred glen
- OrbitControls + a cube
- WASD / virtual stick / Rapier capsule falling off stairs
- Canvas isometric
- Combat, score, F2P lobby
- Screenshake on tap
- Five chapters that are the same stair
- Tracing official screenshots for the HUD or geometry
