import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { store } from '@/store/store';
import { Provider } from 'react-redux';

import { ContentsTop } from './ContentsTop';

export default {
  title: 'components/ContentsTop',
  component: ContentsTop,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof ContentsTop>;



const Template: ComponentStory<typeof ContentsTop> = (args) =>
  <Provider store={store}>
    <ContentsTop {...args} />
  </Provider>;

export const Normal = Template.bind({});
Normal.args = {
  className: '',
};
