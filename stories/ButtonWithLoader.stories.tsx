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

export const Loading = Template.bind({});
Loading.args = {
    label: 'Get From Spotify',
    isLoading: true
};


