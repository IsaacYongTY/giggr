import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import KeysDropdown from "../components/repertoire/KeysDropdown"

export default {
    title: 'Example/KeysDropdown',
    component: KeysDropdown,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof KeysDropdown>;

const Template: ComponentStory<typeof KeysDropdown> = (args) => <KeysDropdown {...args} />;

export const Primary = Template.bind({});
Primary.args = {

};

export const Loading = Template.bind({});
Loading.args = {

};


