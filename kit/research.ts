/**
 * NORTHLINE FORGE — research brief
 * Fill this BEFORE gameplay code. Write it to src/forge/research.brief.json.
 * If briefGaps() returns anything, you are not allowed to scaffold.
 *
 * Steal timing / camera / juice / loop. Never characters, logos, music, layouts.
 */

export type ChromeFamily = "A" | "B";
export type EnginePick = "phaser" | "r3f" | "canvas";

export type Comparable = {
  /** Real shipped title. Not "a typical platformer". */
  name: string;
  platform: string;
  why: string;
  /** Feel we copy (coyote, hitstop frames, camera k, …). */
  steal: string[];
  /** IP / layout / audio / characters we will not reproduce. */
  never: string[];
  camera: string;
  controls: string;
  juice: string;
  chrome: ChromeFamily | "other";
  loop: string;
};

export type ResearchBrief = {
  workingTitle: string;
  genre: string;
  /** One primary feel reference. */
  primaryReference: string;
  topic: string;
  /** Actual search queries you ran. Empty = you guessed. Fail. */
  searched: string[];
  comparables: Comparable[];
  v1Loop: string;
  v1NotInScope: string[];
  engine: EnginePick;
  chromeFamily: ChromeFamily;
  /** verb → juice stack, e.g. land: "squash + dust + thud + punch" */
  juiceMap: Record<string, string>;
};

export function emptyBrief(): ResearchBrief {
  return {
    workingTitle: "",
    genre: "",
    primaryReference: "",
    topic: "",
    searched: [],
    comparables: [],
    v1Loop: "",
    v1NotInScope: [],
    engine: "phaser",
    chromeFamily: "A",
    juiceMap: {},
  };
}

/** Returns human-readable blockers. Empty array = you may build. */
export function briefGaps(b: ResearchBrief): string[] {
  const g: string[] = [];
  if (!b.workingTitle.trim()) g.push("workingTitle");
  if (!b.genre.trim()) g.push("genre");
  if (!b.primaryReference.trim()) g.push("primaryReference");
  if (!b.topic.trim()) g.push("topic");
  if (b.searched.length < 2) g.push("searched (need ≥2 real queries)");
  if (b.comparables.length < 2) g.push("comparables (need ≥2 shipped titles)");
  b.comparables.forEach((c, i) => {
    if (!c.name.trim()) g.push(`comparables[${i}].name`);
    if (c.steal.length < 2) g.push(`comparables[${i}].steal (need ≥2 feel bullets)`);
    if (c.never.length < 1) g.push(`comparables[${i}].never`);
    if (!c.loop.trim()) g.push(`comparables[${i}].loop`);
    if (!c.controls.trim()) g.push(`comparables[${i}].controls`);
  });
  if (!b.v1Loop.trim()) g.push("v1Loop");
  if (Object.keys(b.juiceMap).length < 3) g.push("juiceMap (need ≥3 verbs)");
  if (b.engine === "canvas" && /kart|fps|3d|platformer|twin-stick|runner/i.test(b.genre)) {
    g.push("engine canvas is illegal for this genre");
  }
  return g;
}

export function assertBriefReady(b: ResearchBrief): void {
  const gaps = briefGaps(b);
  if (gaps.length) {
    throw new Error(`FORGE research brief incomplete:\n- ${gaps.join("\n- ")}`);
  }
}
