# Audio

Silent is broken. “I’ll add sound later” is how later never happens.

## Unlock

Browsers start `AudioContext` suspended. Resume **synchronously** in the first `pointerdown` / `touchend` / `keydown`. Any `await` before `resume()` can break iOS.

TAP TO START exists so that gesture is guaranteed. Also resume on `visibilitychange`.

`kit/audio.ts` → `unlock()` + `attachUnlock()`.

## Graph

```
source → per-voice gain → sfxBus ─┐
music  → musicGain ───────────────┼→ masterGain → destination
```

Slider 0–1 maps through **x²**. Ramp with `setTargetAtTime`, never click `gain.value` mid-note.

Always expose master / music / SFX / mute.

## Playback

- SFX: decoded `AudioBuffer`s, overlapping sources. **Not** `<audio>` elements.
- Music: Howler/html5 streaming is fine; SFX stay Web Audio.
- Preload + decode on the loading/title path. First-shot hitch is amateur.
- Pitch-randomize repeated SFX (`vary: 0.08–0.15`). Volume jitter optional.
- Layer big events (thump + body + sparkle).
- Spatial: 3D `PannerNode` / Howler `pos`; 2D can be `StereoPannerNode`. Don’t HRTF a match-3.

## Before real files exist

`audio.makeTick("hit" | "land" | "jump" | "pickup")` so the juice stack has a mouth on day one. Replace with authored samples without changing call sites.

## Formats

SFX: short, **mono**, compressed. Music: stereo compressed. Provide a Safari-safe fallback when you add files (`m4a`/`mp3` + `webm`/`ogg`).

## Fail closed

- No tap-to-start unlock
- SFX via `new Audio().play()`
- Robotic machine-gun identical samples
- Music blasting with no mute
- Decode on first hit
