import React from 'react';
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Login } from './Login';

export default {
  title: 'RSS/Page/Login',
  component: Login,
  parameters: {
    layout: 'fullscreen'
  }
} as ComponentMeta<typeof Login>

const Template: ComponentStory<typeof Login> = (args) => <Login />;

export const NewLogin = Template.bind({});

export const ConnectionError = Template.bind({});
