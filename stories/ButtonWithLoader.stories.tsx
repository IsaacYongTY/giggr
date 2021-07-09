import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import ButtonWithLoader from "../components/common/ButtonWithLoader";

export default {
    title: 'Example/ButtonWithLoader',
    component: ButtonWithLoader,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ButtonWithLoader>;

const Template: ComponentStory<typeof ButtonWithLoader> = (args) => <ButtonWithLoader {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    primary: true,
    label: 'Button',
};

export const Secondary = Template.bind({});
Secondary.args = {
    label: 'Button',
};

export const Large = Template.bind({});
Large.args = {
    size: 'large',
    label: 'Button',
};

export const Small = Template.bind({});
Small.args = {
    size: 'small',
    label: 'Button',
};
