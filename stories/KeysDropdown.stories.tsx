import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import KeysDropdown from '../components/common/KeysDropdown';

export default {
    title: 'Example/KeysDropdown',
    component: KeysDropdown,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof KeysDropdown>;

const Template: ComponentStory<typeof KeysDropdown> = (args) => (
    <KeysDropdown {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
    label: 'Key',
};

export const Example = Template.bind({});
Example.args = {
    label: 'Example Key',
    showIsMinorCheckbox: false,
};
