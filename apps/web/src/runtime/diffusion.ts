export const DIFFUSION_GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+-/:;.%#*?|(){}[],";

export interface DiffusionOptions {
  mutationInterval: number;
  minDuration: number;
  durationSpread: number;
  lockVariance: number;
  maxActive: number;
}

export interface DiffusionSlot {
  index: number;
  final: string;
  current: string;
  startedAt: number;
  lockAt: number;
  lastMut: number;
  mutationCount: number;
  seed: number;
  locked: boolean;
  skip: boolean;
}

export interface DiffusionFrameSlot extends DiffusionSlot {
  progress: number;
  blur: number;
  opacity: number;
  jitter: number;
}

export const DEFAULT_DIFFUSION_OPTIONS: DiffusionOptions = {
  mutationInterval: 38,
  minDuration: 220,
  durationSpread: 520,
  lockVariance: 140,
  maxActive: 120,
};

function hashString(value: string): number {
  let h = 2166136261;
  for (let i = 0; i < value.length; i += 1) {
    h ^= value.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function unitHash(value: string): number {
  return hashString(value) / 0xffffffff;
}

function clamp01(value: number): number {
  return Math.max(0, Math.min(1, value));
}

function smoothstep(value: number): number {
  const t = clamp01(value);
  return t * t * (3 - 2 * t);
}

export function segmentGraphemes(text: string): string[] {
  if (typeof Intl !== "undefined" && "Segmenter" in Intl) {
    const SegmenterCtor = Intl.Segmenter;
    const segmenter = new SegmenterCtor(undefined, { granularity: "grapheme" });
    return Array.from(segmenter.segment(text), (entry) => entry.segment);
  }
  return Array.from(text);
}

function isSkipCharacter(value: string): boolean {
  return /^\s$/u.test(value);
}

function glyphFor(seed: number, mutationCount: number): string {
  const unit = unitHash(`${seed}:${mutationCount}:pare`);
  return DIFFUSION_GLYPHS[Math.floor(unit * DIFFUSION_GLYPHS.length) % DIFFUSION_GLYPHS.length] ?? "·";
}

function lockTimeFor(
  index: number,
  final: string,
  now: number,
  options: DiffusionOptions,
): { seed: number; lockAt: number } {
  const seed = hashString(`${index}:${final}:pare-diffusion`);
  const order = unitHash(`${seed}:order`);
  const cluster = unitHash(`${Math.floor(index / 5)}:${seed % 7}:cluster`);
  const variance = (unitHash(`${seed}:variance`) * 2 - 1) * options.lockVariance;
  const duration =
    options.minDuration +
    order * options.durationSpread +
    cluster * Math.min(160, options.durationSpread * 0.28) +
    variance;
  return { seed, lockAt: now + Math.max(90, duration) };
}

export function reconcileDiffusionSlots(
  previous: DiffusionSlot[],
  text: string,
  now: number,
  partial: Partial<DiffusionOptions> = {},
): DiffusionSlot[] {
  const options = { ...DEFAULT_DIFFUSION_OPTIONS, ...partial };
  const chars = segmentGraphemes(text);
  const next = chars.map((final, index): DiffusionSlot => {
    const prior = previous[index];
    if (prior && prior.final === final) return prior;

    const skip = isSkipCharacter(final);
    const { seed, lockAt } = lockTimeFor(index, final, now, options);
    return {
      index,
      final,
      current: skip ? final : glyphFor(seed, 0),
      startedAt: now,
      lockAt: skip ? now : lockAt,
      lastMut: now,
      mutationCount: 0,
      seed,
      locked: skip,
      skip,
    };
  });

  const unresolved = next.filter((slot) => !slot.locked && !slot.skip);
  if (unresolved.length > options.maxActive) {
    const forceCount = unresolved.length - options.maxActive;
    for (let i = 0; i < forceCount; i += 1) {
      const slot = unresolved[i];
      if (!slot) continue;
      slot.current = slot.final;
      slot.locked = true;
      slot.lockAt = now;
    }
  }
  return next;
}

export function advanceDiffusionSlots(
  slots: DiffusionSlot[],
  now: number,
  partial: Partial<DiffusionOptions> = {},
): { slots: DiffusionFrameSlot[]; active: number } {
  const options = { ...DEFAULT_DIFFUSION_OPTIONS, ...partial };
  let active = 0;

  const framed = slots.map((slot): DiffusionFrameSlot => {
    if (slot.skip || slot.locked || now >= slot.lockAt) {
      slot.current = slot.final;
      slot.locked = true;
      return { ...slot, progress: 1, blur: 0, opacity: 1, jitter: 0 };
    }

    active += 1;
    const duration = Math.max(1, slot.lockAt - slot.startedAt);
    const progress = smoothstep(1 - (slot.lockAt - now) / duration);
    const phaseInterval = progress < 0.35
      ? options.mutationInterval
      : progress < 0.72
        ? options.mutationInterval * 1.35
        : options.mutationInterval * 1.9;

    if (now - slot.lastMut >= phaseInterval) {
      slot.lastMut = now;
      slot.mutationCount += 1;
      const finalProbability = progress < 0.35 ? 0.03 : progress < 0.72 ? 0.28 : 0.82;
      const roll = unitHash(`${slot.seed}:${slot.mutationCount}:final`);
      slot.current = roll < finalProbability
        ? slot.final
        : glyphFor(slot.seed, slot.mutationCount);
    }

    return {
      ...slot,
      progress,
      blur: (1 - progress) * 5.4,
      opacity: 0.34 + progress * 0.66,
      jitter: (1 - progress) * 1.6,
    };
  });

  return { slots: framed, active };
}
