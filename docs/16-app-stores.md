# App Store / Play Store — prework

Northline titles start as **browser games** (Grok Build → web + PWA).  
**Add to Home Screen is not the App Store.** Stores are a separate product, a separate company, and a pile of law.

Do not wrap a live Vercel URL in a WebView and submit it. Apple will 4.2 you.

Sources (verify before a real submission — this moves):  
[Apple Review Guidelines](https://developer.apple.com/app-store/review/guidelines/) · [Upcoming Apple requirements](https://developer.apple.com/news/upcoming-requirements/) · [Play target API](https://support.google.com/googleplay/android-developer/answer/11926878) · [Play Data safety](https://support.google.com/googleplay/android-developer/answer/10787469)

---

## 0. Honest path table

| Path | iOS App Store | Google Play | Fit for FORGE web games |
|---|---|---|---|
| Web + PWA / A2HS | No | No | **Default.** Already how Grok preview/PWA works. |
| Play **TWA** (Trusted Web Activity, Bubblewrap) | No | Yes, if it looks like an app | Best Android path for a *good* PWA. |
| **Capacitor** (or similar), **assets bundled** | Maybe | Yes | Only if the binary contains the game, not `src="https://…"`. |
| Remote WKWebView / “thin wrapper” | **Reject 4.2 / 4.2.2** | Risky | Do not. |
| Unity / native rebuild | Yes | Yes | Different studio. Not this repo. |

Apple **4.2 Minimum Functionality**: the app must be more than a repackaged website. A WKWebView that just loads your production URL is the classic reject.

If you wrap: **bundle** the build into the binary, add native chrome (haptics, Game Center / Play Games optional, safe-area, orientation lock, offline boot). Then it is an HTML5 game app, not a bookmark.

---

## 1. Accounts & money (do this before engineering)

| | Apple | Google |
|---|---|---|
| Dev program | Apple Developer **$99/year** (org: DUNS) | Play Console (fee; verify current) |
| Paid apps / IAP cut | StoreKit. Digital goods **must** use IAP. No Stripe for coins/skins on iOS. Restore purchases. Loot-box odds disclosed. | Play Billing for digital goods. |
| Identity | If you offer Google / X / other social login, **Sign in with Apple is required** (Guideline 4.8). | No equivalent mandate, but Data safety still applies. |
| Accounts | If users can **create** an account, they must **delete** it **in-app** (5.1.1). Privacy policy must describe deletion. | Account deletion expected; Families/Kids stricter. |

Grok Build default auth is Google + X. **Wrapping that as-is without Sign in with Apple is an iOS reject.**

No IAP in v1 is a valid Northline choice. Then do not sell coins through a website from the iOS client either (3.1.1).

---

## 2. Privacy (both stores, blocking)

- Public **privacy policy URL** (listing + in-app)
- Apple **privacy nutrition labels** (App Store Connect) — include third-party SDKs (auth, analytics, ads)
- Apple **Privacy Manifest** (`PrivacyInfo.xcprivacy`) for your app and SDKs
- **App Tracking Transparency** if you track across apps/sites (IDFA)
- Google Play **Data safety** form (collection, sharing, encryption, deletion)
- Analytics is not free. Turning on `kit/analytics.ts` against a real sink **changes your store forms**. Default sink is a no-op for this reason.

Kids / under-13: COPPA, Families policy, almost no tracking, parental gate on spend. Do not “accidentally” ship a kids skin with GA4.

---

## 3. Ratings & content

- **IARC** questionnaire (Play). Apple age rating questionnaire. Answer *honestly* (violence, fear, IAP, user-gen, gambling).
- Gambling / real-money: licensed + geo — not a Northline v1.
- Loot boxes: disclose odds (Apple 3.1.1).
- User-generated + chat: moderation, report, block, age gate (4.7 / UGC rules).

---

## 4. 2026 platform baselines (as of this writing)

**Apple (since 28 Apr 2026):** uploads must be **Xcode 26+** and **iOS 26 SDK**. Mac required to *submit*. Encryption export questionnaire (HTTPS-only usually exempt). 64-bit.

**Google Play (31 Aug 2026):** new apps and **updates** target **Android 16 / API 36**. Existing un-updated apps must hit API 35 or they vanish for new users on new devices. Extension possible to 1 Nov 2026.

**16 KB page size:** native libs must support 16 KB pages (Play, 2026). Capacitor/Android plugin versions matter. Pure JS in a WebView is usually fine; old native plugins are not.

---

## 5. Store listing (the “are you a real product” pack)

Both stores, before you press Submit:

- App name, subtitle, description, keywords (no competitor trademark stuffing)
- Icon 1024² (Apple), Play adaptive icon
- Screenshots per device size (phone, tablet if you support it)
- Preview video (optional, helps)
- Support URL + privacy URL + marketing URL
- Contact email
- Content rating complete
- **Game** category, not Utilities
- Northline web titles already want `og:type=x:game` for *social* cards. That is **not** a store listing.

---

## 6. Prework checklist (before anyone opens Xcode)

- [ ] Decide: **PWA only** vs **Play TWA** vs **Capacitor both**
- [ ] If iOS: Apple Developer enrolled; Mac + Xcode 26
- [ ] If iOS + social login: Sign in with Apple designed and implemented
- [ ] If accounts: in-app delete, revoke social, confirm email
- [ ] Privacy policy live on a stable URL
- [ ] IAP decision: none, or StoreKit + Play Billing (never web checkout for digital on iOS)
- [ ] Orientation lock + safe area + haptics (native value)
- [ ] Game **bundled** in the binary (not a remote-only WebView)
- [ ] Data safety / nutrition labels drafted from actual SDKs
- [ ] IARC / age questionnaire answered
- [ ] Account deletion tested on a TestFlight / internal track build
- [ ] No “Created with …” overlays that imply a template mill if you can help it (spam 4.3)

---

## 7. What Grok Build will not do for you

- Pay Apple $99
- Run Xcode
- Pass 4.2 for a thin wrapper
- Invent a privacy policy that matches reality
- Submit the binary

FORGE documents the **product** so a wrap is even possible. The store is still a human with a credit card and a Mac.
