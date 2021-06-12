import React from "react";
import styles from "../assets/scss/components/_pill-button.module.scss"
type Props = {
    composer: any
    setFormValue: any
}
export default function PillButton({ composer, setFormValue }: Props) {

    function handleRemoveMusician(id : number) {
        setFormValue((prevState : any) => {
            let composers = prevState.composers.filter((composer : any) => composer.id !== id)

            return { ...prevState, composers}
        })
    }

    return(
        <button className={styles.container}>
            <span id={composer.id}>{composer.name}</span>
            <span className={`${styles.closeButton} material-icons`} onClick={() => handleRemoveMusician(composer.id)}>
                                close
                            </span>
        </button>
    )
}