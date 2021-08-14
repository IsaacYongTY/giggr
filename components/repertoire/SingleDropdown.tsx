import React from 'react';
import styles from '../../assets/scss/components/repertoire/_musicians-multi-select-dropdown.module.scss';

import { capitalizeString } from '../../lib/library';
import Select from 'react-select';

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
        <div className={styles.container}>
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
