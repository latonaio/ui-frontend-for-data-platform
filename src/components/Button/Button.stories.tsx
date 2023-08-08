import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { BackButton } from './Button';

export default {
  title: 'components/Button',
  component: BackButton,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof BackButton>;

const Template: ComponentStory<typeof BackButton> = (args) => <BackButton {...args} />;

export const Normal = Template.bind({});
Normal.args = {
  className: '',
};
