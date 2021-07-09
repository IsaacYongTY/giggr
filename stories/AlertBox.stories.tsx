import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import AlertBox from "../components/common/AlertBox";

export default {
    title: 'Example/AlertBox',
    component: AlertBox,
} as ComponentMeta<typeof AlertBox>;

const Template: ComponentStory<typeof AlertBox> = (args) => <AlertBox{...args} />;

export const LoggedIn = Template.bind({});
LoggedIn.args = {

};

export const LoggedOut = Template.bind({});
LoggedOut.args = {};