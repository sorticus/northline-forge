# Recipe — tower defense

**Feel like:** Kingdom Rush (place-punch, death juice, readable path)  
**Engine:** Phaser 3  
**SKU:** portrait; tap to select pad, tap to place. No stick required, fat buttons.

## v1 must

- Scene map: foundation path + **separate** build pads (not painted into the JPG).
- Path metadata + spawn / exit hooks. Creeps follow the path, pooled.
- 2 tower types in v1. Projectile / beam FX sheets. Place = easeOutBack pop + thud + dust.
- Sell / upgrade: designed sheet, not `window.confirm`.
- Wave banner, lives, gold — HUD tokens.
- Creep death: burst, coins arc to HUD (tween), chime.
- Defeat / victory screens, not `alert()`.

## Juice map

| Verb | Stack |
|---|---|
| Place | pop, dust, thud |
| Shot | muzzle/beam, impact spark |
| Kill | burst, coin fly, +N floater |
| Leak (life lost) | trauma 0.4, sting down |
| Wave start | banner, drum |

## Fail

- Baked painting as the only map (can’t place, can’t path)
- Towers as emoji
- Mute
- Desktop hover-only placement with no tap path
