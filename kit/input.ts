/**
 * NORTHLINE FORGE — input
 * One state object. Keyboard, touch stick, optional gamepad dump into the same axes.
 * Movement code must not branch on device.
 *
 * Vehicle / chase-cam: KeyA → axisX = -1 means STRAFE left in FPS,
 * or STEER that yaws the body LEFT (see docs/08-controls.md). Default here is FPS/topdown.
 */

export type InputState = {
  x: number;
  y: number;
  jump: boolean;
  jumpPressed: boolean;
  action: boolean;
  actionPressed: boolean;
  pause: boolean;
};

const keys = new Set<string>();
let prevJump = false;
let prevAction = false;

export const stick = { x: 0, y: 0 };
export const buttons = { jump: false, action: false, pause: false };

function clamp1(v: number): number {
  return Math.max(-1, Math.min(1, v));
}

export function attachKeyboard(target: Window | HTMLElement = window): () => void {
  const down = (e: Event) => {
    const ev = e as KeyboardEvent;
    keys.add(ev.code);
    if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Space"].includes(ev.code)) {
      ev.preventDefault();
    }
  };
  const up = (e: Event) => keys.delete((e as KeyboardEvent).code);
  const blur = () => keys.clear();
  target.addEventListener("keydown", down);
  target.addEventListener("keyup", up);
  window.addEventListener("blur", blur);
  return () => {
    target.removeEventListener("keydown", down);
    target.removeEventListener("keyup", up);
    window.removeEventListener("blur", blur);
  };
}

export function poll(): InputState {
  let x = 0;
  let y = 0;
  if (keys.has("KeyA") || keys.has("ArrowLeft")) x -= 1;
  if (keys.has("KeyD") || keys.has("ArrowRight")) x += 1;
  if (keys.has("KeyW") || keys.has("ArrowUp")) y -= 1;
  if (keys.has("KeyS") || keys.has("ArrowDown")) y += 1;
  x = clamp1(x + stick.x);
  y = clamp1(y + stick.y);

  const jumpHeld = keys.has("Space") || keys.has("KeyJ") || buttons.jump;
  const actionHeld = keys.has("KeyK") || keys.has("ShiftLeft") || buttons.action;
  const jumpPressed = jumpHeld && !prevJump;
  const actionPressed = actionHeld && !prevAction;
  prevJump = jumpHeld;
  prevAction = actionHeld;

  const mag = Math.hypot(x, y);
  if (mag > 1) {
    x /= mag;
    y /= mag;
  }

  return {
    x,
    y,
    jump: jumpHeld,
    jumpPressed,
    action: actionHeld,
    actionPressed,
    pause: keys.has("Escape") || keys.has("KeyP") || buttons.pause,
  };
}

/** Feed a virtual joystick (nx, ny in -1..1). Call from touch UI. */
export function setStick(nx: number, ny: number): void {
  stick.x = clamp1(nx);
  stick.y = clamp1(ny);
}

export function setButton(name: "jump" | "action" | "pause", down: boolean): void {
  buttons[name] = down;
}
