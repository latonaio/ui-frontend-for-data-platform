import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Detail } from './Detail';

export default {
  title: 'components/Content/Detail/Detail',
  component: Detail,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof Detail>;

const Template: ComponentStory<typeof Detail> = (args) =>
  <Detail {...args}>テスト</Detail>;

const DetailElm = Template.bind({});

export {
  DetailElm,
};
