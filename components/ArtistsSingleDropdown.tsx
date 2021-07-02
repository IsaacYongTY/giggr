import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import styles from "../assets/scss/components/_react-musicians-dropdown.module.scss";
import CreatableSelect from "react-select/creatable";
import { ValueType } from "react-select/";
import Musician from "../lib/types/musician";

type Option = {
    value: string
    label: string
}

type Props = {

    musicians: Musician[]
    selectedArtist: string
    setFormValue: Dispatch<SetStateAction<any>>
}


export default function SingleArtistDropdown({ musicians, selectedArtist, setFormValue }: Props) {

    const [currentValue, setCurrentValue] = useState({value: "", label: ""})
    const [options, setOptions] = useState<Option[]>([])

    function handleChange(selectedOption: ValueType<Option, false>) {
        if(!selectedOption) {
            return
        }

        setCurrentValue(selectedOption)
        setFormValue((prevState : any) => {
            return {...prevState, artist: selectedOption.value }
        })
    }

    useEffect(() => {
        setCurrentValue({value: selectedArtist, label: selectedArtist})
        setOptions(musicians.map(musician => ({ value: musician.name, label: musician.name})))
    }, [selectedArtist])

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
            />

        </div>
    )
}