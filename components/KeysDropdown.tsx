import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import styles from "../assets/scss/components/_react-musicians-dropdown.module.scss";
import Musician from "../lib/types/musician";
import CreatableSelect from "react-select/creatable";
import Select from "react-select";
import {capitalizeString} from "../lib/library";
import {capitalize} from "@material-ui/core";

type Props = {

    options: any
    currentSelection: string,
    setFormValue: any
    attribute: string
    isSearchable?: boolean
}


export default function KeysDropdown({ options, currentSelection, setFormValue, attribute, isSearchable = false }: Props) {

    console.log(options)
    const [op, setOp] = useState([])
    console.log(currentSelection)
    function handleChange(selectedOption: any) {
        console.log(selectedOption)
        setFormValue((prevState : any) => {
            const currentData = { ...prevState, [attribute]: selectedOption.value}
            console.log(currentData)
            return currentData
        })
    }

    console.log(op)
    // useEffect(() => {
    //     console.log(options)
    //     setOp(options.map((option: any) => ({ value: option.name, label: capitalizeString(option.name)})))
    // },[isMinor])

    return (
        <div className={styles.container}>
            <Select
                name="musician"
                // closeMenuOnSelect={false}
                value={{value: currentSelection, label: capitalizeString(currentSelection)}}
                options={options.map((option: any) => ({ value: option.name, label: capitalizeString(option.name)}))}
                className="basic-single"
                // classNamePrefix="select"
                onChange={handleChange}
                isSearchable={isSearchable}
                // value={options.find(option => option.value === musician)}

            />

        </div>
    )
}