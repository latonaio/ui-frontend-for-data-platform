import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { store } from '@/store/store';
import { Provider } from 'react-redux';

import { LoginForm } from './LoginForm';

export default {
  title: 'components/LoginForm',
  component: LoginForm,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof LoginForm>;

const Template: ComponentStory<typeof LoginForm> = (args) =>
  <Provider store={store}>
    <LoginForm {...args} />
  </Provider>;

export const Normal = Template.bind({});
Normal.args = {
  className: '',
};
