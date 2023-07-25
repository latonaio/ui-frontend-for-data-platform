import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Arrow } from './Arrow';

export default {
  title: 'components/Arrow',
  component: Arrow,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof Arrow>;

const Template: ComponentStory<typeof Arrow> = (args) =>
  <Arrow {...args}></Arrow>;

const ArrowElm = Template.bind({});


export {
  ArrowElm,
};
