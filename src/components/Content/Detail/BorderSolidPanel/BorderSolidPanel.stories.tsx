import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { BorderSolidPanel } from './BorderSolidPanel';

export default {
  title: 'components/content/detail/BorderSolidPanel',
  component: BorderSolidPanel,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof BorderSolidPanel>;

const Template: ComponentStory<typeof BorderSolidPanel> = (args) =>
  <BorderSolidPanel {...args}></BorderSolidPanel>;

const BorderSolidPanelElm = Template.bind({});


export {
  BorderSolidPanelElm,
};
