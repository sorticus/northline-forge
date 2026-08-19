# Recipe — twin-stick

**Feel like:** Enter the Gungeon (reload as verb, screen kick, bullet clarity)  
**Engine:** Phaser 3, Arcade  
**SKU:** landscape or portrait; left stick move, right stick / button fire

## v1 must

- Hero 4-dir walk sheet (4×4) + idle. Muzzle / projectile / impact as **separate** FX.
- Arena: foundation floor + separate cover props + collision. Spawn ring.
- Twin-stick: move vector ≠ aim vector. Keyboard: WASD move, mouse or IJKL aim.
- Fire: muzzle flash, kick camera opposite shot, pitch-vary shot SFX, pooled bullets.
- Hit: flash, trauma 0.35, hitstop 2–3 frames, sparks.
- Reload or cooldown is a **verb** (animation + click SFX), not a silent timer.
- Rooms / waves: one modifier. Death: burst → run recap, instant retry.

## Juice map

| Verb | Stack |
|---|---|
| Shoot | muzzle, kick, vary SFX, shell particle |
| Enemy hit | flash, sparks, floater, trauma 0.25 |
| Player hit | heavier trauma, brief invuln blink, grunt |
| Pickup | pop, chime, motes |
| Room clear | sting, confetti modest, door unlock tween |

## Fail

- Auto-aim that deletes the stick
- Bullets as unreadable dots on a busy baked JPG
- One static PNG rotated to aim
- Mute machine-gun
