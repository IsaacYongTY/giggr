import React, {ChangeEvent, useEffect, useState} from "react";
import styles from "../assets/scss/components/_react-musicians-dropdown.module.scss";

import Select from "react-select";

import convertKeyModeIntToKey from "../lib/utils/convert-key-mode-int-to-key";
import convertKeyToKeyModeInt from "../lib/utils/convert-key-to-key-mode-int";

import { majorKeyArray, minorKeyArray } from "../lib/data/data";

type Props = {
    formValue: any
    setFormValue: any

}

interface OptionType {
    value: string,
    label: string
}

export default function KeysDropdown({ formValue, setFormValue }: Props) {

    const [keyOptions, setKeyOptions] = useState<OptionType[]>([])

    const minorKeyOptions = minorKeyArray.map(key => ({value: key, label: key}))
    const majorKeyOptions = majorKeyArray.map(key => ({value: key, label: key}))


    function toggleMinor(e: ChangeEvent<HTMLInputElement>) {

        const currentKeyString = convertKeyModeIntToKey(formValue.key, formValue.mode)

        setKeyOptions(formValue.mode === 0 ? minorKeyOptions : majorKeyOptions)


        if(e.target.checked) {

            const foundIndex = majorKeyArray.findIndex(keyOption => keyOption === currentKeyString)
            const relativeMinor = minorKeyArray[foundIndex]
            const [relativeMinorKey, relativeMinorMode] = convertKeyToKeyModeInt(relativeMinor)
            setKeyOptions(minorKeyOptions)
            setFormValue((prevState: any) => {
                return {...prevState, key: relativeMinorKey, mode: relativeMinorMode}
            })
        } else {
            const foundIndex = minorKeyArray.findIndex(keyOption => keyOption === currentKeyString)
            const relativeMajor = majorKeyArray[foundIndex]
            const [relativeMajorKey, relativeMajorMode] = convertKeyToKeyModeInt(relativeMajor)
            setKeyOptions(majorKeyOptions)
            setFormValue((prevState: any) => {
                return {...prevState, key: relativeMajorKey, mode: relativeMajorMode}
            })
        }
    }

    function handleChange(selectedOption: any) {
        let [selectedKey, selectedMode] : number[] = convertKeyToKeyModeInt(selectedOption.value)
        setFormValue((prevState : any) => ({ ...prevState, key: selectedKey, mode: selectedMode }))
    }



    useEffect(() => {
        if(formValue.mode === 0) {
            setKeyOptions(minorKeyOptions)
            return
        }

        setKeyOptions(majorKeyOptions)
    },[])

    return (
        <div className={styles.container}>
            <label>Key:
                <Select
                    name="musician"
                    value={{value: convertKeyModeIntToKey(formValue.key, formValue.mode), label: convertKeyModeIntToKey(formValue.key, formValue.mode)}}
                    options={keyOptions}
                    className="basic-single"
                    onChange={handleChange}
                    isSearchable={false}
                />
            </label>
            <label>
                <input type="checkbox" defaultChecked={formValue.mode === 0} onChange={toggleMinor}/>
                Minor
            </label>

        </div>
    )
}