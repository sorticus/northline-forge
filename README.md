# NORTHLINE FORGE

**Internal production kit. Not a game. The law.**

Playable is the floor. **Feel** is the product.

```
Studio:     NORTHLINE
Kit:        FORGE
Repo:       github.com/sorticus/northline-forge
Rule:       If it doesn't punch, it doesn't ship.
```

---

## New hire

1. [docs/00-onboarding.md](docs/00-onboarding.md)
2. [docs/18-research.md](docs/18-research.md) — **search comparables before you code**
3. [docs/01-quality-bar.md](docs/01-quality-bar.md)
4. [AGENTS.project.md](AGENTS.project.md)
5. [INVOKE.md](INVOKE.md)

Existing game? [docs/15-prebuilt-audit.md](docs/15-prebuilt-audit.md)  
Stores? [docs/16-app-stores.md](docs/16-app-stores.md)  
Chrome (cog vs lobby)? [docs/17-universal-chrome.md](docs/17-universal-chrome.md)

---

## Grok Build — first message

```text
Pull github.com/sorticus/northline-forge
Copy AGENTS.project.md, skills/pop-games, kit/ → src/forge/.
BEFORE gameplay: docs/18-research.md. Web-search ≥2 comparable shipped games.
Fill ResearchBrief. briefGaps() = []. Write src/forge/research.brief.json.
Steal feel, never IP.
Wire mountSessionChrome + kit/engines.
Follow FORGE. Cheap path is a ship blocker.
Then build: [GENRE] that feels like [REFERENCE GAME]. Setting: [ONE LINE].
```

---

## Non-negotiables

1. Research comparables **before** rectangles.
2. Engine is a decision. 3D → three+Rapier. 2D action → Phaser.
3. Art generated and animated.
4. Juice on every verb. Silent is broken. Camera never hard-snaps.
5. Mobile is the SKU. Chrome family A unless the title has meta.
6. Sim ≠ presentation.

*Northline does not ship HTML toys.*
