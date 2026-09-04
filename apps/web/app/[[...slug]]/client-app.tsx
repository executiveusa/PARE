'use client';

import { useEffect } from 'react';
import dynamic from 'next/dynamic';

import { installErrorHandlers } from '../../src/analytics/error-tracking';
import { MatrixLoader } from '../../src/components/MatrixLoader';
import { DiffusionOverlay } from '../../src/components/DiffusionOverlay';
import { installProductBrandGuard } from '../../src/i18n/product-copy';
import { installWebObservability } from '../../src/observability/install';

// Install browser exception handlers at module-load time, before any other
// client code can throw. The hooks buffer events until AnalyticsProvider
// finishes `bootstrapExceptionTracking()` with the PostHog key, so even
// errors thrown during the dynamic import of `src/App` are captured.
installErrorHandlers();

// Install the rest of the observability surface (long tasks, white-screen
// detector, resource-error capture, boot timing, visibility tracking).
// Same buffer + consent-bypass transport as the exception handler above
// so events fired before AnalyticsProvider initialises still flush.
installWebObservability();

// The product is a fully client-driven SPA — every component reads
// localStorage, window.location, etc. — so we opt out of static-time
// rendering for the entire tree. This keeps `next build --output export`
// from trying to evaluate browser-only code while still emitting a real
// shell HTML the daemon can serve as the SPA fallback.
const App = dynamic(() => import('../../src/App').then((m) => m.App), {
  ssr: false,
  // Keep the compatibility class on the outer node: the white-screen detector
  // excludes this boot shell while deciding whether the real app mounted.
  loading: () => (
    <div className="od-loading-shell">
      <MatrixLoader />
      <span>PARÉ</span>
    </div>
  ),
});

export function ClientApp() {
  // Some older components and upstream help surfaces still contain literal
  // product copy outside the translation dictionaries. Keep the rendered app
  // consistently PARÉ-branded while preserving technical compatibility names
  // in source, code examples, storage, packages and runtime adapters.
  useEffect(() => installProductBrandGuard(), []);

  return (
    <>
      <App />
      <DiffusionOverlay />
    </>
  );
}
