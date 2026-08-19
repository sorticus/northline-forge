/**
 * NORTHLINE FORGE — save
 * Versioned localStorage. Migrate, never throw away a player's run silently.
 * Not cloud. Not anti-cheat. Good enough for single-player.
 */

export type SaveEnvelope<T> = {
  v: number;
  at: number;
  data: T;
};

export class ForgeSave<T> {
  constructor(
    readonly key: string,
    readonly version: number,
    readonly fallback: () => T,
    readonly migrate?: (raw: unknown, from: number) => T,
  ) {}

  load(): T {
    try {
      const raw = localStorage.getItem(this.key);
      if (!raw) return this.fallback();
      const parsed = JSON.parse(raw) as SaveEnvelope<unknown>;
      if (!parsed || typeof parsed.v !== "number") return this.fallback();
      if (parsed.v === this.version) return parsed.data as T;
      if (this.migrate) return this.migrate(parsed.data, parsed.v);
      return this.fallback();
    } catch {
      return this.fallback();
    }
  }

  write(data: T): void {
    const env: SaveEnvelope<T> = { v: this.version, at: Date.now(), data };
    try {
      localStorage.setItem(this.key, JSON.stringify(env));
    } catch {
      /* quota / private mode */
    }
  }

  clear(): void {
    try {
      localStorage.removeItem(this.key);
    } catch {
      /* ignore */
    }
  }
}

/** Debounced writer — call from the loop, flush at most every `ms`. */
export function autosave<T>(save: ForgeSave<T>, ms = 1500): (data: T) => void {
  let t: ReturnType<typeof setTimeout> | null = null;
  let pending: T | null = null;
  const flush = () => {
    t = null;
    if (pending !== null) save.write(pending);
    pending = null;
  };
  return (data: T) => {
    pending = data;
    if (t) return;
    t = setTimeout(flush, ms);
  };
}
