import { action } from '@storybook/addon-actions';
import type { Meta, StoryFn } from '@storybook/vue';
import {
  ActionButton,
  ActionButtonVariant,
} from 'vue-library-template-components';
import { StoryArgCategory, StoryArgs } from './types';

type ActionButtonStoryArgs = StoryArgs<
  typeof ActionButton,
  {
    slotDefault?: string;
    onClick?: (event: Event) => void;
  }
>;

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
const metadata: Meta<ActionButtonStoryArgs> = {
  title: 'Atoms/ActionButton',
  component: ActionButton,
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
    variant: {
      description: 'Button style variant',
      type: { name: 'string', required: false },
      control: 'radio',
      options: [
        ActionButtonVariant.primary,
        ActionButtonVariant.secondary,
        ActionButtonVariant.default,
      ],
      table: {
        type: {
          summary: 'string',
          detail:
            'One of the variant names defined by ActionButtonVariant enum',
        },
        defaultValue: { summary: ActionButtonVariant.default },
        category: StoryArgCategory.Props,
      },
    },
    slotDefault: {
      name: '#default',
      description: 'Button caption',
      type: 'string',
      control: 'text',
      table: {
        type: { summary: 'string' },
        category: StoryArgCategory.Slots,
      },
    },
    onClick: {
      name: '@click',
      description: 'Click event listener',
      type: 'function',
      table: {
        type: { summary: 'function' },
        category: StoryArgCategory.Events,
      },
    },
  },
  args: {
    onClick: action('click'),
  },
};

export default metadata;

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template: StoryFn<ActionButtonStoryArgs> = (_args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { ActionButton },
  template:
    '<ActionButton :variant="variant" @click="onClick">{{ slotDefault }}</ActionButton>',
});

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
Primary.args = {
  variant: ActionButtonVariant.primary,
  slotDefault: 'Primary Button',
};

export const Secondary = Template.bind({});
Secondary.args = {
  variant: ActionButtonVariant.secondary,
  slotDefault: 'Secondary Button',
};

export const Default = Template.bind({});
Default.args = {
  variant: ActionButtonVariant.default,
  slotDefault: 'Default Button',
};
