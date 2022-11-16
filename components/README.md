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
   import 'vue-library-template-components/dist/assets/style.css';
   ```

   For [Nuxt.js](https://nuxtjs.org/) 2 add it to `css` section in `nuxt.config.js`:

   ```js
   // nuxt.config.js
   export default {
     css: ['vue-library-template-components/dist/assets/style.css'],
   };
   ```

3. Import and use components.

   Use static import for components without expensive third-party libraries.

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

   Use async component with dynamic import from specific submodule for components with expensive third-party libraries.

   ```html
   <!-- MyComponent.vue -->
   <template>
     <div>
       <button @click="videoVisible = !videoVisible">Toggle video</button>
       <VideoPlayer v-if="videoVisible" />
     </div>
   </template>

   <script lang="ts" setup>
     import { defineAsyncComponent, ref } from 'vue';

     const VideoPlayer = defineAsyncComponent(() =>
       import(
         'vue-library-template-components/dist/components/VideoPlayer'
       ).then(({ VideoPlayer }) => VideoPlayer)
     );
     const videoVisible = ref(false);
   </script>
   ```

## Changelog

See [CHANGELOG](./CHANGELOG.md)
