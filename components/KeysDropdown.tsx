import React, {ChangeEvent, useEffect, useState} from "react";
import styles from "../assets/scss/components/_keys-dropdown.module.scss";

import Select from "react-select";

import convertKeyModeIntToKey from "../lib/utils/convert-key-mode-int-to-key";
import convertKeyToKeyModeInt from "../lib/utils/convert-key-to-key-mode-int";

import { majorKeyArray, minorKeyArray } from "../lib/data/data";
import convertRelativeKey from "../lib/utils/convert-relative-key";

type Props = {
    formValue: any
    setFormValue: any
    defaultKey?: string
    showIsMinorCheckbox? : boolean
}

interface OptionType {
    value: string,
    label: string,

}

export default function KeysDropdown({ formValue, setFormValue, defaultKey, showIsMinorCheckbox=true }: Props) {

    const minorKeyOptions = minorKeyArray.map(key => ({value: key, label: key}))
    const majorKeyOptions = majorKeyArray.map(key => ({value: key, label: key}))

    const defaultOption = formValue.key > -1 && formValue.mode > -1
        ?
        {value: convertKeyModeIntToKey(formValue.key, formValue.mode), label: convertKeyModeIntToKey(formValue.key, formValue.mode)}
        :
        majorKeyOptions.find(option => option.value === defaultKey)

    const [keyOptions, setKeyOptions] = useState<OptionType[]>([])
    const [key, setKey] = useState(defaultOption)

    function toggleMinor(e: ChangeEvent<HTMLInputElement>) {

        const currentKeyString = convertKeyModeIntToKey(formValue.key, formValue.mode)

        if(!currentKeyString) {
            if(e.target.checked) {
                setKeyOptions(minorKeyOptions)
                return
            }
            setKeyOptions(majorKeyOptions)
            return
        }

        if(e.target.checked) {

            const relativeMinor = convertRelativeKey(currentKeyString)
            const [key, mode] = convertKeyToKeyModeInt(relativeMinor)

            setKeyOptions(minorKeyOptions)
            setKey({value: relativeMinor, label: relativeMinor })
            setFormValue((prevState: any) => ({...prevState, key, mode}))
            return
        }

        const relativeMajor = convertRelativeKey(currentKeyString)
        const [key, mode] = convertKeyToKeyModeInt(relativeMajor)
        setKeyOptions(majorKeyOptions)
        setKey({value: relativeMajor, label: relativeMajor })
        setFormValue((prevState: any) => ({...prevState, key, mode}))

    }

    function handleChange(selectedOption: any) {
        let [selectedKey, selectedMode] : number[] = convertKeyToKeyModeInt(selectedOption.value)
        setKey({value: selectedOption.value, label: selectedOption.label})
        setFormValue((prevState : any) => ({ ...prevState, key: selectedKey, mode: selectedMode }))
    }


    useEffect(() => {

        const [_, defaultMode] = convertKeyToKeyModeInt(defaultKey || "")

        if(formValue.mode === 0 && defaultMode === undefined) {
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
                    value={key}
                    options={keyOptions}
                    className="basic-single"
                    onChange={handleChange}
                    isSearchable={false}
                />
            </label>
            {
                showIsMinorCheckbox &&
                <label className={styles.checkbox}>
                    <input type="checkbox" defaultChecked={formValue.mode === 0} onChange={toggleMinor}/>
                    Minor
                </label>
            }


        </div>
    )
}