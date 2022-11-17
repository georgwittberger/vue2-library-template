/// <reference types="vitest" />
import vue from '@vitejs/plugin-vue2';
import { resolve } from 'node:path';
import type { ModuleFormat } from 'rollup';
import { defineConfig } from 'vite';
import { createEntrypoints } from './build/entrypoints';
import packageJson from './package.json';

// More on Vite configuration: https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    // More on Vite library mode: https://vitejs.dev/guide/build.html#library-mode
    lib: {
      // Create multiple entrypoints to build component chunks.
      // More on code splitting: https://rollupjs.org/guide/en/#code-splitting
      entry: createEntrypoints({
        sourceDirectoryPath: resolve(__dirname, 'src'),
        componentsDirectoryName: 'components',
      }),
    },
    minify: false,
    target: 'es2018',
    rollupOptions: {
      // Externalize all runtime dependencies declared in package.json
      // More on external modules: https://rollupjs.org/guide/en/#external
      external: Object.keys(packageJson.dependencies || {}),
      // Output as ES modules (*.js) and CommonJS modules (*.cjs)
      // More on rollup.js output: https://rollupjs.org/guide/en/#configuration-files
      output: (['es', 'cjs'] as ModuleFormat[]).map((format) => ({
        format,
        hoistTransitiveImports: false,
        assetFileNames: 'assets/[name].[ext]',
        chunkFileNames: `chunks/[name].${format === 'cjs' ? 'cjs' : 'js'}`,
        entryFileNames: `[name].${format === 'cjs' ? 'cjs' : 'js'}`,
      })),
    },
  },
  // More on Vitest configuration: https://vitest.dev/config/
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './vitest.setup.ts',
    coverage: {
      provider: 'istanbul',
    },
  },
});
