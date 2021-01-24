import React from 'react';
import HeaderIcon from '../components/HeaderIcon';
import { Story, Meta } from '@storybook/react/types-6-0';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faChartPie,
  faHome,
  faBookOpen,
  faBook,
  faPen,
  faSignal,
  faCog,
} from '@fortawesome/free-solid-svg-icons';
library.add(faChartPie, faHome, faBookOpen, faBook, faPen, faSignal, faCog);

export default {
  title: 'HeaderIcon',
  component: HeaderIcon,
} as Meta;

const Template: Story<any> = (args) => <HeaderIcon {...args} />;

export const home = Template.bind({});
home.args = {
  icon: 'home',
};

export const bookOpen = Template.bind({});
bookOpen.args = {
  icon: 'book-open',
};

export const book = Template.bind({});
book.args = {
  icon: 'book',
};

export const pen = Template.bind({});
pen.args = {
  icon: 'pen',
};

export const signal = Template.bind({});
signal.args = {
  icon: 'signal',
};

export const config = Template.bind({});
config.args = {
  icon: 'cog',
};
