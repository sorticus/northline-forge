/**
 * NORTHLINE FORGE — Family A chrome (session / premium)
 * Title → TAP TO START, HUD pause cog (top-right, safe-area),
 * pause sheet (Resume / Retry / Settings / Quit+confirm), settings sliders.
 *
 *   const chrome = mountSessionChrome(root, { juice, title: "TIDECALL", onStart, onRetry, onQuit });
 *   // loop: if (chrome.paused) skip sim
 *   // Esc / poll().pause → chrome.togglePause()
 */

import { audio } from "../audio";
import { installDefaultSfx } from "../sfx-proc";
import { t } from "../i18n";
import { applySettings, defaultSettings, settingsSave, type Settings } from "../settings";
import { track, Events } from "../analytics";
import { haptic } from "../haptics";
import type { Juice } from "../juice";
import { injectChromeStyles, el } from "./style";

export type SessionChromeHooks = {
  juice: Juice;
  title: string;
  subtitle?: string;
  onStart: () => void;
  onRetry: () => void;
  onQuit?: () => void;
};

export type SessionChrome = {
  paused: boolean;
  started: boolean;
  settingsOpen: boolean;
  togglePause: () => void;
  pause: () => void;
  resume: () => void;
  destroy: () => void;
  root: HTMLElement;
};

function slider(label: string, value: number, on: (v: number) => void): HTMLElement {
  const row = el("div", "forge-row");
  row.appendChild(el("span", "", label));
  const input = document.createElement("input");
  input.type = "range";
  input.min = "0";
  input.max = "100";
  input.value = String(Math.round(value * 100));
  input.addEventListener("input", () => on(Number(input.value) / 100));
  row.appendChild(input);
  return row;
}

function toggle(label: string, value: boolean, on: (v: boolean) => void): HTMLElement {
  const row = el("div", "forge-row");
  row.appendChild(el("span", "", label));
  const btn = el("button", "forge-btn", value ? "ON" : "OFF");
  btn.style.minHeight = "36px";
  btn.style.width = "72px";
  btn.addEventListener("click", () => {
    const next = btn.textContent !== "ON";
    btn.textContent = next ? "ON" : "OFF";
    on(next);
  });
  row.appendChild(btn);
  return row;
}

