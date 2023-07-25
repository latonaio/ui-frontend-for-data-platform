import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Checkbox } from './Checkbox';

export default {
  title: 'components/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof Checkbox>;

const Template: ComponentStory<typeof Checkbox> = (args) =>
  <Checkbox {...args}>テスト</Checkbox>;

const CheckboxElm = Template.bind({});

export {
  CheckboxElm,
};
