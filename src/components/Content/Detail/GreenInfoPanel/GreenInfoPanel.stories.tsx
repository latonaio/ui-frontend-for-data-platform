import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { GreenInfoPanel } from './GreenInfoPanel';

export default {
  title: 'components/Content/Detail/GreenInfoPanel',
  component: GreenInfoPanel,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof GreenInfoPanel>;

const Template: ComponentStory<typeof GreenInfoPanel> = (args) =>
  <GreenInfoPanel {...args}></GreenInfoPanel>;

const GreenInfoPanelElm = Template.bind({});


export {
  GreenInfoPanelElm,
};
