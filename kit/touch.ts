/**
 * NORTHLINE FORGE — on-screen stick + action buttons
 * Call mountTouch(root). Writes into kit/input setStick/setButton.
 */

import { setButton, setStick } from "./input";

type Handle = { destroy: () => void };

function circle(el: HTMLElement, x: number, y: number, down: boolean): void {
  el.style.transform = `translate(${x}px, ${y}px)`;
  el.style.opacity = down ? "1" : "0.55";
}

export function mountTouch(parent: HTMLElement): Handle {
  const root = document.createElement("div");
  root.style.cssText =
    "position:absolute;inset:0;pointer-events:none;z-index:40;touch-action:none;";

  const stickBase = document.createElement("div");
  stickBase.style.cssText =
    "position:absolute;left:24px;bottom:28px;width:120px;height:120px;border-radius:999px;border:2px solid rgba(255,255,255,.35);pointer-events:auto;touch-action:none;";
  const stickNub = document.createElement("div");
  stickNub.style.cssText =
    "position:absolute;left:50%;top:50%;width:52px;height:52px;margin:-26px;border-radius:999px;background:rgba(255,255,255,.4);pointer-events:none;";
  stickBase.appendChild(stickNub);

  const btns = document.createElement("div");
  btns.style.cssText =
    "position:absolute;right:20px;bottom:32px;display:flex;gap:12px;pointer-events:auto;";

  const mkBtn = (label: string, key: "jump" | "action") => {
    const b = document.createElement("button");
    b.type = "button";
    b.textContent = label;
    b.style.cssText =
      "width:72px;height:72px;border-radius:999px;border:2px solid rgba(255,255,255,.4);background:rgba(0,0,0,.35);color:#fff;font:700 13px/1 ui-sans-serif,system-ui;pointer-events:auto;touch-action:none;";
    const on = (v: boolean) => {
      setButton(key, v);
      b.style.background = v ? "rgba(255,255,255,.25)" : "rgba(0,0,0,.35)";
    };
    b.addEventListener("pointerdown", (e) => {
      e.preventDefault();
      b.setPointerCapture(e.pointerId);
      on(true);
    });
    b.addEventListener("pointerup", () => on(false));
    b.addEventListener("pointercancel", () => on(false));
    return b;
  };

  btns.appendChild(mkBtn("JUMP", "jump"));
  btns.appendChild(mkBtn("ACT", "action"));
  root.appendChild(stickBase);
  root.appendChild(btns);
  parent.appendChild(root);

  const origin = { x: 0, y: 0 };
  let tracking = false;
  const radius = 44;

  const move = (clientX: number, clientY: number) => {
    const r = stickBase.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    let dx = clientX - cx;
    let dy = clientY - cy;
    const m = Math.hypot(dx, dy) || 1;
    const clamped = Math.min(m, radius);
    dx = (dx / m) * clamped;
    dy = (dy / m) * clamped;
    circle(stickNub, dx, dy, true);
    setStick(dx / radius, dy / radius);
  };

  const end = () => {
    tracking = false;
    circle(stickNub, 0, 0, false);
    setStick(0, 0);
  };

  stickBase.addEventListener("pointerdown", (e) => {
    e.preventDefault();
    stickBase.setPointerCapture(e.pointerId);
    tracking = true;
    origin.x = e.clientX;
    origin.y = e.clientY;
    move(e.clientX, e.clientY);
  });
  stickBase.addEventListener("pointermove", (e) => {
    if (tracking) move(e.clientX, e.clientY);
  });
  stickBase.addEventListener("pointerup", end);
  stickBase.addEventListener("pointercancel", end);

  return {
    destroy() {
      end();
      root.remove();
    },
  };
}
