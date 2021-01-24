import React from 'react';
import Loading from '../components/Loading';
import { Story, Meta } from '@storybook/react/types-6-0';
import 'semantic-ui-css/semantic.min.css';

export default {
  title: 'Loading',
  component: Loading,
} as Meta;

const Template: Story<any> = (args) => <Loading {...args} />;

export const loading = Template.bind({});
loading.args = {
  isDataFetching: true,
};

export const notLoading = Template.bind({});
notLoading.args = {
  isDataFetching: false,
};