export function mountSessionChrome(parent: HTMLElement, hooks: SessionChromeHooks): SessionChrome {
  injectChromeStyles();
  parent.style.position ||= "relative";

  const root = el("div", "forge-root");
  root.dataset.forgeChrome = "family-a";
  parent.appendChild(root);

  let paused = false;
  let started = false;
  let settingsOpen = false;
  let unbindA11y: (() => void) | null = null;
  let settings: Settings = { ...settingsSave.load() };
  const apply = () => {
    unbindA11y?.();
    unbindA11y = applySettings(settings, hooks.juice);
    settingsSave.write(settings);
  };
  apply();

  const hud = el("div", "forge-hud-tr");
  const pauseBtn = el("button", "forge-icon", "⚙");
  pauseBtn.setAttribute("aria-label", t("hud.pause"));
  pauseBtn.style.display = "none";
  pauseBtn.addEventListener("click", () => api.togglePause());
  hud.appendChild(pauseBtn);
  root.appendChild(hud);

  const titleLayer = el("div", "forge-fill");
  titleLayer.dataset.forgeTitle = "1";
  const tSheet = el("div", "forge-sheet");
  tSheet.appendChild(el("p", "forge-title", hooks.title));
  tSheet.appendChild(el("p", "forge-sub", hooks.subtitle ?? t("title.tap")));
  const start = el("button", "forge-btn forge-btn-primary", t("title.tap"));
  start.addEventListener("click", () => {
    audio.unlock();
    installDefaultSfx();
    haptic("light");
    track(Events.tapToStart);
    started = true;
    titleLayer.remove();
    pauseBtn.style.display = "grid";
    hooks.onStart();
  });
  tSheet.appendChild(start);
  titleLayer.appendChild(tSheet);
  root.appendChild(titleLayer);

  const pauseLayer = el("div", "forge-fill");
  pauseLayer.style.display = "none";
  pauseLayer.dataset.forgePause = "1";
  const pSheet = el("div", "forge-sheet");
  pSheet.appendChild(el("p", "forge-title", t("pause.title")));
  const stack = el("div", "forge-stack");
  const mk = (label: string, cls: string, fn: () => void) => {
    const b = el("button", `forge-btn ${cls}`, label);
    b.addEventListener("click", fn);
    stack.appendChild(b);
    return b;
  };
  mk(t("pause.resume"), "forge-btn-primary", () => api.resume());
  mk(t("pause.retry"), "", () => {
    api.resume();
    hooks.onRetry();
    track(Events.retry);
  });
  mk(t("pause.settings"), "", () => openSettings());
  let confirming = false;
  const quitBtn = mk(t("pause.quit"), "forge-btn-danger", () => {
    if (!confirming) {
      confirming = true;
      quitBtn.textContent = "Tap again to quit";
      return;
    }
    track(Events.sessionEnd);
    hooks.onQuit?.();
  });
  pSheet.appendChild(stack);
  pauseLayer.appendChild(pSheet);
  pauseLayer.addEventListener("click", (e) => {
    if (e.target === pauseLayer) api.resume();
  });
  root.appendChild(pauseLayer);

  const settingsLayer = el("div", "forge-fill");
  settingsLayer.style.display = "none";
  const sSheet = el("div", "forge-sheet");
  const close = el("button", "forge-x", "×");
  close.addEventListener("click", () => closeSettings());
  sSheet.appendChild(close);
  sSheet.appendChild(el("p", "forge-title", t("settings.title")));
  sSheet.appendChild(slider(t("settings.master"), settings.master, (v) => {
    settings.master = v;
    apply();
  }));
  sSheet.appendChild(slider(t("settings.music"), settings.music, (v) => {
    settings.music = v;
    apply();
  }));
  sSheet.appendChild(slider(t("settings.sfx"), settings.sfx, (v) => {
    settings.sfx = v;
    apply();
  }));
  sSheet.appendChild(slider(t("settings.shake"), settings.shake, (v) => {
    settings.shake = v;
    apply();
  }));
  sSheet.appendChild(toggle(t("settings.haptics"), settings.haptics, (v) => {
    settings.haptics = v;
    apply();
  }));
  sSheet.appendChild(toggle(t("settings.reduced"), settings.reducedMotion, (v) => {
    settings.reducedMotion = v;
    apply();
  }));
  const reset = el("button", "forge-btn", "Reset defaults");
  reset.addEventListener("click", () => {
    settings = defaultSettings();
    apply();
    closeSettings();
    openSettings();
  });
  sSheet.appendChild(reset);
  settingsLayer.appendChild(sSheet);
  root.appendChild(settingsLayer);

  function openSettings(): void {
    settingsOpen = true;
    settingsLayer.style.display = "flex";
    track(Events.settingsOpen);
  }
  function closeSettings(): void {
    settingsOpen = false;
    settingsLayer.style.display = "none";
  }

  const onKey = (e: KeyboardEvent) => {
    if (e.code === "Escape" || e.code === "KeyP") {
      if (!started) return;
      if (settingsOpen) closeSettings();
      else api.togglePause();
    }
  };
  window.addEventListener("keydown", onKey);

  const api: SessionChrome = {
    get paused() {
      return paused;
    },
    get started() {
      return started;
    },
    get settingsOpen() {
      return settingsOpen;
    },
    togglePause() {
      if (!started) return;
      if (paused) api.resume();
      else api.pause();
    },
    pause() {
      if (!started || paused) return;
      paused = true;
      confirming = false;
      quitBtn.textContent = t("pause.quit");
      pauseLayer.style.display = "flex";
      track(Events.pause);
      haptic("light");
    },
    resume() {
      paused = false;
      closeSettings();
      pauseLayer.style.display = "none";
    },
    destroy() {
      window.removeEventListener("keydown", onKey);
      unbindA11y?.();
      root.remove();
    },
    root,
  };

  return api;
}
