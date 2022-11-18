/// <reference types="vitest" />
import vue from '@vitejs/plugin-vue2';
import { basename, resolve } from 'node:path';
import type { ModuleFormat } from 'rollup';
import { defineConfig } from 'vite';
import { subpackages } from './build/subpackages';
import packageJson from './package.json';

// More on Vite configuration: https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // More on Vue.js plugin: https://github.com/vitejs/vite-plugin-vue2
    vue(),
    // Generate separate subpackages for components to enable code splitting.
    subpackages({
      sourceDir: 'src',
      modulePatterns: ['components/**/index.ts'],
      packageJson: (info) => ({
        name: `${packageJson.name}-${basename(info.dir).toLowerCase()}`,
        version: packageJson.version,
        types: './index.d.ts',
      }),
    }),
  ],
  build: {
    // More on Vite library mode: https://vitejs.dev/guide/build.html#library-mode
    lib: {
      entry: { index: resolve(__dirname, 'src/index.ts') },
      name: 'VueLibraryTemplate',
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
