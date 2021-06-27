import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import styles from "../assets/scss/components/_react-musicians-dropdown.module.scss";
import Musician from "../lib/types/musician";
import CreatableSelect from "react-select/creatable";

interface Option {
    value: string,
    label: string
}

type Props = {

    options: any
    label: string
    selectedCategories: Option[]
    setFormValue: Dispatch<SetStateAction<any>>
    role: string
}

interface Option {
    value: string,
    label: string
}


export default function CategoriesDropdown({ options, label, selectedCategories, setFormValue, role }: Props) {

    const [ops, setOps] = useState<Option[]>([])
    function handleChange(selectedOptions: any) {
        console.log(selectedOptions)
        setFormValue((prevState : any) => {
            console.log(prevState)
            return ({...prevState, [role]: selectedOptions})
        })
    }

    useEffect(() => {

        setOps(options?.map((option : any) => ({ value: option.name, label: option.name })))
    },[])


    return (
        <div className={styles.container}>
            <label>
                <p>{label}:</p>
                <CreatableSelect
                    name="musician"
                    // closeMenuOnSelect={false}
                    value={selectedCategories}
                    isMulti
                    options={ops}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    onChange={handleChange}
                    // value={options.find(option => option.value === musician)}

                />
            </label>

        </div>
    )
}