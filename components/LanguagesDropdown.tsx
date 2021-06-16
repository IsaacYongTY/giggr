import React from "react";
import styles from "../assets/scss/components/_react-musicians-dropdown.module.scss";

import { capitalizeString } from "../lib/library";
import CreatableSelect from "react-select/creatable";


type Props = {
    options: any
    currentSelection: string,
    setFormValue: any
}


export default function LanguagesDropdown({ options, currentSelection, setFormValue }: Props) {

    function handleChange(selectedOption: any) {
        setFormValue((prevState : any) => ({ ...prevState, language: selectedOption.value}))
    }

    return (
        <div className={styles.container}>
            <CreatableSelect
                name="musician"
                value={{value: currentSelection, label: capitalizeString(currentSelection)}}
                options={options.map((option: any) => ({ value: option.name, label: capitalizeString(option.name)}))}
                className="basic-single"
                onChange={handleChange}
            />

        </div>
    )
}