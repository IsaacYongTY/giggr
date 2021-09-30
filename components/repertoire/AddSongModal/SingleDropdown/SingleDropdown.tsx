import React from 'react';
import classnames from 'classnames/bind';
import Select from 'react-select';

import { capitalizeString } from '../../../../lib/library';

import styles from './SingleDropdown.module.scss';

const cx = classnames.bind(styles);

type Props = {
    name: string;
    options: any;
    currentSelection: string;
    setFormValue: any;
};

export default function SingleDropdown({
    name,
    options,
    currentSelection,
    setFormValue,
}: Props) {
    function handleChange(selectedOption: any) {
        setFormValue((prevState: any) => ({
            ...prevState,
            [name]: selectedOption.value,
        }));
    }

    return (
        <div className={cx('container')}>
            <Select
                value={{
                    value: currentSelection,
                    label: capitalizeString(currentSelection),
                }}
                options={options?.map((option: any) => ({
                    value: option,
                    label: capitalizeString(option),
                }))}
                className="basic-single"
                onChange={handleChange}
            />
        </div>
    );
}
