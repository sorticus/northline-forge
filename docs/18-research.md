# Research before you build

You do not know how Celeste dash works because you are confident. You know because you **looked it up**. Guessing “platformer juice” is how we ship rectangles with a dash button.

Grok cannot *play* the reference. It **can** search: design write-ups, GDC talks, frame-data posts, control schemes, HUD breakdowns, “how X feel works.” That is required. Memory is not research.

## When

**After** FORGE is copied. **Before** `src/` gameplay. Same session. Do not scaffold, then “research later.”

Prebuilt once-over: research is lighter — you already have a loop. Still name 1–2 comparables for the *feel patch*.

## What you are stealing

Timing, camera, juice, input buffering, session shape, HUD **family**.  
**Never:** characters, names, logos, music, level layouts, UI chrome traced from screenshots, voice, story beats.

If the comparable is 3D, you do not “research” a Canvas 2D clone. Engine table still wins.

## Procedure (blocking)

1. Parse the ask into **genre + topic + one primary reference**. If the user didn’t name a reference, pick one from `docs/13-reference-feel.md` and **say it**.
2. **Web search** at least:
   - `[primary] game feel hitstop coyote camera`
   - `[genre] mobile controls HUD`
   - `[topic] games similar` (topical — storms, karts, archives, …)
   - One more: a *second* shipped title in the same verb (Celeste → Meat Boy / Hollow Knight, not “New Super Mario”)
3. Fill `ResearchBrief` (`kit/research.ts`). Need **≥2 real comparables**, each with steal / never / loop / controls / camera / juice.
4. `briefGaps(brief)` must be `[]`. Write `src/forge/research.brief.json`.
5. Tell the user **six lines**, then build:
   - Primary + 2 comparables
   - What we steal (feel)
   - What we will not copy (IP)
   - Engine + chrome family
   - v1 loop
   - Out of scope
6. **Then** engine boot + `mountSessionChrome`.

If search fails, say so and use `docs/13` plus the recipe file. Do not invent fake “player reports.”

## Topical ≠ skin

“Brisbane storms” is not a palette on Celeste. Research how other games treat **weather as a verb** (wind, visibility, timing windows) *and* the genre feel. Topic modifies the loop; it does not replace it.

## Fail

- Zero searches, “I know Celeste”
- One comparable
- Steal list is “it’s tight and juicy”
- Comparables are only AAA live-ops when v1 is a session climber (wrong chrome family)
- Copying a screenshot HUD
