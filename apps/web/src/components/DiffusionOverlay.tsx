"use client";

import { useEffect, useRef, useState } from "react";
import {
  advanceDiffusionSlots,
  reconcileDiffusionSlots,
  type DiffusionFrameSlot,
  type DiffusionSlot,
} from "../runtime/diffusion";

const STORAGE_KEY = "pare:chat-diffusion-enabled";
const OVERLAY_ATTR = "data-pare-diffusion-overlay";
const QUIET_REMOVE_MS = 520;

type ActiveRuntime = {
  target: HTMLElement;
  overlay: HTMLDivElement;
  slots: DiffusionSlot[];
  spanByIndex: Map<number, HTMLSpanElement>;
  text: string;
  cutoff: number;
  lastMutationAt: number;
  previousOpacity: string;
  previousFilter: string;
  previousTransition: string;
};

function latestStreamingTextTarget(): HTMLElement | null {
  const block = document.querySelector<HTMLElement>(
    '.prose-block[data-stream-cursor="true"]',
  );
  if (!block) return null;
  const paragraphs = block.querySelectorAll<HTMLElement>(".md-p");
  return paragraphs.item(paragraphs.length - 1) || block;
}

function copyTypography(source: HTMLElement, overlay: HTMLElement) {
  const style = getComputedStyle(source);
  overlay.style.fontFamily = style.fontFamily;
  overlay.style.fontSize = style.fontSize;
  overlay.style.fontStyle = style.fontStyle;
  overlay.style.fontWeight = style.fontWeight;
  overlay.style.lineHeight = style.lineHeight;
  overlay.style.letterSpacing = style.letterSpacing;
  overlay.style.textAlign = style.textAlign;
  overlay.style.textTransform = style.textTransform;
  overlay.style.color = style.color;
  overlay.style.wordBreak = style.wordBreak;
  overlay.style.overflowWrap = style.overflowWrap;
}

function positionOverlay(runtime: ActiveRuntime) {
  const rect = runtime.target.getBoundingClientRect();
  const overlay = runtime.overlay;
  overlay.style.left = `${rect.left}px`;
  overlay.style.top = `${rect.top}px`;
  overlay.style.width = `${rect.width}px`;
  overlay.style.minHeight = `${rect.height}px`;
}

function rebuildOverlay(runtime: ActiveRuntime) {
  const maxAnimated = 120;
  const cutoff = Math.max(0, runtime.slots.length - maxAnimated);
  runtime.cutoff = cutoff;
  runtime.spanByIndex.clear();
  runtime.overlay.replaceChildren();

  if (cutoff > 0) {
    runtime.overlay.append(
      document.createTextNode(runtime.slots.slice(0, cutoff).map((slot) => slot.final).join("")),
    );
  }

  for (let i = cutoff; i < runtime.slots.length; i += 1) {
    const slot = runtime.slots[i];
    if (!slot) continue;
    const span = document.createElement("span");
    span.textContent = slot.current;
    span.style.whiteSpace = "pre-wrap";
    span.style.display = "inline";
    span.style.willChange = "filter,opacity,transform";
    runtime.spanByIndex.set(i, span);
    runtime.overlay.append(span);
  }
}

function paintFrame(runtime: ActiveRuntime, framed: DiffusionFrameSlot[]) {
  for (let i = runtime.cutoff; i < framed.length; i += 1) {
    const slot = framed[i];
    const span = runtime.spanByIndex.get(i);
    if (!slot || !span) continue;
    span.textContent = slot.current;
    if (slot.locked || slot.skip) {
      span.style.filter = "none";
      span.style.opacity = "1";
      span.style.transform = "none";
      continue;
    }
    const direction = slot.seed % 2 === 0 ? 1 : -1;
    const x = direction * slot.jitter * 0.42;
    const y = ((slot.seed % 5) - 2) * slot.jitter * 0.12;
    const scale = 0.985 + slot.progress * 0.015;
    span.style.filter = `blur(${slot.blur.toFixed(2)}px) brightness(${(0.76 + slot.progress * 0.24).toFixed(2)})`;
    span.style.opacity = slot.opacity.toFixed(3);
    span.style.transform = `translate(${x.toFixed(2)}px,${y.toFixed(2)}px) scale(${scale.toFixed(3)})`;
  }
}

