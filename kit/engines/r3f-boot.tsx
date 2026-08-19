/**
 * NORTHLINE FORGE — R3F boot
 * Copy into the game AFTER:
 *   npm i three @react-three/fiber @react-three/drei @react-three/rapier
 *   npm i -D @types/three
 *
 * Pointer lock = mouse look ONLY. WASD still comes from kit/input.
 * Shake lives on a camera RIG, not the world root.
 *
 * This file imports R3F. It does not compile inside the FORGE repo.
 */

import { Canvas, useFrame } from "@react-three/fiber";
import { PointerLockControls, Environment } from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import { useEffect, useRef, type ReactNode } from "react";
import type { Group } from "three";
import { GameTime } from "../time";
import { Juice } from "../juice";
import { FollowCamera } from "../camera";
import { audio } from "../audio";
import { ParticlePool } from "../particles";
import { attachKeyboard, poll } from "../input";
import { applyJuiceToCameraRig } from "./r3f-juice";

export type Forge3DCtx = {
  time: GameTime;
  juice: Juice;
  cam: FollowCamera;
  fx: ParticlePool;
};

export function createForge3DCtx(): Forge3DCtx {
  const cam = new FollowCamera();
  cam.k = 8;
  cam.lookahead = 0.25;
  cam.maxLookahead = 4;
  return { time: new GameTime(), juice: new Juice(), cam, fx: new ParticlePool(512) };
}

type LoopProps = {
  ctx: Forge3DCtx;
  simulate: (dt: number, input: ReturnType<typeof poll>, ctx: Forge3DCtx) => void;
};

function ForgeLoop({ ctx, simulate }: LoopProps) {
  const rig = useRef<Group>(null);
  useFrame((state, raw) => {
    const dt = ctx.time.step(raw);
    const frozen = ctx.juice.update(dt).frozen;
    if (!frozen) {
      simulate(dt, poll(), ctx);
      ctx.fx.update(dt);
    }
    applyJuiceToCameraRig(state.camera, ctx.cam, ctx.juice, rig.current);
  });
  return <group ref={rig} />;
}

export function ForgeCanvas({
  ctx,
  simulate,
  children,
  locked = false,
}: {
  ctx: Forge3DCtx;
  simulate: LoopProps["simulate"];
  children?: ReactNode;
  locked?: boolean;
}) {
  useEffect(() => attachKeyboard(), []);
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ position: [0, 1.7, 6], fov: 60, near: 0.08, far: 400 }}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      onPointerDown={() => audio.unlock()}
    >
      <color attach="background" args={["#0b0b0f"]} />
      <fog attach="fog" args={["#0b0b0f", 18, 80]} />
      <hemisphereLight args={["#c8d6ff", "#1a120c", 0.55]} />
      <directionalLight
        castShadow
        position={[8, 14, 6]}
        intensity={1.35}
        shadow-mapSize={[1024, 1024]}
      />
      <Environment preset="city" />
      <Physics gravity={[0, -18, 0]}>
        <ForgeLoop ctx={ctx} simulate={simulate} />
        {children}
      </Physics>
      {locked ? <PointerLockControls /> : null}
    </Canvas>
  );
}

/** Title overlay. Tap unlocks audio + (optional) pointer lock. */
export function TapToStart({ onStart, title = "NORTHLINE" }: { onStart: () => void; title?: string }) {
  return (
    <button
      type="button"
      onClick={() => {
        audio.unlock();
        onStart();
      }}
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 30,
        background: "rgba(11,11,15,.72)",
        color: "#e7e7ea",
        border: 0,
        cursor: "pointer",
        font: "700 28px/1.2 ui-sans-serif, system-ui",
      }}
    >
      <div>{title}</div>
      <div style={{ marginTop: 16, fontSize: 13, letterSpacing: 4, fontWeight: 600, opacity: 0.7 }}>
        TAP TO START
      </div>
    </button>
  );
}
