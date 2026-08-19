# Mobile SKU

If it doesn’t play on a phone in portrait or landscape (whichever you locked), it is not a Northline game. Desktop preview is a workstation, not the product.

## Layout

- Design resolution (e.g. 390×844 portrait or 1280×720 landscape). Letterbox (`FIT`). Do not stretch.
- No document scroll. Canvas + overlay fill the viewport. `touch-action: none` on the game surface.
- Safe area: notches, home indicator. HUD inset.
- Tap targets **≥ 44px**. Virtual stick is large and has a deadzone.

## Controls

On-screen:

- Left: stick (or two buttons for simple runners)
- Right: 1–3 actions (jump / dash / fire)
- Pause is reachable by thumb, not hidden in a 12px corner

Keyboard/WASD is for the desktop preview and QA. Gameplay reads a **unified** input state (`kit/input.ts`). Touch writes into that state.

## Performance

- `devicePixelRatio` capped at 2
- Pool bullets, enemies, particles, floaters
- 3D: instancing for repeats, dispose GPU resources on scene change
- Pixel art: nearest filter, round camera to integer
- Profile on a mid phone budget, not a 144Hz tower

## Audio on iOS

Unlock **inside** the TAP TO START click, synchronously. `attachUnlock` is backup, not the plan. Resume on `visibilitychange`.

## Accessibility

- Screen shake slider / off
- Reduce flash
- Respect `prefers-reduced-motion` (juice.reducedMotion = true)
- Mute + separate music/SFX

## Orientation

Pick one. If landscape-only, show “rotate” in portrait. Do not ship a broken vertical layout and call it responsive.

## QA viewport

390×844, thumb reach, no horizontal overflow, start button obvious, stick does not eat the pause hit-target.
