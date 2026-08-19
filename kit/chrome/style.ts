/**
 * NORTHLINE FORGE — chrome tokens
 * Inject once. Overlays use these classes. Safe-area aware.
 */

const CSS = `
.forge-root{position:absolute;inset:0;pointer-events:none;z-index:50;font-family:ui-sans-serif,system-ui,sans-serif;color:#e7e7ea}
.forge-root button{font:inherit;color:inherit;cursor:pointer}
.forge-safe{padding:max(12px,env(safe-area-inset-top)) max(12px,env(safe-area-inset-right)) max(12px,env(safe-area-inset-bottom)) max(12px,env(safe-area-inset-left))}
.forge-fill{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;pointer-events:auto;background:rgba(11,11,15,.78)}
.forge-sheet{width:min(340px,92vw);background:#16161c;border:1px solid #2a2a33;border-radius:16px;padding:22px 18px 16px;box-shadow:0 18px 50px rgba(0,0,0,.45);position:relative}
.forge-title{font-size:28px;font-weight:800;letter-spacing:.04em;text-align:center;margin:0 0 8px}
.forge-sub{font-size:12px;letter-spacing:.28em;text-transform:uppercase;opacity:.55;text-align:center;margin:0 0 22px}
.forge-stack{display:flex;flex-direction:column;gap:10px}
.forge-btn{min-height:48px;border-radius:12px;border:1px solid #3a3a46;background:#22222b;padding:0 16px;font-weight:700;pointer-events:auto}
.forge-btn:active{transform:scale(.98)}
.forge-btn-primary{background:#e7e7ea;color:#0b0b0f;border-color:#e7e7ea}
.forge-btn-danger{border-color:#5a3030;background:#2a1515}
.forge-icon{pointer-events:auto;width:44px;height:44px;border-radius:12px;border:1px solid #3a3a46;background:rgba(11,11,15,.55);display:grid;place-items:center;font-size:18px}
.forge-hud-tr{position:absolute;top:max(10px,env(safe-area-inset-top));right:max(10px,env(safe-area-inset-right));display:flex;gap:8px;pointer-events:none;z-index:51}
.forge-row{display:flex;align-items:center;justify-content:space-between;gap:12px;min-height:40px;font-size:14px}
.forge-row input[type=range]{width:140px}
.forge-x{position:absolute;top:10px;right:10px;width:36px;height:36px;border:0;background:transparent;font-size:20px;opacity:.6}
.forge-confirm{margin-top:8px;padding:10px;border-radius:10px;background:#2a1515;font-size:13px}
`;

let injected = false;

export function injectChromeStyles(): void {
  if (injected || typeof document === "undefined") return;
  const el = document.createElement("style");
  el.dataset.forge = "chrome";
  el.textContent = CSS;
  document.head.appendChild(el);
  injected = true;
}

export function el<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  className: string,
  text?: string,
): HTMLElementTagNameMap[K] {
  const n = document.createElement(tag);
  n.className = className;
  if (text) n.textContent = text;
  return n;
}
