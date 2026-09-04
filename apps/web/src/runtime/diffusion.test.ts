import { describe, expect, it } from "vitest";
import {
  advanceDiffusionSlots,
  reconcileDiffusionSlots,
  segmentGraphemes,
} from "./diffusion";

describe("PARÉ diffusion engine", () => {
  it("resolves in a non-left-to-right order", () => {
    const slots = reconcileDiffusionSlots([], "PARÉ DIFFUSION", 1_000, {
      lockVariance: 0,
      maxActive: 120,
    });
    const active = slots.filter((slot) => !slot.skip);
    const lockTimes = active.map((slot) => slot.lockAt);
    const hasInversion = lockTimes.some((value, index) =>
      index > 0 && value < (lockTimes[index - 1] ?? value),
    );
    expect(hasInversion).toBe(true);
  });

  it("preserves unresolved slot timing when streamed text grows", () => {
    const first = reconcileDiffusionSlots([], "Hello", 1_000);
    const before = first.map((slot) => ({
      final: slot.final,
      startedAt: slot.startedAt,
      lockAt: slot.lockAt,
      seed: slot.seed,
    }));

    const second = reconcileDiffusionSlots(first, "Hello world", 1_120);
    expect(second.slice(0, 5).map((slot) => ({
      final: slot.final,
      startedAt: slot.startedAt,
      lockAt: slot.lockAt,
      seed: slot.seed,
    }))).toEqual(before);
  });

  it("keeps whitespace stable instead of diffusing it", () => {
    const slots = reconcileDiffusionSlots([], "A B", 1_000);
    expect(slots[1]?.skip).toBe(true);
    expect(slots[1]?.locked).toBe(true);
    expect(slots[1]?.current).toBe(" ");
  });

  it("caps the number of simultaneously unresolved glyphs", () => {
    const text = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".repeat(8);
    const slots = reconcileDiffusionSlots([], text, 1_000, { maxActive: 32 });
    const active = slots.filter((slot) => !slot.skip && !slot.locked);
    expect(active).toHaveLength(32);
  });

  it("locks every slot after its scheduled time", () => {
    const slots = reconcileDiffusionSlots([], "Signal", 1_000);
    const maxLockAt = Math.max(...slots.map((slot) => slot.lockAt));
    const frame = advanceDiffusionSlots(slots, maxLockAt + 1);
    expect(frame.active).toBe(0);
    expect(frame.slots.map((slot) => slot.current).join("")).toBe("Signal");
    expect(frame.slots.every((slot) => slot.locked)).toBe(true);
  });

  it("segments extended grapheme clusters without splitting emoji families", () => {
    const segments = segmentGraphemes("A👨‍👩‍👧‍👦É");
    expect(segments[0]).toBe("A");
    expect(segments[1]).toBe("👨‍👩‍👧‍👦");
    expect(segments[2]).toBe("É");
  });
});
