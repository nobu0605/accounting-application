import React from 'react';
import UserDropdown from '../components/UserDropdown';
import { Story, Meta } from '@storybook/react/types-6-0';
import 'semantic-ui-css/semantic.min.css';

export default {
  title: 'UserDropdown',
  component: UserDropdown,
} as Meta;

const Template: Story<any> = (args) => <UserDropdown {...args} />;

export const User = Template.bind({});
User.args = {
  userName: 'suzuki',
  isBorderRight: true,
};