export function DiffusionOverlay() {
  const [enabled, setEnabled] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const runtimeRef = useRef<ActiveRuntime | null>(null);
  const rafRef = useRef(0);
  const captureRafRef = useRef(0);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved !== null) setEnabled(saved !== "false");
    } catch {
      // Storage is optional; default stays enabled.
    }

    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(media.matches);
    sync();
    media.addEventListener?.("change", sync);
    return () => media.removeEventListener?.("change", sync);
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, String(enabled));
    } catch {
      // Keep the in-memory preference even if storage is unavailable.
    }
  }, [enabled]);

  useEffect(() => {
    const cleanupRuntime = () => {
      const runtime = runtimeRef.current;
      if (!runtime) return;
      runtime.target.style.opacity = runtime.previousOpacity;
      runtime.target.style.filter = runtime.previousFilter;
      runtime.target.style.transition = runtime.previousTransition;
      runtime.overlay.remove();
      runtimeRef.current = null;
    };

    const stop = () => {
      cancelAnimationFrame(rafRef.current);
      cancelAnimationFrame(captureRafRef.current);
      rafRef.current = 0;
      captureRafRef.current = 0;
      cleanupRuntime();
    };

    if (!enabled || reducedMotion) {
      stop();
      return stop;
    }

    const ensureRuntime = (target: HTMLElement, text: string, now: number) => {
      let runtime = runtimeRef.current;
      if (runtime && runtime.target !== target) {
        cleanupRuntime();
        runtime = null;
      }

      if (!runtime) {
        const overlay = document.createElement("div");
        overlay.setAttribute(OVERLAY_ATTR, "true");
        overlay.setAttribute("aria-hidden", "true");
        overlay.style.position = "fixed";
        overlay.style.zIndex = "9998";
        overlay.style.pointerEvents = "none";
        overlay.style.whiteSpace = "pre-wrap";
        overlay.style.margin = "0";
        overlay.style.padding = "0";
        overlay.style.background = "transparent";
        copyTypography(target, overlay);
        document.body.appendChild(overlay);

        runtime = {
          target,
          overlay,
          slots: [],
          spanByIndex: new Map(),
          text: "",
          cutoff: 0,
          lastMutationAt: now,
          previousOpacity: target.style.opacity,
          previousFilter: target.style.filter,
          previousTransition: target.style.transition,
        };
        runtimeRef.current = runtime;
        target.style.transition = "opacity 90ms ease, filter 90ms ease";
        target.style.opacity = "0.12";
        target.style.filter = "blur(1.2px)";
      }

      if (runtime.text !== text) {
        runtime.slots = reconcileDiffusionSlots(runtime.slots, text, now, {
          mutationInterval: 34,
          minDuration: 260,
          durationSpread: 620,
          lockVariance: 170,
          maxActive: 120,
        });
        runtime.text = text;
        runtime.lastMutationAt = now;
        rebuildOverlay(runtime);
      }
      copyTypography(target, runtime.overlay);
      positionOverlay(runtime);
    };

    const capture = () => {
      captureRafRef.current = 0;
      const target = latestStreamingTextTarget();
      if (!target) return;
      const text = target.innerText || target.textContent || "";
      if (!text.trim()) return;
      ensureRuntime(target, text, performance.now());
      if (!rafRef.current) rafRef.current = requestAnimationFrame(tick);
    };

    const scheduleCapture = () => {
      if (!captureRafRef.current) captureRafRef.current = requestAnimationFrame(capture);
    };

    const tick = (now: number) => {
      rafRef.current = 0;
      const runtime = runtimeRef.current;
      if (!runtime) return;
      positionOverlay(runtime);
      const frame = advanceDiffusionSlots(runtime.slots, now, { mutationInterval: 34 });
      paintFrame(runtime, frame.slots);

      if (frame.active === 0) {
        runtime.target.style.opacity = "1";
        runtime.target.style.filter = "none";
        if (now - runtime.lastMutationAt > QUIET_REMOVE_MS) {
          cleanupRuntime();
          return;
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    const observer = new MutationObserver((mutations) => {
      const relevant = mutations.some((mutation) => {
        const node = mutation.target;
        const element = node instanceof Element ? node : node.parentElement;
        return !element?.closest(`[${OVERLAY_ATTR}]`);
      });
      if (relevant) scheduleCapture();
    });

    observer.observe(document.body, {
      subtree: true,
      childList: true,
      characterData: true,
    });
    window.addEventListener("scroll", scheduleCapture, true);
    window.addEventListener("resize", scheduleCapture);
    scheduleCapture();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", scheduleCapture, true);
      window.removeEventListener("resize", scheduleCapture);
      stop();
    };
  }, [enabled, reducedMotion]);

  const effectiveEnabled = enabled && !reducedMotion;

  return (
    <button
      type="button"
      aria-pressed={effectiveEnabled}
      aria-label={reducedMotion ? "Diffusion disabled by reduced motion" : `Diffusion ${enabled ? "on" : "off"}`}
      disabled={reducedMotion}
      onClick={() => setEnabled((value) => !value)}
      style={{
        position: "fixed",
        right: 16,
        top: 72,
        zIndex: 10001,
        display: "inline-flex",
        alignItems: "center",
        gap: 7,
        minHeight: 30,
        padding: "0 9px",
        border: "1px solid color-mix(in srgb, var(--text-strong, #111) 18%, transparent)",
        borderRadius: 999,
        background: "color-mix(in srgb, var(--bg-panel, #f7f7f7) 88%, transparent)",
        color: "var(--text-muted, #6f6f6f)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        font: "500 9px/1 ui-monospace, SFMono-Regular, Menlo, monospace",
        letterSpacing: ".08em",
        textTransform: "uppercase",
        cursor: reducedMotion ? "default" : "pointer",
        opacity: reducedMotion ? 0.55 : 1,
      }}
    >
      <span
        aria-hidden="true"
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: effectiveEnabled ? "var(--accent, #353535)" : "currentColor",
          opacity: effectiveEnabled ? 1 : 0.4,
          boxShadow: effectiveEnabled ? "0 0 0 3px color-mix(in srgb, var(--accent, #353535) 12%, transparent)" : "none",
        }}
      />
      Diffusion {reducedMotion ? "Reduced" : enabled ? "On" : "Off"}
    </button>
  );
}
