import * as Sentry from '@sentry/react';
import { Replay } from '@sentry/replay';
import { browserTracingIntegration } from '@sentry/react'; // 👈 new import
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';

import { ErrorBoundary } from '@sentry/react';

Sentry.init({
  dsn: 'https://1bb170c9709615ef887d7db2279c389f@o4510025251028992.ingest.de.sentry.io/4510025280847952',
  integrations: [
    browserTracingIntegration(), // 👈 function instead of new BrowserTracing()
    new Replay(),
  ],
  tracesSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <ErrorBoundary fallback={<div>Something went wrong</div>}>
        <App />
      </ErrorBoundary>
    </HashRouter>
  </StrictMode>
);
