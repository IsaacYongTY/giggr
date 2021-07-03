import React, { Dispatch, SetStateAction} from "react"
import styles from "../../assets/scss/components/common/_alert-box.module.scss"

interface Props {
    alertMessage: string
    setAlertMessage: Dispatch<SetStateAction<string>>
}
export default function AlertBox({ alertMessage, setAlertMessage } : Props) {

    return (
        <>
            {

                <div className={`${styles.alertBox} ${styles.success} `}>
                    {alertMessage}
                    <span
                        className={`${styles.cross} material-icons`}
                        onClick={() => setAlertMessage("")}
                    >
                        close
                    </span>
                </div>
            }
        </>

    )
}
