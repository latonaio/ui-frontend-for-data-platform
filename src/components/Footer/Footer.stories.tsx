import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { store } from '@/store/store';
import { Footer } from './Footer';

export default {
  title: 'components/Footer',
  component: Footer,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof Footer>;

const Template: ComponentStory<typeof Footer> = (args) => <Footer {...args} />;

export const Normal = Template.bind({});
Normal.args = {
  className: '',
};
