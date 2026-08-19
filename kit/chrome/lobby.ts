/**
 * NORTHLINE FORGE — Family B chrome (F2P lobby)
 * Use ONLY if the title has meta (account, shop, season).
 * Cog top-right, profile immediately left of cog, Play CTA center-low,
 * currency top-left. Safe-area. Profile/shop are hooks — wire or they no-op.
 *
 * This is the pattern you remembered. It is not the default.
 */

import { audio } from "../audio";
import { installDefaultSfx } from "../sfx-proc";
import { track, Events } from "../analytics";
import { haptic } from "../haptics";
import { injectChromeStyles, el } from "./style";

export type LobbyHooks = {
  title: string;
  currencyLabel?: string;
  onPlay: () => void;
  onProfile?: () => void;
  onSettings?: () => void;
  onShop?: () => void;
};

export function mountLobbyChrome(parent: HTMLElement, hooks: LobbyHooks): { destroy: () => void; root: HTMLElement } {
  injectChromeStyles();
  parent.style.position ||= "relative";
  const root = el("div", "forge-root");
  root.dataset.forgeChrome = "family-b";
  parent.appendChild(root);

  const currency = el("div", "forge-icon");
  currency.style.position = "absolute";
  currency.style.top = "max(10px, env(safe-area-inset-top))";
  currency.style.left = "max(10px, env(safe-area-inset-left))";
  currency.style.width = "auto";
  currency.style.padding = "0 12px";
  currency.style.pointerEvents = "none";
  currency.textContent = hooks.currencyLabel ?? "0";
  root.appendChild(currency);

  const tr = el("div", "forge-hud-tr");
  const profile = el("button", "forge-icon", "☺");
  profile.setAttribute("aria-label", "Profile");
  profile.addEventListener("click", () => hooks.onProfile?.());
  const cog = el("button", "forge-icon", "⚙");
  cog.setAttribute("aria-label", "Settings");
  cog.addEventListener("click", () => hooks.onSettings?.());
  tr.appendChild(profile);
  tr.appendChild(cog);
  root.appendChild(tr);

  const center = el("div", "forge-fill");
  center.style.background = "transparent";
  center.style.flexDirection = "column";
  center.style.justifyContent = "flex-end";
  center.style.paddingBottom = "max(28px, env(safe-area-inset-bottom))";
  const name = el("p", "forge-title", hooks.title);
  name.style.textShadow = "0 2px 12px #000";
  const play = el("button", "forge-btn forge-btn-primary", "PLAY");
  play.style.minWidth = "220px";
  play.style.minHeight = "56px";
  play.style.fontSize = "18px";
  play.addEventListener("click", () => {
    audio.unlock();
    installDefaultSfx();
    haptic("medium");
    track(Events.tapToStart);
    hooks.onPlay();
  });
  const shop = el("button", "forge-btn", "Shop");
  shop.addEventListener("click", () => hooks.onShop?.());
  center.appendChild(name);
  center.appendChild(play);
  if (hooks.onShop) center.appendChild(shop);
  root.appendChild(center);

  return {
    root,
    destroy() {
      root.remove();
    },
  };
}
