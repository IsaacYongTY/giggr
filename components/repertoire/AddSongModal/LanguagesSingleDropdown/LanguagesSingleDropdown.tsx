import React from 'react';
import classnames from 'classnames/bind';
import CreatableSelect from 'react-select/creatable';

import { capitalizeString } from 'lib/library';

import styles from './LanguagesSingleDropdown.module.scss';

const cx = classnames.bind(styles);

type Props = {
    options: any;
    currentSelection: string;
    setFormValue: any;
};

export default function LanguagesSingleDropdown({
    options,
    currentSelection,
    setFormValue,
}: Props) {
    function handleChange(selectedOption: any) {
        setFormValue((prevState: any) => ({
            ...prevState,
            language: selectedOption.value,
        }));
    }

    return (
        <div className={cx('container')}>
            <CreatableSelect
                name="musician"
                value={{
                    value: currentSelection,
                    label: capitalizeString(currentSelection),
                }}
                options={options?.map((option: any) => ({
                    value: option.name,
                    label: capitalizeString(option.name),
                }))}
                className="basic-single"
                onChange={handleChange}
            />
        </div>
    );
}
