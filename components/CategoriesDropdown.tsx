import React, {Dispatch, SetStateAction } from "react";
import styles from "../assets/scss/components/_react-musicians-dropdown.module.scss";
import Musician from "../lib/types/musician";
import CreatableSelect from "react-select/creatable";

interface Option {
    value: string,
    label: string
}

type Props = {

    options: any
    label: string
    selectedCategories: Option[]
    setFormValue: Dispatch<SetStateAction<any>>
}


export default function CategoriesDropdown({ options, label, selectedCategories, setFormValue }: Props) {

    function handleChange(selectedOptions: any) {
        setFormValue(selectedOptions)
    }

    return (
        <div className={styles.container}>
            <label>
                <p>{label}:</p>
                <CreatableSelect
                    name="musician"
                    // closeMenuOnSelect={false}
                    value={selectedCategories}
                    isMulti
                    options={options}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    onChange={handleChange}
                    // value={options.find(option => option.value === musician)}

                />
            </label>

        </div>
    )
}