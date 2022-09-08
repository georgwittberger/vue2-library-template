import initStoryshots from '@storybook/addon-storyshots';
import { axeTest } from '@storybook/addon-storyshots-puppeteer';

initStoryshots({ suite: 'A11y tests', test: axeTest() });
