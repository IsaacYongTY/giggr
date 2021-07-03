import React, {ChangeEvent, useRef, useState} from "react"
import Layout from "../../components/layouts/Layout";
import Select, { ValueType } from "react-select";
import KeysDropdown from "../../components/KeysDropdown";
import styles from "../../assets/scss/pages/_progression.module.scss";
import {
    fullBarProg,
    halfBarProg,
    keyMap
} from "../../lib/utils/progression-generator-functions";
import CopyToClipboardButton from "../../components/common/CopyToClipboardButton";
import AlertBox from "../../components/common/AlertBox";

interface Form {
    key: number
    progression: string,
    isFullBar: boolean
    spaces: number
}

interface OptionType {
    value: string,
    label: string
}

interface SpacingOptionType {
    value: number
    label: number
}

export default function Progression() {
    const defaultKey = keyMap[0]

    const [form, setForm] = useState<Form>({
        key: defaultKey.id,
        progression: "",
        isFullBar: true,
        spaces: 12

    })

    const [prog, setProg] = useState("")
    const [isAlertOpen, setIsAlertOpen] = useState(false)
    const [alertMessage, setAlertMessage] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const textarea = useRef<HTMLTextAreaElement>(null)

    const options = [
        {value: "15654325", label: "Canon Progression (15654325)"},
        {value: "45362511", label: "Typical Ballad Progression (45362511)"},
        {value: "6415", label: "Top 40s 4-Chords 1 (6415)"},
        {value: "1564", label: "Top 40s 4-Chords 1 (1564)"},
        {value: "6251", label: "Circle Progression (6251)"}
    ]

    function handleChange(selectedOption: ValueType<OptionType, false>) {
        if(selectedOption) {
            setForm(prevState => ({...prevState, progression: selectedOption.value}))
        }
    }

    function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
        let newValue = e.target.value
        setForm(prevState => ({...prevState, [e.target.name]: newValue}))
    }

    function handleRadioChange(e: ChangeEvent<HTMLInputElement>) {
        if(e.target.name === "fullBar") {
            setForm(prevState => ({...prevState, spaces: 12, isFullBar: true}))
            return
        }
        setForm(prevState => ({...prevState, spaces: 14, isFullBar: false}))
    }

    function handleGenerateProg() {
        let { key, progression, isFullBar,  spaces } = form || {}

        if(!progression) {
            setErrorMessage("Please input progression")
            return
        }

        const invalidCharactersRegex = new RegExp("[^1-7#bmM]")
        const isInvalidProgression = invalidCharactersRegex.test(progression)

        if(isInvalidProgression) {
            setErrorMessage("Input is invalid. valid inputs are 1-7, b, #, m, and M")
            return
        }

        setProg(prevState => prevState +
            (isFullBar ? fullBarProg(key, progression, spaces) : halfBarProg(key, progression, spaces)) +
            "\n\n"
        )

        setErrorMessage("")
    }

    function handleSpacingChanges(selectedOption: ValueType<SpacingOptionType, false>) {
        if(!selectedOption) {
            return
        }
        setForm(prevState => ({...prevState, spaces: selectedOption.value}))
    }

    const user = {
        email: "isaac@gmail.com",
        tierId: 4
    }

    return (
        <Layout title="Progression Generator" user={user} >
            <div className={styles.container}>
                <div className={styles.inputRow}>
                    <div className={styles.keysDropdownContainer}>
                        <KeysDropdown
                            formValue={form}
                            setFormValue={setForm}
                            defaultKey={defaultKey.key}
                            showIsMinorCheckbox={false}
                        />
                    </div>

                    <div className={styles.progDropdownContainer}>
                        <label>
                            Common Progressions:
                            <Select
                                className="basic-single"
                                value={options.find(option => option.value === form.progression)}
                                options={options}
                                onChange={handleChange}
                            />
                        </label>
                    </div>

                    <div className={styles.inputContainer}>
                        <label>
                            Input:
                            <input
                                className="form-control"
                                type="text"
                                placeholder="1b73M4m5251..."
                                value={form.progression}
                                name="progression"
                                onChange={(e) => handleInputChange(e)}
                            />
                        </label>
                    </div>

                </div>

                {
                    errorMessage && <div>{errorMessage}</div>
                }
                <div className={styles.radioRow}>
                    <label>
                        <input type="radio" name="fullBar" onChange={handleRadioChange} checked={form.isFullBar} />
                        <span>Full bar</span>
                    </label>
                    <label>
                        <input type="radio" name="halfBar" onChange={handleRadioChange} checked={!form.isFullBar}/>
                        <span>Half bar</span>
                    </label>

                    <label>
                        Spaces:
                        <div className={styles.spacingDropdownContainer}>
                            <Select
                                className="basic-single"
                                value={{value: form.spaces, label: form.spaces}}
                                name="spaces"
                                options={[
                                    {value: 8, label: 8},
                                    {value: 10, label: 10},
                                    {value: 12, label: 12},
                                    {value: 14, label: 14},
                                ]}
                                onChange={handleSpacingChanges}
                            />
                        </div>
                    </label>


                </div>
                <div className={styles.textAreaContainer}>
                    <label>
                        <div>Result:</div>
                        <textarea
                            ref={textarea}
                            className={`${styles.textarea} form-control`}
                            value={prog}
                            onChange={(e) => setProg(e.target.value)}
                        />
                    </label>
                </div>


                <div className={styles.buttonRow}>
                    <button className="btn btn-danger" onClick={() => setProg("")}>Clear</button>
                    <CopyToClipboardButton sourceRef={textarea} setIsAlertOpen={setIsAlertOpen} setAlertMessage={setAlertMessage} />
                    <button className="btn btn-primary" onClick={handleGenerateProg}>Generate</button>

                </div>
                {
                    isAlertOpen && <AlertBox message={alertMessage} timeout={3} setIsAlertOpen={setIsAlertOpen}/>
                }

            </div>
        </Layout>
    )
}