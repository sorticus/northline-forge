# Recipe — endless runner

**Feel like:** Alto’s Odyssey (land squash, wind, camera breathe) or Canabalt (leap, rumble)  
**Engine:** Phaser 3 (side) **or** R3F if true 3D slice-of-world  
**SKU:** portrait tap-to-jump, or two buttons (jump / dive)

## v1 must

- Parallax: sky / far / mid / near. Platforms **separate** with collision.
- Hero: idle-run-jump sheets. Dust on land. Stretch on jump.
- Speed ramps. Obstacles pooled. Coins / gems with pop.
- One tap = jump (buffer + coyote). Optional dive / slide.
- World chunks streamed; do not spawn infinite unreclaimed sprites.
- Death: trauma + hold + instant retry. Distance is the score.
- Wind / cloth / scarf if Alto-like — even a 3-bone trail reads expensive.

## Juice map

| Verb | Stack |
|---|---|
| Jump | stretch, whoosh |
| Land | squash, dust, punch, thud (the whole game) |
| Coin | pop, chime, floater |
| Near-miss | tiny trauma, whoa SFX |
| Crash | heavy trauma, hitstop, debris |

## Fail

- Flat color platforms, no parallax
- Speed that tunnels through colliders (cap dt, thicken)
- No land squash — runners without landings feel like a screensaver
