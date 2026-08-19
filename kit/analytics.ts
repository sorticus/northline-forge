/**
 * NORTHLINE FORGE — analytics stub
 * One event names table. Swap the sink (console / GA / your backend) later.
 * Do not invent ad-hoc string events in gameplay code.
 *
 * Privacy: default sink is a no-op until the title opts in.
 * Store listings will need Data safety / nutrition labels if you turn this on.
 */

export const Events = {
  sessionStart: "forge.session_start",
  sessionEnd: "forge.session_end",
  tapToStart: "forge.tap_to_start",
  levelStart: "forge.level_start",
  levelComplete: "forge.level_complete",
  levelFail: "forge.level_fail",
  retry: "forge.retry",
  pause: "forge.pause",
  settingsOpen: "forge.settings_open",
  purchase: "forge.purchase",
} as const;

export type EventName = (typeof Events)[keyof typeof Events];

export type AnalyticsSink = (name: EventName | string, props?: Record<string, unknown>) => void;

let sink: AnalyticsSink = () => {};

export function setAnalyticsSink(fn: AnalyticsSink): void {
  sink = fn;
}

export function track(name: EventName | string, props?: Record<string, unknown>): void {
  try {
    sink(name, props);
  } catch {
    /* never break the game for telemetry */
  }
}
