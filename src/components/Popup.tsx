import React from 'react';
import { Input, Popup } from 'semantic-ui-react';

const PopupMessage = () => <Popup content="Add users to your feed" trigger={<Input />} />;

export default PopupMessage;
