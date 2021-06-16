import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import styles from "../assets/scss/components/_react-musicians-dropdown.module.scss";
import Musician from "../lib/types/musician";
import CreatableSelect from "react-select/creatable";
import {ActionMeta, ValueType } from "react-select/";

type Option = {
    value: string
    label: string
}

type Props = {

    options: any
    selectedArtist: string
    setFormValue: Dispatch<SetStateAction<Musician[]>>
}


export default function SingleArtistDropdown({ options, selectedArtist, setFormValue }: Props) {

    const [currentValue, setCurrentValue] = useState({value: "", label: ""})


    function handleChange(selectedOption: ValueType<Option, false>) {
        console.log(selectedOption)
        if(!selectedOption) {
            return
        }

        setCurrentValue(selectedOption)
        setFormValue(prevState => {
            console.log(prevState)
            return {...prevState, artist: selectedOption.value }
        })
    }


    useEffect(() => {
        console.log(selectedArtist)
        console.log(options)
        setCurrentValue({value: selectedArtist, label: selectedArtist})
    }, [])

    console.log(currentValue)
    return (
        <div className={styles.container}>
            <CreatableSelect
                name="musician"
                // closeMenuOnSelect={false}
                value={currentValue}
                options={options}
                className="basic-single"
                classNamePrefix="select"
                onChange={handleChange}
                // value={options.find(option => option.value === musician)}

            />

        </div>
    )
}