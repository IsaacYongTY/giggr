import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import styles from "../assets/scss/components/_react-musicians-dropdown.module.scss";
import Select from "react-select";
import {capitalizeString} from "../lib/library";


type Props = {

    options: any
    currentSelection: string,
    setFormValue: any
    attribute: string
    isSearchable?: boolean
}


export default function AttributeDropdown({ options, currentSelection, setFormValue, attribute, isSearchable = false }: Props) {

    function handleChange(selectedOption: any) {

        setFormValue((prevState : any) => {
            const currentData = { ...prevState, [attribute]: selectedOption.value}
            console.log(currentData)
            return currentData
        })
    }

    return (
        <div className={styles.container}>
            <Select
                name="musician"
                value={{value: currentSelection, label: capitalizeString(currentSelection)}}
                options={options.map((option: any) => ({ value: option.name, label: capitalizeString(option.name)}))}
                className="basic-single"
                onChange={handleChange}
                isSearchable={isSearchable}
            />

        </div>
    )
}