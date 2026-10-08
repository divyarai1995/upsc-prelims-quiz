import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// Relative base so the build works on GitHub Pages under /<repo-name>/
// and on any other static host without changes.
export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    outDir: 'dist',
    chunkSizeWarningLimit: 1500,
  },
  test: {
    include: ['tests/**/*.test.ts'],
    environment: 'node',
  },
});
