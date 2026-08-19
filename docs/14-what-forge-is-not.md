# What FORGE is not

Read this after the victory lap. The board can be all `DONE` and you still do not have a game studio in a folder.

## This repo is

Law, doctrine, copy-paste runtime, engine adapters, recipes, a ship checklist.

It is **not** a title. It does not render a player. It does not contain art, music, levels, or meshes.

## Hard gaps (will not appear by pulling this repo)

### Assets
- No sprite sheets, tilesets, portraits, or UI icon PNGs
- No glTF / characters / karts / weapons
- No music, voice, foley library (only procedural `makeTick`)
- No fonts we licensed
- No VFX meshes, flipbooks beyond “spawn a pooled square”
- Imagine / sprite pipelines live in **Grok Build**, not here

### Production systems
- No level editor, no Tiled project, no spline track tool
- No animation graph / blend trees / Spine / Live2D
- No shader library, no bloom/tonemap preset pack (we *say* bloom; we don’t ship a stack)
- No cinematic / timeline / camera-cut sequencer
- No localization pipeline (string tables, fonts per script)
- No save/cloud, no replay, no ghost races
- No netcode, rollback, anti-cheat, parties, leaderboards
- No IAP, ads, live-ops, season pass, analytics, crash reporter, remote config
- No CI, device lab, automated Golden Path, feel-screenshot diffs
- No haptics / rumble helper
- No FMOD / Wwise project

### Engine reality
- Phaser / three / Rapier / Howler are **not vendored**. Adapters import them in the **game**.
- This repo does not `npm install` an engine. Copy files into a Grok Build app that does.
- Adapters are a boot, not a full character controller, inventory, AI, or navmesh.

### AAA vs this SKU
True AAA mobile (Genshin, COD Mobile, Honor of Kings) is a native/Unity/Unreal org with hundreds of people, custom renderers, live-ops, and a 3D character pipeline. FORGE is the **browser vertical-slice bar**: feel, art discipline, engines that fit Grok Build.

If you wanted Unreal, you are in the wrong building.

### Process
- Grok Build **does not auto-load this repo**. You paste the invoke. Forget it = rectangles.
- No auth’d private “studio brain” that follows every new app unless you say so.
- Checklists are not tests. A=left still has to be *played*.

## What pulling FORGE *does* buy

A new hire (or Grok) is not allowed to ship mute rectangles with a hard-snapped camera and call it v1. That is the whole product of this repository.

Everything else — the actual game — is still a title you build **after** the pull.
