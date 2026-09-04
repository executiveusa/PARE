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

export function ClientApp() {
  const [entryReady, setEntryReady] = useState(false);

  useEffect(() => {
    installProductBrandGuard();

    const { pathname, search, hash } = window.location;

    // The public root is never the Studio. Every fresh entrance begins with
    // the PARÉ crossword/Fusion story, even when the app is served directly
    // from the sovereign daemon instead of Netlify.
    if (pathname === '/') {
      window.location.replace(LANDING_PATH);
      return;
    }

    // Direct/deep links into the Studio must first pass through the PARÉ
    // effect once in the current browser session. The landing page sets this
    // gate only from its explicit "Enter Studio" action. Preserve the desired
    // deep link so the visitor can continue where they intended to go.
    try {
      if (sessionStorage.getItem(ENTRY_GATE_KEY) !== '1') {
        sessionStorage.setItem(ENTRY_RETURN_KEY, `${pathname}${search}${hash}`);
        window.location.replace(`${LANDING_PATH}#studio-entry`);
        return;
      }
    } catch {
      // Privacy modes can disable sessionStorage. In that case the explicit
      // landing handoff uses ?pare-entry=1 as a one-request proof.
      const params = new URLSearchParams(search);
      if (params.get('pare-entry') !== '1') {
        window.location.replace(`${LANDING_PATH}#studio-entry`);
        return;
      }
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
