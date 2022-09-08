# Vue.js 2 Component Library Template

> Project template for Vue.js 2.7 component library

## Features

- 📦 [PNPM](https://pnpm.io/) for package management
- ⚡ [Vite](https://vitejs.dev/) for library build
- 🧪 [Vitest](https://vitest.dev/) and [Vue Testing Library](https://testing-library.com/docs/vue-testing-library/intro/) for unit testing
- 📕 [Storybook](https://storybook.js.org/) for component presentation
- 🔍 [Rendering smoke tests](https://storybook.js.org/docs/vue/writing-tests/test-runner) for Storybook stories
- 👀 [Visual regression tests](https://storybook.js.org/docs/vue/writing-tests/visual-testing) for Storybook stories
- 🧑‍🦽 [Accessibility tests](https://storybook.js.org/docs/vue/writing-tests/accessibility-testing) for Storybook stories
- ✅ [TypeScript](https://www.typescriptlang.org/) for static type checking
- 🔬 [ESLint](https://eslint.org/) for static code analysis
- 💅 [Prettier](https://prettier.io/) for code formatting
- 🚢 [Changesets](https://github.com/changesets/changesets) for release management

## Getting Started

As a prerequisite make sure you have installed the following software.

- [Node.js](https://nodejs.org/) (at least current LTS release)
- [PNPM](https://pnpm.io/) package manager

Follow these steps to preview components in Storybook.

1. Install dependencies for all workspaces. Run this command in project root:

   ```bash
   pnpm install
   ```

2. Start development mode. Run this command in project root:

   ```bash
   pnpm dev
   ```

This will build the component library first and then start Storybook in development mode.

It should open your browser automatically. Or you can visit <http://localhost:6006> manually.

## Building for Production

Run the following command in project root to create production builds for both the library and Storybook.

```bash
pnpm build
```

Each workspace will have its distribution output in `dist` subdirectory.

## Linting Source Code

Run the following command in project root to lint source code in all workspaces.

```bash
pnpm lint
```

## Running Tests

Make sure either Storybook is running in development mode or a web server is hosting production build on <http://localhost:6006>. Then run the following command in project root to start automated tests.

```bash
pnpm test:run
```

Run unit tests of component library only by executing the command in `components` subdirectory.

## Continuous Integration

Run the following command to perform quality checks and production builds all at once.

```bash
pnpm ci
```

This will execute the following steps and bail if any of them does not succeed.

1. Lint source code in all workspaces
2. Type-check library source code
3. Run library unit tests
4. Perform library production build
5. Perform Storybook production build
6. Start web server hosting Storybook distribution
7. Run smoke tests, visual regression tests und accessibility tests for Storybook in parallel
8. Stop web server

## Publishing a Release

For each new feature or bugfix developers should add changesets by running the following command in project root.

```bash
pnpm changeset
```

It will ask some questions which workspaces have been changed and generate a Markdown file for each change in `.changeset` subdirectory.

To prepare a stable release run the following command in project root.

```bash
pnpm prepare:release
```

This will bump versions of workspaces according to changes recorded in `.changeset` subdirectory and update `CHANGELOG.md` files accordingly. The updated files should be committed to Git.

After that preparation the production build should be performed using `pnpm build` or `pnpm ci`.

If build succeeds the release can be published by running the following command in project root.

```bash
pnpm publish:release
```

Git tags created for that release should be pushed using `git push --follow-tags`.

## Publishing a Snapshot

Snapshot releases can be published the same way as described above but instead of `pnpm prepare:release` and `pnpm publish:release` run the following commands.

```bash
pnpm prepare:snapshot
pnpm publish:snapshot
```

This will include timestamps in bumped versions and publish packages with dist-tag `next` instead of `latest`.

## Notable Concepts

### Tree-Shakable Library Build

Library build sets Rollup option `output.preserveModules: true` to preserve separate module files. This ensures that module bundlers like Rollup and Webpack can drop components which are not used later on in applications.

### Type Declarations

Library build generates TypeScript declaration files for components using `vue-tsc`. This enables type safety for component props in applications.

### Storybook Type Checking

The generic utility type `StoryArgs` defined in `storybook/stories/types.ts` can be used to derive a type for story args based on Vue component type declaration. It picks prop types automatically and allows definition of additional args properties. This enables at least basic type safety for story args. For example, it yields an error when attempting to set args which are not specified (or derived from component's props).

### Visual Regression Tests and Accessibility Tests

[StoryShots](https://github.com/storybookjs/storybook/tree/main/addons/storyshots) addon with Puppeteer integration is installed to implement these additional tests.

It runs [image snapshot tests](https://github.com/storybookjs/storybook/tree/main/addons/storyshots/storyshots-puppeteer#imagesnapshots) for each story using `jest-image-snapshot`.

It runs [accessibility tests](https://github.com/storybookjs/storybook/tree/main/addons/storyshots/storyshots-puppeteer#axetest) using Axe and `jest-puppeteer-axe`.

### Changesets

[Changesets](https://github.com/changesets/changesets) are one solution for semantic version management in mono-repos. It works independent from Git by saving special Markdown files in `.changeset` subdirectory. Configuration file in this project template is set up to keep version of library and Storybook packages in sync.

## License

MIT
