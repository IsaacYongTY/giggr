import React, { Dispatch, SetStateAction} from "react"
import styles from "../../assets/scss/components/common/_alert-box.module.scss"

interface Props {
    alertMessage: string
    setAlertMessage: Dispatch<SetStateAction<string>>
    type?: string
}
export default function AlertBox({ alertMessage, setAlertMessage, type } : Props) {

    let displayStyle

    switch(type) {
        case "fail":
            displayStyle = styles.fail
            break;
        case "success":
            displayStyle = styles.success
            break;
        default:
            displayStyle = ""
    }

    return (
        <>
            {

                <div className={`${styles.alertBox} ${displayStyle} `}>
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
