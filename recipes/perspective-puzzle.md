# Recipe — impossible architecture / perspective puzzle

**Feel like:** Monument Valley (perspective snap, quiet juice, tap-to-rotate)  
**Engine:** three + R3F. Canvas “fake 3D” is a rebuild trigger.  
**SKU:** portrait tap. No stick. Chrome **Family A**, almost empty HUD.  
**Juice profile: QUIET.** Default trauma/hitstop spam will **ruin** this title. Override FORGE loud defaults.

## Legal (read twice)

This is **not** a Monument Valley remake. That name, Ida, the crow, those levels, that soundtrack, that UI — **ustwo IP**. Shipping a trace is a lawyer, not a vibe.

You steal: rotating a piece **is** the puzzle; walking a path that only exists after the snap; stillness; one tap = one honest rotation.

You invent: setting, character, geometry, music, chapter names.

## v1 must

- **3–5 handmade dioramas.** Quality over quantity. One jewel of a chapter beats twelve grey boxes.
- Geometry is real meshes (steps, arches, platforms). Unlit cubes = fail.
- Lighting: one key, soft shadow, fog or graded background. The diorama is the art.
- Tap a **handle** (platform, gear, ring) → rotate 90° (or designed increment) with an ease (`cubic` / `back` tiny, not bounce-cartoon).
- While rotating: player is **locked** or rides the piece. After snap: pathfinding / nav along now-valid walk.
- Figure walks. Idle + walk cycle (even a 4-frame) on a tiny actor. Sliding puck is a blocker.
- Path completes → quiet chime, camera settles, door/ledge reveals. **No** screenshake, **no** hitstop, **no** floating COMBO.
- Camera: framed like a postcard. Lerp to new beat. Never FPS orbit unless a beat asks.
- Audio: sparse. Rotate whoosh (low), step ticks, one resolve tone. Music bed optional and **original**.
- Fail state is rare. If they walk off, rewind 1 step, don’t explode.

## Juice map (quiet)

| Verb | Stack |
|---|---|
| Rotate | ease, low whoosh, haptic light |
| Snap into valid path | click, tiny camera settle, path edge highlight |
| Step | soft tick, vary pitch |
| Chapter complete | longer tone, camera pull, fade — not confetti cannon |
| Wrong rotate | nothing violent; it just doesn’t connect |

`Juice.reducedMotion` still on. Prefer `trauma = 0` for this title.

## Comparables to search (research gate)

Monument Valley, Monument Valley 2, Superliminal (perspective as verb), Gorogoa (frame as mechanic), The Witness (quiet, not the same verb), Manifold Garden (recursion — steal restraint, not the IP).

## Fail

- Named Monument Valley / Ida / sacred glen clones
- Orbiting a cube with no puzzle
- Canvas 2D trapezoids pretending to be isometric
- Combat, score chase, F2P lobby, profile cog cluster
- Screenshake on every tap
- 20 procedural levels that all feel like the same stair
