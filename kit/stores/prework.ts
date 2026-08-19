/**
 * NORTHLINE FORGE — store prework as data + a printer
 * This does not submit to Apple. It tells you what you still owe.
 *
 *   console.log(printStorePrework());
 *   markStoreItem("apple.developer", true);
 */

export type StoreItem = {
  id: string;
  store: "apple" | "play" | "both";
  done: boolean;
  blocker: boolean;
  label: string;
};

export const STORE_PREWORK: StoreItem[] = [
  { id: "path.decision", store: "both", done: false, blocker: true, label: "Decide PWA-only vs Play TWA vs bundled Capacitor" },
  { id: "path.no-remote-webview", store: "apple", done: false, blocker: true, label: "Do NOT load a live URL in WKWebView (4.2 reject)" },
  { id: "path.bundle", store: "both", done: false, blocker: true, label: "Game assets bundled in the binary" },
  { id: "apple.developer", store: "apple", done: false, blocker: true, label: "Apple Developer enrolled ($99/yr)" },
  { id: "apple.xcode26", store: "apple", done: false, blocker: true, label: "Mac + Xcode 26 / iOS 26 SDK (since 2026-04-28)" },
  { id: "apple.siwa", store: "apple", done: false, blocker: true, label: "Sign in with Apple if any other social login exists" },
  { id: "apple.delete", store: "apple", done: false, blocker: true, label: "In-app account deletion if accounts exist (5.1.1)" },
  { id: "apple.iap", store: "apple", done: false, blocker: true, label: "Digital goods via StoreKit — not Stripe" },
  { id: "apple.privacy-labels", store: "apple", done: false, blocker: true, label: "Privacy nutrition labels + Privacy Manifest" },
  { id: "play.console", store: "play", done: false, blocker: true, label: "Play Console account" },
  { id: "play.api36", store: "play", done: false, blocker: true, label: "targetSdk 36 (API 36) by 2026-08-31" },
  { id: "play.16kb", store: "play", done: false, blocker: true, label: "Native libs 16KB page-size compatible" },
  { id: "play.data-safety", store: "play", done: false, blocker: true, label: "Data safety form filled from real SDKs" },
  { id: "play.billing", store: "play", done: false, blocker: true, label: "Digital goods via Play Billing" },
  { id: "both.privacy-url", store: "both", done: false, blocker: true, label: "Privacy policy live URL (listing + in-app)" },
  { id: "both.iarc", store: "both", done: false, blocker: true, label: "IARC / age questionnaire answered honestly" },
  { id: "both.listing", store: "both", done: false, blocker: true, label: "Icon, screenshots, support URL, Game category" },
  { id: "both.orientation", store: "both", done: false, blocker: false, label: "Orientation lock + safe area + haptics (native value)" },
];

const state = new Map<string, boolean>();

export function markStoreItem(id: string, done: boolean): void {
  state.set(id, done);
}

export function storeItems(): StoreItem[] {
  return STORE_PREWORK.map((i) => ({ ...i, done: state.get(i.id) ?? i.done }));
}

export function printStorePrework(): string {
  const items = storeItems();
  const open = items.filter((i) => !i.done);
  const blockers = open.filter((i) => i.blocker);
  const lines = [
    `Store prework: ${items.length - open.length}/${items.length} done, ${blockers.length} blockers open`,
    ...items.map((i) => `${i.done ? "[x]" : i.blocker ? "[!]" : "[ ]} ${i.id}  ${i.label}`),
  ];
  const text = lines.join("\n");
  console.info(text);
  return text;
}

export function storeReady(which: "apple" | "play"): boolean {
  return storeItems()
    .filter((i) => i.blocker && (i.store === "both" || i.store === which))
    .every((i) => i.done);
}
