/**
 * NORTHLINE FORGE — Phaser 3 boot
 * Copy into the game AFTER `npm i phaser`.
 * Scene stack: Boot → Preload → Menu → Game + parallel UI.
 * Reset run-state in init(). Cleanup on shutdown.
 *
 * This file imports `phaser`. It does not compile inside the FORGE repo.
 */

import Phaser from "phaser";
import { GameTime } from "../time";
import { Juice } from "../juice";
import { FollowCamera } from "../camera";
import { audio } from "../audio";
import { ParticlePool } from "../particles";
import { attachKeyboard, poll } from "../input";
import { applyJuiceToPhaserCam } from "./phaser-juice";

export const DESIGN = { width: 390, height: 844 };

export type ForgePhaserCtx = {
  time: GameTime;
  juice: Juice;
  cam: FollowCamera;
  fx: ParticlePool;
};

export function createForgeCtx(): ForgePhaserCtx {
  return {
    time: new GameTime(),
    juice: new Juice(),
    cam: new FollowCamera(),
    fx: new ParticlePool(),
  };
}

export class BootScene extends Phaser.Scene {
  constructor() {
    super("boot");
  }
  create(): void {
    this.scene.start("preload");
  }
}

export class PreloadScene extends Phaser.Scene {
  constructor() {
    super("preload");
  }
  preload(): void {
    const w = DESIGN.width;
    const bar = this.add.rectangle(w / 2, DESIGN.height / 2, 200, 8, 0x22222a);
    const fill = this.add.rectangle(w / 2 - 100, DESIGN.height / 2, 0, 8, 0xe7e7ea).setOrigin(0, 0.5);
    this.load.on("progress", (v: number) => {
      fill.width = 200 * v;
    });
  }
  create(): void {
    this.scene.start("menu");
  }
}

export class MenuScene extends Phaser.Scene {
  constructor() {
    super("menu");
  }
  create(): void {
    const { width: w, height: h } = this.scale;
    this.add
      .text(w / 2, h * 0.38, "NORTHLINE", {
        fontFamily: "ui-sans-serif, system-ui",
        fontSize: "28px",
        color: "#e7e7ea",
        fontStyle: "700",
      })
      .setOrigin(0.5);
    const cta = this.add
      .text(w / 2, h * 0.55, "TAP TO START", {
        fontFamily: "ui-sans-serif, system-ui",
        fontSize: "14px",
        color: "#a0a0ab",
        letterSpacing: 4,
      })
      .setOrigin(0.5);
    this.tweens.add({ targets: cta, alpha: 0.35, yoyo: true, repeat: -1, duration: 700 });
    this.input.once("pointerdown", () => {
      audio.unlock();
      this.scene.start("game");
      this.scene.launch("ui");
    });
  }
}

/**
 * Extend this. Reset in init(). Do not put run-state in the constructor.
 */
export class ForgeGameScene extends Phaser.Scene {
  ctx!: ForgePhaserCtx;
  unbindKeys?: () => void;

  constructor(key = "game") {
    super(key);
  }

  init(): void {
    this.ctx = createForgeCtx();
    this.ctx.cam.pixelRound = true;
  }

  create(): void {
    this.unbindKeys = attachKeyboard();
    audio.makeTick("hit", 180);
    audio.makeTick("land", 90, 0.12);
    audio.makeTick("jump", 320, 0.06);
    audio.makeTick("pickup", 520, 0.1);
    this.events.once("shutdown", () => this.unbindKeys?.());
  }

  update(_t: number, deltaMs: number): void {
    const { time, juice, cam, fx } = this.ctx;
    const dt = time.step(deltaMs / 1000);
    const frozen = juice.update(dt).frozen;
    if (!frozen) {
      const input = poll();
      this.simulate(dt, input);
      fx.update(dt);
    }
    applyJuiceToPhaserCam(this.cameras.main, cam, juice, DESIGN.width, DESIGN.height);
  }

  /** Override: run gameplay. Skipped during hitstop. */
  simulate(_dt: number, _input: ReturnType<typeof poll>): void {}
}

export class UiScene extends Phaser.Scene {
  constructor() {
    super("ui");
  }
  create(): void {
    // HUD lives here so Game can restart without killing chrome.
  }
}

export function forgePhaserConfig(parent: string | HTMLElement, scenes: Phaser.Types.Scenes.SceneType[]): Phaser.Types.Core.GameConfig {
  return {
    type: Phaser.AUTO,
    parent,
    width: DESIGN.width,
    height: DESIGN.height,
    backgroundColor: "#0b0b0f",
    pixelArt: true,
    roundPixels: true,
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    physics: {
      default: "arcade",
      arcade: { gravity: { x: 0, y: 1800 }, debug: false },
    },
    scene: scenes,
    input: { activePointers: 3 },
  };
}

export const defaultSceneOrder = [BootScene, PreloadScene, MenuScene, ForgeGameScene, UiScene];
