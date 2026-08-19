# Juice doctrine

Canon: Vlambeer *Juice it or lose it*, Nijman *The art of screenshake*, Swink *Game Feel*, Eiserloh trauma².

**Every meaningful action produces disproportionate, multi-sensory feedback.**

The sim can stay stupid. The body cannot.

## Separate sim from presentation

Juice never changes who won, where the collider is, or netcode. Hitstop freezes **updates**, not the GPU. Knockback that is gameplay is not juice; the freeze before it is.

## Trauma² shake

Store `trauma ∈ [0,1]`. Add on events. Decay over time. **Shake amplitude = trauma²** (or ³). Noise, not white random. Rotate a little. Directional kick opposite the hit.

Cap it. Ship a slider. Photosensitive / vestibular users exist.

Implementations: `kit/juice.ts`. Offset the **camera container**.

## Hitstop

2–6 frames normal, longer finishers. Too long = lag. Pair with 1–2 frame white flash. Knockback after the freeze.

## Motion

Almost nothing linear. easeOutBack for pops. Squash/stretch preserves volume (`x' = 1/y'`). Anticipation + follow-through, even two frames.

Camera: `expDamp`, lookahead, deadzone, punch. Pixel-round for pixel art.

## Particles

Dust land, sparks hit, trails projectiles, confetti win, motes idle. **Pool them.**

## Audio is juice

Layer (thump + body + click). Pitch-randomize. Duck music on big hits. See `kit/audio.ts`.

## Don’t

- Obscure the player or incoming telegraphs
- Strobe the full screen
- Allocate hundreds of particles per shot
- Let hitstop stretch past ~120ms on normal hits

## Reflex table

When you generate a hit / pickup / death / land / win, attach the full stack from [01-quality-bar.md](01-quality-bar.md). That is the job. Not a stretch goal.
