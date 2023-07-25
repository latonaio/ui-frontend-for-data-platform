import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { BackButton, GreenButton } from './Button';

export default {
  title: 'components/Button',
  component: BackButton,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof BackButton>;

const Template: ComponentStory<typeof BackButton> = (args) =>
  <BackButton {...args}>テスト</BackButton>;

const Template1: ComponentStory<typeof BackButton> = (args) =>
  <GreenButton {...args}>テスト</GreenButton>;

const BackButtonElm = Template.bind({});
const GreenButtonElm = Template1.bind({});

export {
  BackButtonElm,
  GreenButtonElm,
};
