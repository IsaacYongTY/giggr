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

};

export const Success = Template.bind({});
Success.args = {
    options: {
        message: "Success message",
        type: "success"
    }

};

export const Fail = Template.bind({});
Fail.args = {
    options: {
        message: "Fail message",
        type: "fail"
    },
};