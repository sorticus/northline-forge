# HUD & icons

The canvas is the game. The overlay is the **product**. A raw `<canvas>` with Arial “SCORE: 0” is not a Northline title.

## Overlay surfaces

- Title / TAP TO START (unlocks audio)
- HUD (hp, score, weapon, dash meter)
- Pause
- Results
- Settings (mute, music, SFX, shake)
- On-screen stick + actions (`kit/touch.ts`)

Keep overlay **out of the gameplay pointer path** (pointer-lock / stick). HUD is `pointer-events: none` except pause and buttons.

## Design law (pair with the app’s UI skill)

- Tokens, not ad-hoc hex in JSX
- ≤ 5 colors, ≤ 2 typefaces
- Contrast on a moving canvas: backing plate / blur / thick outline
- Tap targets ≥ 44px
- Motion 150–250ms, interruptible, `prefers-reduced-motion`

## Icons

- One style contract across the set (weight, corner, padding)
- **No text in the bitmap** — we localize
- Legible at 32px
- State variants (on/off/disabled) share geometry (don’t jump the optical center)
- No emoji as icons

Generate a set together (same prompt family / edit-from-base). A shop icon from a different universe than the pause icon reads as asset-flip.

## 9-slice

Panels, frames, buttons: corner ornament + uniform edges so they scale. Do not raster a 1200px window and squash it.

## Fail closed

- Emoji HUD
- System Arial on a white canvas
- Pause in a 12px corner
- Stick covering the only pause hit-target
- Flashy full-screen CSS gradients as a substitute for a title
