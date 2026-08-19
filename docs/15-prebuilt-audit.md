# Prebuilt games — once-over

You already have a title. Do **not** rebuild it from scratch by default. Run this audit. Then: **pass**, **patch**, or **rebuild**.

This is the new-hire job when someone says “give it a once over,” “polish this,” or “it looks like HTML.”

## 0. How to start (Grok Build)

```text
Pull github.com/sorticus/northline-forge and follow FORGE.
Do NOT scaffold a new game.
Audit the existing title with docs/15-prebuilt-audit.md.
Patch in place: wire src/forge/, juice, audio, touch, art.
Cheap path remains a ship blocker.
```

If the existing loop is correct and the feel is dead — **patch**.  
If the engine is wrong (canvas kart, CSS cubes FPS) — **rebuild the world**, keep the rules/levels if they exist.

---

## 1. 60-second smell test

Play 60 seconds on a ~390px viewport. Write one sentence.

| You thought | Verdict |
|---|---|
| “HTML / CS assignment / mute rectangles” | Fail. Patch or rebuild. |
| “Prototype, but the verbs are there” | Patch. Do not restart. |
| “I’d send this to a friend” | Pass chrome + stores still. |

---

## 2. Fail-closed (any fail = not done)

Copy from [10-checklists.md](10-checklists.md). Tick in this order — later items lie if earlier ones are broken:

1. Engine matches [02-engine-selection.md](02-engine-selection.md)
2. Loop is RAF/engine dt, capped — no `setInterval`
3. TAP TO START unlocks audio **synchronously**
4. Generated / authored art — not primitives as the look
5. Player animates (idle + locomotion at minimum)
6. Juice on jump/land/hit/pickup/death/win
7. Camera exp-lerps — no hard snap
8. Touch path exists, ≥44px, no page scroll
9. A = left under chase cam (if movement 3D/vehicle)
10. Mute + shake + reduced motion
11. HUD designed — not Arial on a naked canvas
12. Production build, console clean

---

## 3. Patch order (do not shuffle)

Feel first, cosmetics second. Players forgive ugly that punches. They do not forgive mute slides.

| Step | Work | Kit |
|---|---|---|
| A | Copy `kit/` → `src/forge/`, wire time/juice/audio | `kit/` |
| B | TAP TO START + `audio.unlock()` + `installDefaultSfx()` | `sfx-proc.ts` |
| C | Camera follow + trauma shake | `camera.ts`, engine juice adapter |
| D | Impact table on existing verbs | `juice.impact`, `hapticImpact` |
| E | Touch stick + actions | `touch.ts` |
| F | Settings cog (pause + audio + shake) | [17-universal-chrome.md](17-universal-chrome.md) |
| G | Art: sheets / meshes / map layers | sprite + map pipelines |
| H | Save + strings | `save.ts`, `i18n.ts` |
| I | Share card / `og:type=x:game` | og skill |
| J | Store prework only if they asked for stores | [16-app-stores.md](16-app-stores.md) |

Do **not** start at G because art is fun. A dead jumper with a pretty PNG is still dead.

---

## 4. Rebuild triggers (rare)

- Wrong engine for the genre
- Photo used as a 3D viewmodel
- Inverted controls baked through every system
- No real sim — CSS boxes pretending to be a game
- They asked for a different genre

If you rebuild: migrate rules, scores, and level data. Do not throw away a good economy because the camera snapped.

---

## 5. Report format (to the player / producer)

```
Verdict: PASS | PATCH | REBUILD
Engine: …
Feel: … (one line)
Art: …
Audio: …
Mobile: …
Worst 3: …
Next patch: … (one step)
```

No essay. No “looks fine.” Name the worst three.
