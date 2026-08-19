# Quality bar — definition of done

Northline does not ship “a game loop with a score.” We ship a **session**.

A session has: a title that looks like a title, a world that looks authored, a body that animates, a camera that breathes, hits that hurt, and sound.

---

## Done

A build is done when a stranger can play 60 seconds on a phone and not think “HTML.”

Concrete:

1. **First frame is a title.** Logo or wordmark, one action (“TAP TO START”), no debug overlay. That tap unlocks audio + pointer lock / sensors.
2. **The player is a character, not a collider debug color.** Sprite sheet or 3D mesh. Idle alive. Locomotion cycled.
3. **The world is authored.** Tiles / parallax / lighting. Not a grey quad with a fps meter.
4. **Every verb has a body.** Jump, dash, shoot, boost, place-tower — juice stack + SFX.
5. **Camera is directed.** Lerp, lookahead. Landings punch. Hits trauma.
6. **Touch works** at 390×844. Stick + actions. No horizontal scroll of the page.
7. **Mute, shake, reduced motion** exist.
8. **Production build renders.** Console is clean.

## Not done (fail closed)

- Prototype geometry **as the shipped look**
- One static PNG sliding
- `setInterval(loop, 16)`
- Audio that starts on page load (it will be silent on iOS)
- WASD inverted under a chase cam
- “Looks fine on my desktop preview” with no touch UI

---

## Feel budget (minimum)

| Event | Shake | Hitstop | Particles | SFX | Extra |
|---|---|---|---|---|---|
| Jump | — | — | dust on takeoff | whoosh | stretch |
| Land | tiny | — | dust | thud | squash + camera punch |
| Hit (light) | 0.25 trauma | 2 frames | sparks | tick | flash |
| Hit (heavy) | 0.6–0.8 | 4–6 frames | debris | layered boom | punch + knockback *after* freeze |
| Pickup | — | — | motes | chime | easeOutBack pop + floating +N |
| Death | 0.8 | 6–8 | burst | downer | slow-mo optional, then title |
| Win | — | — | confetti | sting | hold, then results |

If an event on this table does nothing, you are not done.

---

## Reference feel (allowed)

We copy **feel**, not assets:

Celeste, Hollow Knight, Dead Cells, Enter the Gungeon, Hades, Mario Kart 8, Mini Motorways, Crossy Road, Alto’s Odyssey, Smash Hit, Monument Valley, Vampire Survivors, Stardew (for juice of tools/pickups, not for looking like it).

When you start a title, **name one**. “Feels like Alto” is a camera + wind + landing brief. “Make it nice” is how rectangles happen.

---

## Greybox exception

Allowed only if the user said greybox/blockout. Collision, pacing, FOV. **Juice and audio still on.** Greybox without feel trains you to ship dead games.
