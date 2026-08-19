# Invoke protocol

Grok Build does **not** auto-load this repo. You load it.

## New title

```text
Pull github.com/sorticus/northline-forge
Copy AGENTS.project.md to the project root.
Copy skills/pop-games into the project skill path.
Copy kit/ into src/forge/ and wire them (including kit/engines for the chosen engine).
Follow FORGE standing orders. Cheap path is a ship blocker.
Then build: [GENRE] that feels like [REFERENCE GAME]. Setting: [ONE LINE].
```

One-liners: [prompts/genre-cards.md](prompts/genre-cards.md)

## Once-over (prebuilt)

```text
Pull github.com/sorticus/northline-forge and follow FORGE.
Do NOT scaffold a new game.
Audit the existing title with docs/15-prebuilt-audit.md.
Patch in place. Report verdict, worst 3, next patch.
```

## Agent: what “pull” means

1. `git clone --depth 1 https://github.com/sorticus/northline-forge.git` into a **side folder**.
2. Copy `AGENTS.project.md`, `skills/pop-games`, `kit/` into the app (`src/forge/`).
3. **New title:** then scaffold. **Prebuilt:** then audit. Never rebuild as a reflex.
4. Stores: only if asked — `docs/16-app-stores.md`. Never wrap a remote URL.

If clone fails, use the GitHub connection. Do not skip FORGE because git was inconvenient.
