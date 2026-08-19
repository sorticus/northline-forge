/**
 * NORTHLINE FORGE — Canvas 2D boot (tiny puzzles ONLY)
 * Tetris / match-3 / solitaire / 2048. If it runs or shoots, you wanted Phaser.
 * Still wires juice + audio + touch. Rectangles as *look* remain a ship blocker —
 * draw generated sprites into this loop.
 */

import { GameTime } from "../time";
import { Juice, spawnFloater, updateFloaters, type Floater } from "../juice";
import { FollowCamera } from "../camera";
import { audio } from "../audio";
import { ParticlePool } from "../particles";
import { attachKeyboard, poll, type InputState } from "../input";
import { mountTouch } from "../touch";

export type CanvasForge = {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  time: GameTime;
  juice: Juice;
  cam: FollowCamera;
  fx: ParticlePool;
  floaters: Floater[];
  stopped: boolean;
  stop: () => void;
};

export function bootCanvas(opts: {
  parent: HTMLElement;
  width?: number;
  height?: number;
  simulate: (dt: number, input: InputState, f: CanvasForge) => void;
  draw: (g: CanvasRenderingContext2D, f: CanvasForge) => void;
  pixelArt?: boolean;
}): CanvasForge {
  const width = opts.width ?? 390;
  const height = opts.height ?? 844;
  const canvas = document.createElement("canvas");
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.floor(width * dpr);
  canvas.height = Math.floor(height * dpr);
  canvas.style.cssText = `width:100%;height:100%;display:block;touch-action:none;background:#0b0b0f`;
  opts.parent.style.position ||= "relative";
  opts.parent.appendChild(canvas);
  const g = canvas.getContext("2d");
  if (!g) throw new Error("2d context");
  g.setTransform(dpr, 0, 0, dpr, 0, 0);
  if (opts.pixelArt) {
    g.imageSmoothingEnabled = false;
  }

  const f: CanvasForge = {
    canvas,
    ctx: g,
    time: new GameTime(),
    juice: new Juice(),
    cam: new FollowCamera(),
    fx: new ParticlePool(),
    floaters: [],
    stopped: false,
    stop() {
      f.stopped = true;
      unbind();
      touch.destroy();
    },
  };
  f.cam.pixelRound = !!opts.pixelArt;

  const unbind = attachKeyboard();
  const touch = mountTouch(opts.parent);
  audio.attachUnlock(opts.parent);
  audio.makeTick("hit", 180);
  audio.makeTick("pickup", 520, 0.1);
  audio.makeTick("win", 660, 0.2);

  let last = performance.now();
  const loop = (now: number) => {
    if (f.stopped) return;
    const dt = f.time.step((now - last) / 1000);
    last = now;
    const frozen = f.juice.update(dt).frozen;
    if (!frozen) {
      opts.simulate(dt, poll(), f);
      f.fx.update(dt);
      updateFloaters(f.floaters, dt);
    }
    g.setTransform(dpr, 0, 0, dpr, 0, 0);
    g.clearRect(0, 0, width, height);
    g.save();
    g.translate(-f.cam.x + width / 2 + f.juice.offsetX, -f.cam.y + height / 2 + f.juice.offsetY);
    g.rotate(f.juice.angle);
    opts.draw(g, f);
    f.fx.draw(g);
    for (const fl of f.floaters) {
      g.globalAlpha = 1 - fl.life / fl.max;
      g.fillStyle = "#fff";
      g.font = "700 16px ui-sans-serif,system-ui";
      g.fillText(fl.text, fl.x, fl.y);
      g.globalAlpha = 1;
    }
    g.restore();
    if (f.juice.flash > 0) {
      g.fillStyle = `rgba(255,255,255,${f.juice.flash * 0.45})`;
      g.fillRect(0, 0, width, height);
    }
    requestAnimationFrame(loop);
  };
  requestAnimationFrame(loop);
  return f;
}

export { spawnFloater };
