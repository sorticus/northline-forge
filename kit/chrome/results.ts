/**
 * NORTHLINE FORGE — results sheet
 */

import { t } from "../i18n";
import { track, Events } from "../analytics";
import { haptic } from "../haptics";
import { injectChromeStyles, el } from "./style";

export function showResults(
  parent: HTMLElement,
  opts: { win: boolean; detail?: string; onRetry: () => void },
): { destroy: () => void } {
  injectChromeStyles();
  const layer = el("div", "forge-fill");
  layer.dataset.forgeResults = "1";
  const sheet = el("div", "forge-sheet");
  sheet.appendChild(el("p", "forge-title", opts.win ? t("result.win") : t("result.lose")));
  if (opts.detail) sheet.appendChild(el("p", "forge-sub", opts.detail));
  const again = el("button", "forge-btn forge-btn-primary", t("result.retry"));
  again.addEventListener("click", () => {
    haptic("success");
    track(Events.retry);
    layer.remove();
    opts.onRetry();
  });
  sheet.appendChild(again);
  layer.appendChild(sheet);
  parent.appendChild(layer);
  haptic(opts.win ? "success" : "warning");
  track(opts.win ? Events.levelComplete : Events.levelFail);
  return {
    destroy() {
      layer.remove();
    },
  };
}
