# Chrome — what’s actually universal (and what is your bias)

You asked: cog top-right, profile next to it, menu in the middle of the home page. Are those universal?

**No.** That’s a **mobile F2P / live-ops lobby**. Clash, Brawl Stars, COD Mobile, Genshin, Monopoly Go. It is a real pattern. It is not “all games.”

Celeste has no profile. Hollow Knight has no cog on a home page. Mario Kart’s pause is a Nintendo list. A Steam pixel platformer is often Play / Options / Quit centered, no avatar.

If we stamp a gacha lobby on a Celeste-like, we look like a clone mill. **Genre picks the chrome.**

---

## 0. Three families (pick one)

| Family | Home | Settings | Identity | Examples |
|---|---|---|---|---|
| **A. Session / premium** | Title → TAP TO START → into the game. Pause is the menu. | Pause → Settings. Gear **or** listed item. | None, or a name field. No avatar economy. | Celeste, Hades, Alto, most FORGE v1 |
| **B. Mobile F2P lobby** | 3D/2D **character in the middle**. Play/fight CTA center-low. | **Cog top-right** (safe-area). | **Avatar/profile top-right** beside cog. Shop, battle pass, news around the frame. | Clash, Genshin, COD Mobile |
| **C. Desktop / Steam** | List or stacked buttons. Mouse hover. Esc = pause. | Gear or “Options” in the list. Keyboard-first. | Optional, often Steam overlay. | Most PC indies |

Northline **default is A** unless the recipe is live-ops (it isn’t in v1).  
If the producer explicitly wants a live-service lobby, use B — and admit you are building meta, not “a platformer with a cog.”

---

## 1. Actually universal (almost every game, mobile *and* desktop)

These are not fashion. Skip them and QA will write you up.

### Session
- **One primary verb** on the first screen: Play / TAP TO START. Not six modes.
- **Pause exists** and is reachable **in one tap/key** (Esc, P, or a pause control that thumbs can hit).
- **Resume / Retry / Settings / Quit** from pause. Destructive quit **confirms**.
- **Retry is fast.** Death → burst → replay. No 40s lecture.
- **Don’t trap** the player in a modal. Back/close is consistent (X top-right **or** back-left — pick one per title and never mix).
- Dim the world behind pause (~50–70%). Tap dim = cancel **unless** it’s a store (then only X).

### Audio / feel
- First gesture **unlocks audio**. Title exists for this.
- Settings always: **master, music, SFX, mute**.
- **Shake** and **reduced motion** exist. Haptics toggle on phones.
- Language / strings through `t()` — no text painted into PNGs.

### Layout / input
- **Safe area.** Cogs not under the notch or home indicator.
- HUD **does not eat the playfield.** Corners for persistent readouts; center is for the world (unless a lobby).
- Touch **≥ 44px**. Desktop: hover + click + keyboard. **Same actions.**
- Pause control **does not sit under** the virtual stick.
- Confirm **purchases and wipes**. Don’t confirm “resume.”

### Information
- Show **what they need this second** (hp, ammo, timer). Hide the rest until it matters.
- Contrast on a moving background (plate / outline). No grey-on-grey.
- Score/progress **readable at arm’s length**.

### Flow
- FTUE teaches **one verb**, then gets out. No 12-step slideshow before the first jump.
- Settings **preview** (volume ticks while sliding).
- Default focus on the primary CTA. Gamepad/keyboard: don’t lose the selector.

---

## 2. Strong conventions — not laws (use when they fit)

| Control | Common place | When it’s wrong |
|---|---|---|
| Pause | Top-right, inset for safe-area, **or** start/select | Over the stick; 12px; during a one-tap runner that uses the whole screen (then use a corner **and** a hardware/back pause) |
| Settings | Cog **inside pause**, or cog top-right on lobby | Cog on a twitch HUD that already has 8 icons |
| Profile / avatar | F2P lobby top-right **next to** cog | Premium session games. You invented an account. |
| Play CTA | Center or center-low, biggest control | Equal-weight shop button beside it |
| Currency | Top-left or top-right, always-visible in F2P | Premium game with no shop |
| Back | Top-left arrow (iOS muscle memory) **or** Android system back | Mixing X and back randomly |
| Close modal | X top-right of the **sheet**, not the screen | Tiny X in a busy illustration |
| Shop | Bag / cart, F2P only | A Celeste-like |
| News / events | Inbox/exclamation, F2P | Same |
| Daily reward | Center modal on boot, F2P | Punishing the first launch of a premium game |

**Mobile F2P lobby (family B) — if that’s the product:**

- Character / mode **center**
- **Fight/Play** center-low, dominant
- **Cog top-right**, **profile immediately left of cog** (your instinct — valid **here**)
- Shop / chests / pass along the **bottom or left rail**
- Currency **top-left**
- Safe-area padding on all four corners
- Never put spend CTAs under the thumb-stick of a gameplay HUD — lobby and HUD are different screens

That is **genre literacy**, not universal truth.

---

## 3. Desktop extras (when the SKU includes pointer + keyboard)

- Esc pause. Settings have **key rebind** if you are not 100% WASD-fixed.
- Windowed / fullscreen.
- Mouse sensitivity if look-camera.
- Don’t require a virtual stick on a 27" monitor (hide touch chrome when no touch).
- Hover states. Cursors. The FORGE web preview is a desktop until a thumb hits it — **design both**.

---

## 4. Bias check (read this when you argue about a cog)

Ask: **does this title have a meta (account, collection, shop, season)?**

- **No** → Family A. Title art, TAP TO START, pause stack. A cog on the HUD is optional; a cog **in pause** is enough.
- **Yes** → Family B. Your cog + profile + center character is correct. Own it.

If you put a profile button on a 3-level platformer, you are not “following best practice.” You are dragging Clash of Clans onto Celeste because that’s what your thumb remembers.

---

## 5. Minimum chrome for every FORGE title (A)

1. Title / TAP TO START  
2. Pause (reachable) → Resume, Retry, Settings, Quit  
3. Settings: audio buses, shake, haptics, reduced motion  
4. HUD: only in-run readouts  
5. Results: win/lose + Play again  
6. Touch: stick + actions **or** genre-appropriate (tap-to-jump) — not a lobby rail

Ship that. Add a lobby when you have a live-ops design, not as a reflex.
