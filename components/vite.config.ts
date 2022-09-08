/// <reference types="vitest" />
import { defineConfig } from 'vite';
import { createVuePlugin } from 'vite-plugin-vue2';

// More on Vite configuration: https://vitejs.dev/config/
export default defineConfig({
  plugins: [createVuePlugin()],
  build: {
    // More on Vite library mode: https://vitejs.dev/guide/build.html#library-mode
    lib: {
      entry: './src/main.ts',
      formats: ['es', 'cjs'],
      fileName: '[name]',
    },
    minify: false,
    target: 'esnext',
    rollupOptions: {
      external: ['@vue/composition-api', 'vue'],
      output: {
        preserveModules: true,
        exports: 'named',
      },
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
