import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  base: '/apple-store/',
  plugins: [react(), tailwindcss()],
  build: { emptyOutDir: true },
  publicDir: 'public',
});
