# What FORGE is not

The board can be all `DONE` and you still do not have a game studio in a folder.

## This repo is

Law, doctrine, copy-paste runtime, engine adapters, recipes, audits, store **prework**.

It is **not** a title. It does not contain art, music, levels, or meshes. It does not submit to Apple.

## Still missing (will not appear by pulling)

### Assets (Grok Build / Imagine, not Git)
- Sprite sheets, tilesets, portraits, icon PNGs
- glTF / characters / karts / weapons
- Music, voice, licensed fonts, FMOD projects
- VFX flipbooks beyond pooled quads

### Production systems we will not pretend to be
- Level editor, Tiled project, spline tracks
- Spine / Live2D / blend trees
- Cinematic sequencer
- Cloud save, replay, ghosts
- Netcode, rollback, anti-cheat, parties, leaderboards
- IAP storefront, ads, live-ops, battle pass, remote config
- CI, device lab, screenshot diffs
- Native Xcode/Android Studio projects

### Engine reality
- Phaser / three / Rapier / Howler / postprocessing are **not vendored**
- Copy adapters into a game that `npm i` them
- Boots ≠ full character controller / navmesh / inventory / AI

### Stores
- No Apple/Google account, no signed binary, no privacy policy URL we host
- See [16-app-stores.md](16-app-stores.md). Wrapping a live URL is an Apple 4.2 reject.

### AAA
Genshin-class is a different industry. FORGE is the browser vertical-slice bar.

### Process
- Grok Build does **not** auto-load this repo
- Checklists are not tests

## What we *did* add so “missing” is smaller

| Gap | Where |
|---|---|
| Haptics | `kit/haptics.ts` |
| Save (local, versioned) | `kit/save.ts` |
| Strings / i18n | `kit/i18n.ts` |
| Analytics stub (no-op sink) | `kit/analytics.ts` |
| Settings blob | `kit/settings.ts` |
| Procedural SFX bank | `kit/sfx-proc.ts` |
| R3F bloom/vignette | `kit/engines/r3f-post.tsx` |
| Prebuilt once-over | [15-prebuilt-audit.md](15-prebuilt-audit.md) |
| Store prework | [16-app-stores.md](16-app-stores.md) |
| Chrome / HUD conventions + bias | [17-universal-chrome.md](17-universal-chrome.md) |

## What pulling FORGE buys

A new hire is not allowed to ship mute rectangles with a hard-snapped camera and call it v1. That’s the product of this repository. The title is still a game you build after the pull.
