import React from 'react';
import AccountCard from '../components/AccountCard';
import { Story, Meta } from '@storybook/react/types-6-0';
import { IntlProvider } from 'react-intl';

export default {
  title: 'AccountCard',
  component: AccountCard,
} as Meta;

const Template: Story<any> = (args) => (
  <IntlProvider locale="en">
    <AccountCard {...args} />
  </IntlProvider>
);

export const accountCard = Template.bind({});
accountCard.args = {
  title: '現預金 残高合計',
  amount: 1131011,
};
