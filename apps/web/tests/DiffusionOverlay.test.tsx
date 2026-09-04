// @vitest-environment jsdom

import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { DiffusionOverlay } from "../src/components/DiffusionOverlay";

function installMatchMedia(matches = false) {
  Object.defineProperty(window, "matchMedia", {
    configurable: true,
    value: vi.fn().mockImplementation(() => ({
      matches,
      media: "(prefers-reduced-motion: reduce)",
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
}

describe("DiffusionOverlay", () => {
  beforeEach(() => {
    localStorage.clear();
    installMatchMedia(false);
  });

  it("lets the user turn diffusion off and persists that choice", async () => {
    render(<DiffusionOverlay />);
    const button = await screen.findByRole("button", { name: /Diffusion on/i });
    expect(button).toHaveAttribute("aria-pressed", "true");

    fireEvent.click(button);

    await waitFor(() => {
      expect(button).toHaveAttribute("aria-pressed", "false");
      expect(localStorage.getItem("pare:chat-diffusion-enabled")).toBe("false");
    });
  });

  it("disables animated diffusion when reduced motion is requested", async () => {
    installMatchMedia(true);
    render(<DiffusionOverlay />);

    const button = await screen.findByRole("button", {
      name: /disabled by reduced motion/i,
    });
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("aria-pressed", "false");
  });
});
