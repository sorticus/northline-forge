# Ship checklists

Print this. Fail closed. “We’ll polish after preview” is how HTML ships.

## Feel

- [ ] TAP TO START title, not a naked canvas
- [ ] Jump / land / hit / pickup / death / win each have SFX + particles + appropriate juice
- [ ] Shake is trauma², not random jitter on the world
- [ ] Hitstop skips sim, still renders
- [ ] Camera exp-lerps; lookahead on; no hard snap
- [ ] Squash/stretch or pop on land/pickup
- [ ] Reduced-motion / shake off exists

## Art

- [ ] Player is a sheet or a mesh, not a debug collider color
- [ ] Idle alive; locomotion cycles; combat FX separate if any
- [ ] Map is layered with collision data (or 3D geometry)
- [ ] No photo used as a 3D model
- [ ] HUD designed (tokens, hierarchy), not system UI

## Audio

- [ ] Unlock in the start-tap, synchronously
- [ ] Master / music / SFX / mute
- [ ] Repeated SFX pitch-vary
- [ ] Resume on tab focus
- [ ] No `<audio>` for hits

## Controls / mobile

- [ ] Unified input (keyboard + stick)
- [ ] On-phone stick + actions, ≥44px
- [ ] 390px viewport: no page scroll, no overflow
- [ ] A = left / D = right under chase cam **while moving forward** (if 3D/vehicle)
- [ ] `touch-action: none`

## Engine / tech

- [ ] Engine matches docs/02-engine-selection.md
- [ ] Deps in package.json
- [ ] FORGE kit imported from `src/forge/`
- [ ] dt capped; no setInterval loop
- [ ] Pools for bullets/particles
- [ ] Production build renders; console clean
- [ ] Game share card (`og:type=x:game`, custom og image)

If any box is open, you are not presenting this as done.
