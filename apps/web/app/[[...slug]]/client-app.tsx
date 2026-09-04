'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

import { installErrorHandlers } from '../../src/analytics/error-tracking';
import { MatrixLoader } from '../../src/components/MatrixLoader';
import { DiffusionOverlay } from '../../src/components/DiffusionOverlay';
import { installProductBrandGuard } from '../../src/i18n/product-copy';
import { installWebObservability } from '../../src/observability/install';

const ENTRY_GATE_KEY = 'pare:effect-passed';
const ENTRY_RETURN_KEY = 'pare:entry-return';
const LANDING_PATH = '/pare-preview/';

installErrorHandlers();
installWebObservability();

const App = dynamic(() => import('../../src/App').then((m) => m.App), {
  ssr: false,
  loading: () => (
    <div className="od-loading-shell">
      <MatrixLoader />
      <span>PARÉ</span>
    </div>
  ),
});

function BootShell() {
  return (
    <div className="od-loading-shell">
      <MatrixLoader />
      <span>PARÉ</span>
    </div>
  );
}

function cleanOneShotEntryQuery() {
  const url = new URL(window.location.href);
  if (!url.searchParams.has('pare-entry')) return;
  url.searchParams.delete('pare-entry');
  const clean = `${url.pathname}${url.search}${url.hash}`;
  window.history.replaceState(window.history.state, '', clean);
}

export function ClientApp() {
  const [entryReady, setEntryReady] = useState(false);

  useEffect(() => {
    installProductBrandGuard();

    const { pathname, search, hash } = window.location;

    // The public root is never the Studio. Every hard entrance begins with
    // the PARÉ crossword/Fusion story, including sovereign-daemon delivery.
    if (pathname === '/') {
      window.location.replace(LANDING_PATH);
      return;
    }

    // The landing grants exactly one hard Studio boot. Consume that grant as
    // soon as the Studio mounts. Internal SPA navigation stays uninterrupted,
    // but a reload, new tab, direct deep-link, bookmark, or fresh browser entry
    // must pass through the PARÉ effect again.
    try {
      if (sessionStorage.getItem(ENTRY_GATE_KEY) !== '1') {
        sessionStorage.setItem(ENTRY_RETURN_KEY, `${pathname}${search}${hash}`);
        window.location.replace(`${LANDING_PATH}#studio-entry`);
        return;
      }
      sessionStorage.removeItem(ENTRY_GATE_KEY);
      cleanOneShotEntryQuery();
    } catch {
      // Hardened privacy modes may block sessionStorage. The landing handoff
      // therefore adds a one-request query proof which is removed immediately.
      const params = new URLSearchParams(search);
      if (params.get('pare-entry') !== '1') {
        window.location.replace(`${LANDING_PATH}#studio-entry`);
        return;
      }
      cleanOneShotEntryQuery();
    }

    setEntryReady(true);
  }, []);

  if (!entryReady) return <BootShell />;

  return (
    <>
      <App />
      <DiffusionOverlay />
    </>
  );
}
