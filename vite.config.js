import path from 'path';
import { fileURLToPath } from 'url';

import { sentryVitePlugin } from '@sentry/vite-plugin';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';

// Resolve __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig(({ mode }) => {
  // Load env variables based on current mode
  const env = loadEnv(mode, process.cwd(), 'VITE_');

  return {
    base: '/apple-store/',
    plugins: [
      react(),
      tailwindcss(),
      sentryVitePlugin({
        org: 'full-time-at-sigma-agency-part',
        project: 'javascript-react',
        authToken: env.VITE_SENTRY_AUTH_TOKEN, // use loaded env
        include: './dist',
        ignore: ['node_modules', 'vite.config.js'],
        urlPrefix: '~/apple-store',
        release: env.VITE_SENTRY_RELEASE || '1.0.0',
        deploy: {
          env: env.MODE || 'production',
        },
      }),
    ],
    build: {
      emptyOutDir: true,
      sourcemap: true,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) return 'vendor';
          },
        },
        chunkSizeWarningLimit: 2000,
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    publicDir: 'public',
  };
});
