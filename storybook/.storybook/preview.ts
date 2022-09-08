import 'vue-library-template-components/dist/style.css';

export const parameters = {
  controls: {
    // More on full docs for controls: https://storybook.js.org/docs/vue/essentials/controls#show-full-documentation-for-each-property
    expanded: true,
    // More on sorting controls: https://storybook.js.org/docs/vue/essentials/controls#sorting-controls
    sort: 'alpha',
  },
  // More on story layout: https://storybook.js.org/docs/vue/configure/story-layout
  layout: 'centered',
  options: {
    // More on sorting stories: https://storybook.js.org/docs/vue/writing-stories/naming-components-and-hierarchy#sorting-stories
    storySort: {
      method: 'alphabetical',
      order: ['Overview', 'Atoms'],
    },
  },
  // More on a11y tests configuration: https://storybook.js.org/docs/vue/writing-tests/accessibility-testing#configure
  a11y: {},
};
