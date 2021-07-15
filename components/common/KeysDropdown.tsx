import React, {ChangeEvent, Dispatch, SetStateAction, useEffect, useState} from "react";
import styles from "../../assets/scss/components/common/_keys-dropdown.module.scss";

import Select from "react-select";

import convertKeyModeIntToKey from "../../lib/utils/convert-key-mode-int-to-key";
import convertKeyToKeyModeInt from "../../lib/utils/convert-key-to-key-mode-int";

import { majorKeyArray, minorKeyArray } from "../../lib/data/data";
import convertRelativeKey from "../../lib/utils/convert-relative-key";
import Form from "../../lib/types/Form";

type Props = {
    label: string
    keyProp?: "key" | "myKey"
    form: Form
    setForm: Dispatch<SetStateAction<any>>
    defaultKey?: string
    showIsMinorCheckbox? : boolean
}

interface OptionType {
    value: string,
    label: string,

}

export default function KeysDropdown({ label, keyProp = "key", form, setForm, defaultKey, showIsMinorCheckbox=true }: Props) {

    const minorKeyOptions = minorKeyArray.map(key => ({value: key, label: key}))
    const majorKeyOptions = majorKeyArray.map(key => ({value: key, label: key}))

    const [keyOptions, setKeyOptions] = useState<OptionType[]>([])

    function toggleMinor(e: ChangeEvent<HTMLInputElement>) {

        if(keyProp !== "key" && keyProp !== "myKey") return
        const currentKeyString = convertKeyModeIntToKey(form[keyProp], form.mode)


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
            setForm((prevState: any) => ({...prevState, [keyProp]: key, mode}))
            return
        }

        const relativeMajor = convertRelativeKey(currentKeyString)
        const [key, mode] = convertKeyToKeyModeInt(relativeMajor)
        setKeyOptions(majorKeyOptions)
        setForm((prevState: any) => ({...prevState, [keyProp]: key, mode}))

    }

    function handleChange(selectedOption: any) {
        let [selectedKey, selectedMode] : number[] = convertKeyToKeyModeInt(selectedOption.value)
        setForm((prevState : any) => ({ ...prevState, [keyProp]: selectedKey, mode: selectedMode }))
    }


    useEffect(() => {

        const [_, defaultMode] = convertKeyToKeyModeInt(defaultKey || "")
        if(defaultKey) {
            let foundKey = majorKeyOptions.find(option => option.value === defaultKey)

            if(foundKey) {
                let [key, mode] = convertKeyToKeyModeInt(foundKey.value)
                setForm((prevState: any) => ({...prevState, [keyProp]: key, mode }))
                // setKey(foundKey)
            }
        }

        if(form?.mode === 0 && defaultMode === undefined) {
            setKeyOptions(minorKeyOptions)

            return
        }

        setKeyOptions(majorKeyOptions)

    },[])

    return (
        <div className={styles.container}>
            <label>{label}:
                <Select
                    name="musician"
                    value={{
                        value: convertKeyModeIntToKey(form[keyProp], form?.mode),
                        label: convertKeyModeIntToKey(form[keyProp], form?.mode),
                    }}
                    options={keyOptions}
                    className="basic-single"
                    onChange={handleChange}
                    isSearchable={false}
                />
            </label>
            {
                showIsMinorCheckbox &&
                <label className={styles.checkbox}>
                    <input type="checkbox" defaultChecked={form?.mode === 0} onChange={toggleMinor}/>
                    Minor
                </label>
            }


        </div>
    )
}