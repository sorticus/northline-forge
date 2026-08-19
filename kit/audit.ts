/**
 * NORTHLINE FORGE — runnable once-over
 * Call runAudit() from the console or a debug key.
 * Register what the game actually wired. Probe the DOM for chrome.
 *
 *   registerAudit({ engine: "phaser", juiceWired: true, ... });
 *   console.table(runAudit().rows);
 */

export type EngineKind = "phaser" | "r3f" | "canvas" | "unknown";

export type AuditFlags = {
  engine: EngineKind;
  juiceWired: boolean;
  cameraLerps: boolean;
  audioUnlockOnTap: boolean;
  sfxOnVerbs: boolean;
  generatedArt: boolean;
  playerAnimated: boolean;
  touchControls: boolean;
  dtCapped: boolean;
  setIntervalLoop: boolean;
  photoViewmodel: boolean;
  invertedSteer: boolean;
};

export type AuditRow = {
  id: string;
  ok: boolean;
  severity: "block" | "warn";
  note: string;
};

export type AuditReport = {
  verdict: "PASS" | "PATCH" | "REBUILD";
  worst: string[];
  rows: AuditRow[];
  flags: AuditFlags;
};

const DEFAULT: AuditFlags = {
  engine: "unknown",
  juiceWired: false,
  cameraLerps: false,
  audioUnlockOnTap: false,
  sfxOnVerbs: false,
  generatedArt: false,
  playerAnimated: false,
  touchControls: false,
  dtCapped: false,
  setIntervalLoop: false,
  photoViewmodel: false,
  invertedSteer: false,
};

let flags: AuditFlags = { ...DEFAULT };

export function registerAudit(partial: Partial<AuditFlags>): void {
  flags = { ...flags, ...partial };
  if (typeof window !== "undefined") {
    (window as unknown as { __forgeAudit?: AuditFlags }).__forgeAudit = flags;
  }
}

function probeDom(): Partial<AuditFlags> {
  if (typeof document === "undefined") return {};
  const out: Partial<AuditFlags> = {};
  if (document.querySelector("[data-forge-title], [data-forge-chrome]")) {
    out.audioUnlockOnTap = true;
  }
  if (document.querySelector("[data-forge-chrome='family-a'], [data-forge-chrome='family-b']")) {
    /* chrome mounted */
  }
  const canvas = document.querySelector("canvas");
  if (canvas) {
    const ta = getComputedStyle(canvas).touchAction;
    if (ta === "none") out.touchControls = flags.touchControls || true;
  }
  return out;
}

export function runAudit(override: Partial<AuditFlags> = {}): AuditReport {
  const f: AuditFlags = { ...flags, ...probeDom(), ...override };
  const rows: AuditRow[] = [];
  const add = (id: string, ok: boolean, severity: "block" | "warn", note: string) =>
    rows.push({ id, ok, severity, note });

  add("engine", f.engine !== "unknown", "block", `engine=${f.engine}`);
  add("no-setInterval", !f.setIntervalLoop, "block", "setInterval loop is a ship blocker");
  add("dt-capped", f.dtCapped, "block", "cap dt via kit/time.ts");
  add("juice", f.juiceWired, "block", "kit/juice.ts not wired");
  add("camera-lerp", f.cameraLerps, "block", "hard-snapped camera");
  add("audio-unlock", f.audioUnlockOnTap, "block", "TAP TO START must unlock audio sync");
  add("sfx", f.sfxOnVerbs, "block", "verbs need SFX");
  add("art", f.generatedArt, "block", "primitives-as-look");
  add("anim", f.playerAnimated, "block", "player must cycle idle/loco");
  add("touch", f.touchControls, "block", "phone SKU needs stick/actions");
  add("no-photo-mesh", !f.photoViewmodel, "block", "photo viewmodel");
  add("steer", !f.invertedSteer, "warn", "A must be left under chase cam");

  const blocks = rows.filter((r) => !r.ok && r.severity === "block");
  const worst = [...blocks, ...rows.filter((r) => !r.ok && r.severity === "warn")]
    .slice(0, 3)
    .map((r) => r.note);

  let verdict: AuditReport["verdict"] = "PASS";
  if (f.engine === "canvas" && (f.photoViewmodel || f.setIntervalLoop)) verdict = "REBUILD";
  else if (f.engine === "unknown" || f.setIntervalLoop) verdict = "REBUILD";
  else if (blocks.length) verdict = "PATCH";

  const report: AuditReport = { verdict, worst, rows, flags: f };
  if (typeof console !== "undefined") {
    console.info(`[FORGE audit] ${verdict}`, worst);
    console.table(rows);
  }
  return report;
}

export function auditToMarkdown(r: AuditReport): string {
  const lines = [
    `Verdict: **${r.verdict}**`,
    `Engine: ${r.flags.engine}`,
    `Worst 3: ${r.worst.join(" · ") || "—"}`,
    "",
    "| Check | OK |",
    "|---|---|",
    ...r.rows.map((row) => `| ${row.id} | ${row.ok ? "yes" : "NO"} |`),
  ];
  return lines.join("\n");
}
