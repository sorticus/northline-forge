# NORTHLINE FORGE

**Internal production kit. Not a game. Not a prototype folder. The law.**

You are not here to make a canvas demo. You are here to ship something that punches.

If a player can tell this was made in a weekend HTML jam, you failed the build. Playable is the floor. **Feel** is the product.

```
Studio:     NORTHLINE
Kit:        FORGE
Repo:       github.com/sorticus/northline-forge
Rule:       If it doesn't punch, it doesn't ship.
```

---

## What this is

A portable quality pack you load **before** you build — or when you **once-over** a prebuilt title.

- Standing orders that **forbid** the cheap path
- Runtime: juice, audio, camera, time, input, haptics, save, i18n, settings
- Engine adapters (Phaser, R3F+Rapier+bloom, Canvas puzzles)
- Art / mobile / a11y doctrine
- Genre recipes
- **Prebuilt audit** (patch, don’t always rebuild)
- **App Store / Play prework** (wrapping a URL will get you rejected)
- **Chrome doctrine** — what’s universal vs F2P-lobby bias

Overlay onto a Grok Build app. **Do not clone this repo over the app scaffold.**

Gaps we will not pretend to fill: [docs/14-what-forge-is-not.md](docs/14-what-forge-is-not.md)

---

## New hire — read this first

1. [docs/00-onboarding.md](docs/00-onboarding.md)
2. [docs/01-quality-bar.md](docs/01-quality-bar.md)
3. [AGENTS.project.md](AGENTS.project.md)
4. [docs/17-universal-chrome.md](docs/17-universal-chrome.md) — read this before you put a cog on everything
5. [INVOKE.md](INVOKE.md)

Existing game? [docs/15-prebuilt-audit.md](docs/15-prebuilt-audit.md)  
Stores? [docs/16-app-stores.md](docs/16-app-stores.md)

---

## Grok Build — invoke

**New title:**

```text
Pull github.com/sorticus/northline-forge
Copy AGENTS.project.md to the project root.
Copy skills/pop-games into the project skill path.
Copy kit/ into src/forge/ and wire them (including kit/engines).
Follow FORGE standing orders. Cheap path is a ship blocker.
Then build: [GENRE] that feels like [REFERENCE GAME]. Setting: [ONE LINE].
```

**Once-over (prebuilt):**

```text
Pull github.com/sorticus/northline-forge and follow FORGE.
Do NOT scaffold a new game.
Audit with docs/15-prebuilt-audit.md. Patch in place.
```

---

## Non-negotiables

1. Engine is a decision. 3D → three+Rapier. 2D action → Phaser. Puzzles may stay canvas **with** juice+art+audio.
2. Art is generated and animated.
3. Juice on every meaningful action.
4. Silent is broken.
5. Camera never hard-snaps.
6. Mobile is the SKU.
7. Sim ≠ presentation.
8. Chrome family is **session (A)** unless the title is actually live-ops.

*Northline does not ship HTML toys.*
