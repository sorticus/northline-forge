# Invoke protocol

Grok Build does **not** auto-load this repo. You load it. Every new game. First message.

## Standard invoke

```text
Pull github.com/sorticus/northline-forge
Copy AGENTS.project.md to the project root.
Copy skills/pop-games into the project skill path.
Copy kit/ into src/forge/ and wire them (including kit/engines for the chosen engine).
Follow FORGE standing orders. Cheap path is a ship blocker.
Then build: [GENRE] that feels like [REFERENCE GAME]. Setting: [ONE LINE].
```

One-liners: [prompts/genre-cards.md](prompts/genre-cards.md)

## Examples

```text
Pull github.com/sorticus/northline-forge and follow FORGE.
Then build: 2D pixel platformer that feels like Celeste. Setting: storm-lit coastal cliffs, a courier with a dash.
```

```text
Pull github.com/sorticus/northline-forge and follow FORGE.
Then build: 3D stylized kart racer that feels like Mario Kart 8. Setting: neon harbour at dusk, 3 laps, 8 racers.
```

```text
Pull github.com/sorticus/northline-forge and follow FORGE.
Then build: top-down twin-stick that feels like Enter the Gungeon. Setting: subterranean archive, one weapon, cursed rooms.
```

## Agent: what “pull” means

1. `git clone --depth 1 https://github.com/sorticus/northline-forge.git` into a **side folder** (not over the app).
2. Or GitHub: read `AGENTS.project.md`, `skills/pop-games/SKILL.md`, and `kit/**`.
3. Copy those into the running app project (`src/forge/`).
4. Install the engine from `docs/02-engine-selection.md`. Use `kit/engines/*`.
5. **Then** scaffold / build. Never build first and “add juice later” as a promise.

If clone fails, use the GitHub connection to read the same files. Do not skip FORGE because git was inconvenient.
