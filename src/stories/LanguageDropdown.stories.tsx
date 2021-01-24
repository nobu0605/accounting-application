import React from 'react';
import LanguageDropdown from '../components/LanguageDropdown';
import { Story, Meta } from '@storybook/react/types-6-0';
import 'semantic-ui-css/semantic.min.css';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import configureStore from '../store';

const store = configureStore();

export default {
  title: 'LanguageDropdown',
  component: LanguageDropdown,
} as Meta;

const Template: Story<any> = (args) => (
  <Provider store={store}>
    <IntlProvider locale="en">
      <LanguageDropdown {...args} />
    </IntlProvider>
  </Provider>
);

export const Japanese = Template.bind({});
Japanese.args = {
  language: 'ja',
};

export const English = Template.bind({});
English.args = {
  language: 'en',
};
