import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import styles from "../assets/scss/components/_react-musicians-dropdown.module.scss";
import Musician from "../lib/types/musician";
import CreatableSelect from "react-select/creatable";

type Props = {

    options: any
    selectedMusicians: Musician[]
    setSelectedMusicians: Dispatch<SetStateAction<Musician[]>>
}


export default function ReactMusiciansDropdown({ options, selectedMusicians, setSelectedMusicians }: Props) {

    function handleChange(selectedOptions: any) {
        setSelectedMusicians(selectedOptions)
    }

    return (
        <div className={styles.container}>
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

        </div>
    )
}