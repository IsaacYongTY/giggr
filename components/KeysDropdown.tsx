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

            setFormValue((prevState: any) => ({...prevState, key, mode}))
            return
        }

        const relativeMajor = convertRelativeKey(currentKeyString)
        const [key, mode] = convertKeyToKeyModeInt(relativeMajor)

        setFormValue((prevState: any) => ({...prevState, key, mode}))

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
            <label className={styles.checkbox}>
                <input type="checkbox" defaultChecked={formValue.mode === 0} onChange={toggleMinor}/>
                Minor
            </label>

        </div>
    )
}