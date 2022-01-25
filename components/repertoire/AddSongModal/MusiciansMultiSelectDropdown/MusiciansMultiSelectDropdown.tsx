import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import Musician from 'lib/types/musician';
import CreatableSelect from 'react-select/creatable';
import { ValueType } from 'react-select/';

import styles from '../ArtistsSingleDropdown/ArtistsSingleDropdown.module.scss';

type Props = {
    label: string;
    selectedMusicians: Option[];
    setFormValue: Dispatch<SetStateAction<any>>;
    musicians: Musician[];
    role: string;
};

interface Option {
    value: string;
    label: string;
}

export default function MusiciansMultiSelectDropdown({
    musicians,
    label,
    selectedMusicians,
    setFormValue,
    role,
}: Props) {
    const [options, setOptions] = useState<Option[]>([]);

    function handleChange(selectedOptions: ValueType<Option, true>) {
        setFormValue((prevState: any) => ({
            ...prevState,
            [role]: selectedOptions,
        }));
    }

    useEffect(() => {
        setOptions(
            musicians.map((musician) => ({
                value: musician.name,
                label: musician.name,
            }))
        );
    }, []);

    return (
        <div className={styles.container}>
            <label>
                <p>{label}:</p>
                <CreatableSelect
                    name="musician"
                    // closeMenuOnSelect={false}
                    value={selectedMusicians}
                    isMulti
                    options={options}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    onChange={handleChange}
                    // value={options.find(option => option.value === musician)}
                />
            </label>
        </div>
    );
}
