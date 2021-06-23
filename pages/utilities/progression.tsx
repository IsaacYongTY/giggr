import React, {ChangeEvent, useState} from "react"
import Layout from "../../components/layouts/Layout";
import Select from "react-select";
import KeysDropdown from "../../components/KeysDropdown";
import {ValueType} from "react-select";
import styles from "../../assets/scss/pages/_progression.module.scss";
import {
    assignChordsToProg,
    createChordsInKey,
    fullBarProg,
    halfBarProg,
    keyMap
} from "../../lib/utils/progression-generator-functions";

interface Form {
    key: number
    progression: string,
    isFullBar: boolean
}

interface OptionType {
    value: string,
    label: string
}

export default function Progression() {
    const defaultKey = keyMap[0]

    const [form, setForm] = useState<Form>({
        key: defaultKey.id,
        progression: "",
        isFullBar: true

    })

    const [prog, setProg] = useState("")

    const options = [
        {value: "15654325", label: "Canon Progression (15654325)"},
        {value: "45362511", label: "Typical Ballad Progression (45362511)"}
    ]

    function handleChange(selectedOption: ValueType<OptionType, false>) {

        if(selectedOption) {
            setForm(prevState => ({...prevState, progression: selectedOption.value}))
        }
    }

    console.log(form)

    function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
        setForm(prevState => ({...prevState, [e.target.name]: e.target.value}))
    }

    function handleRadioChange(e: ChangeEvent<HTMLInputElement>) {
        if(e.target.name === "fullBar") {
            setForm(prevState => ({...prevState, isFullBar: true}))
            return
        }
        setForm(prevState => ({...prevState, isFullBar: false}))
    }

    function handleGenerateProg() {
        let { key, progression, isFullBar } = form || {}
        let spacing = 12
        let notesInKeyArray = createChordsInKey(key)
        let chordsProgressionArray = assignChordsToProg(notesInKeyArray,progression)

        setProg(prevState => prevState + "\n" + (isFullBar ? fullBarProg(chordsProgressionArray, spacing) : halfBarProg(chordsProgressionArray, spacing)))
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
                                onChange={handleInputChange}
                            />
                        </label>
                    </div>

                </div>

                <div className={styles.radioRow}>
                    <label>
                        <input type="radio" name="fullBar" onChange={handleRadioChange} checked={form.isFullBar} />
                        <span>Full bar</span>
                    </label>
                    <label>
                        <input type="radio" name="halfBar" onChange={handleRadioChange} checked={!form.isFullBar}/>
                        <span>Half bar</span>
                    </label>
                </div>
                <label>
                    <div>Result:</div>
                    <textarea
                        className={`${styles.textarea} form-control`}
                        value={prog}
                        onChange={(e) => setProg(e.target.value)}
                    />
                </label>

                <div className={styles.buttonRow}>
                    <button className="btn btn-primary" onClick={handleGenerateProg}>Generate</button>
                    <button className={"btn btn-danger"}>Clear</button>
                </div>


            </div>
        </Layout>
    )
}