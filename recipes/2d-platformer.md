# Recipe — 2D platformer

**Feel like:** Celeste (dash, land squash, hair/trail, precise jump)  
**Engine:** Phaser 3, Arcade physics  
**SKU:** portrait or landscape; stick + jump + dash

## Must ship in v1

- Hero sheets: idle, run, jump, dash (body). Dust / slash as FX sheets.
- One authored stage: parallax sky/far/mid + **separate** platforms + spikes + spawn.
- Coyote time (~80ms), jump buffer (~100ms), variable jump (cut vy on release).
- Dash with freeze-frames and afterimage (juice), not a teleport.
- Land: squash + dust + thud + tiny camera punch.
- Death: burst + trauma + short hold → respawn at checkpoint (no lecture).
- Touch: stick + jump + dash. Keyboard WASD/arrows + J/K.

## Juice map

| Verb | Stack |
|---|---|
| Jump | stretch, whoosh |
| Land | squash, dust, punch, thud |
| Dash | hitstop 2 frames, trail particles, camera kick |
| Hit | flash, trauma 0.4, knockback after freeze |
| Crystal / coin | pop, floater, chime |
| Respawn | white flash, muted thud |

## Fail

- One rectangle, arrow keys, no dash
- Background JPG with platforms painted in (un-editable, un-collidable)
- Camera = player.x
- Mute
