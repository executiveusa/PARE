"use client";

import { useEffect, useState, type ReactNode } from "react";
import { MatrixLoader } from "./MatrixLoader";

export const PARE_ENTRY_SESSION_KEY = "pare:entry-complete";
export const PARE_ENTRY_PATH = "/pare-preview/";

function continuationFromLocation(): string {
  const { pathname, search, hash } = window.location;
  return `${pathname}${search}${hash}` || "/";
}

/**
 * PARÉ is intentionally entered through its brand/meaning experience before
 * the Studio mounts. The marker lasts for the current browser tab/session so
 * in-product navigation and deep links remain fast after the entry ritual.
 */
export function PareEntryGate({ children }: { children: ReactNode }) {
  const [admitted, setAdmitted] = useState(false);

  useEffect(() => {
    let passed = false;
    try {
      passed = sessionStorage.getItem(PARE_ENTRY_SESSION_KEY) === "true";
    } catch {
      // Storage can be unavailable in hardened browsers. In that case the
      // landing page can still admit this visit with the one-shot query flag.
    }

    const current = new URL(window.location.href);
    const oneShot = current.searchParams.get("pare-entry") === "1";
    if (oneShot) {
      try {
        sessionStorage.setItem(PARE_ENTRY_SESSION_KEY, "true");
      } catch {
        // One-shot admission still works without persistence.
      }
      current.searchParams.delete("pare-entry");
      window.history.replaceState(window.history.state, "", `${current.pathname}${current.search}${current.hash}`);
      setAdmitted(true);
      return;
    }

    if (passed) {
      setAdmitted(true);
      return;
    }

    const continuation = continuationFromLocation();
    const entry = `${PARE_ENTRY_PATH}?continue=${encodeURIComponent(continuation)}`;
    window.location.replace(entry);
  }, []);

  if (!admitted) {
    return (
      <div className="od-loading-shell" aria-label="Entering PARÉ">
        <MatrixLoader />
        <span>PARÉ</span>
      </div>
    );
  }

  return <>{children}</>;
}
