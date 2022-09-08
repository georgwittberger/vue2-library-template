/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest/presets/js-with-babel',
  testEnvironment: 'jsdom',
  transform: {
    '.+\\.mdx?$': '@storybook/addon-docs/jest-transform-mdx',
    '.+\\.vue$': 'jest-vue-preprocessor',
    '.+\\.svg$': 'jest-svg-transformer',
    '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$':
      'jest-transform-stub',
  },
  transformIgnorePatterns: ['/node_modules/(?!(@storybook/.+\\.vue$))'],
  moduleFileExtensions: ['vue', 'js', 'jsx', 'ts', 'tsx', 'json', 'node'],
};
