# Your Library Title Here

Your library introduction here.

## Getting Started

1. Install library as dependency in your project.

   ```bash
   # NPM
   npm install vue-library-template-components

   # Yarn
   yarn add vue-library-template-components

   # PNPM
   pnpm add vue-library-template-components
   ```

2. Import global stylesheet in your project.

   ```js
   import 'vue-library-template-components/dist/style.css';
   ```

   For [Nuxt.js](https://nuxtjs.org/) 2 add it to `css` section in `nuxt.config.js`:

   ```js
   // nuxt.config.js
   export default {
     css: ['vue-library-template-components/dist/style.css'],
   };
   ```

3. Import and use components.

   ```html
   <!-- MyComponent.vue -->
   <template>
     <ActionButton :variant="ActionButtonVariant.primary">
       Click me!
     </ActionButton>
   </template>

   <script lang="ts" setup>
     import {
       ActionButton,
       ActionButtonVariant,
     } from 'vue-library-template-components';
   </script>
   ```

## Changelog

See [CHANGELOG](./CHANGELOG.md)
