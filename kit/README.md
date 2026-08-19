# FORGE kit — copy into `src/forge/`

This folder is **code**. Docs are briefs. If it isn’t imported, it doesn’t ship.

## One-call session (Family A — default)

```ts
import { Juice, mountSessionChrome, mountTouch, attachKeyboard, registerAudit, runAudit } from "@/forge";

const juice = new Juice();
const chrome = mountSessionChrome(appRoot, {
  juice,
  title: "TIDECALL",
  onStart() { /* start sim */ },
  onRetry() { /* reset run */ },
});
attachKeyboard();
mountTouch(appRoot);

registerAudit({
  engine: "phaser",
  juiceWired: true,
  cameraLerps: true,
  audioUnlockOnTap: true,
  sfxOnVerbs: true,
  generatedArt: true,
  playerAnimated: true,
  touchControls: true,
  dtCapped: true,
});
// debug: runAudit()
```

Skip sim while `chrome.paused`. Esc / P / the ⚙ (top-right, safe-area) toggles pause. Settings sliders persist and drive audio/shake/haptics.

**F2P lobby only if you have meta:** `mountLobbyChrome` — profile left of cog, Play center-low.

## Modules (all TypeScript)

| File | You call it |
|---|---|
| `time.ts` `juice.ts` `camera.ts` `particles.ts` | every frame / every hit |
| `audio.ts` `sfx-proc.ts` | unlock + `installDefaultSfx()` |
| `input.ts` `touch.ts` | `poll()` / `mountTouch` |
| `haptics.ts` `save.ts` `i18n.ts` `settings.ts` | persist + rumble + copy |
| `chrome/session.ts` | title, pause, settings, ⚙ |
| `chrome/lobby.ts` | Family B |
| `chrome/results.ts` | win/lose sheet |
| `audit.ts` | `runAudit()` → PASS/PATCH/REBUILD |
| `stores/prework.ts` | `printStorePrework()` / `storeReady("apple")` |
| `engines/*` | Phaser / R3F / canvas boots (need those deps) |

## Still not in this folder

Art, music, glTF, Xcode, a signed IPA. `stores/capacitor.config.example.json` is a copy target, not a built app.
