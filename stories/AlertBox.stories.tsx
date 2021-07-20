import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import AlertBox from "../components/common/AlertBox";

export default {
    title: 'Example/AlertBox',
    component: AlertBox,
} as ComponentMeta<typeof AlertBox>;

const Template: ComponentStory<typeof AlertBox> = (args) => <AlertBox{...args} />;

export const Default = Template.bind({});
Default.args = {
    message: "",
    type: "",
    timeoutInMs: 5000
};

export const Success = Template.bind({});
Success.args = {
    message: "Success message",
    type: "success",
    timeoutInMs: 10000
};

export const Fail = Template.bind({});
Fail.args = {
    message: "Fail message",
    type: "fail"
};