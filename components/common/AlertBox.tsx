import React, {Dispatch, SetStateAction, useEffect, useState} from "react"
import styles from "../../assets/scss/components/common/_alert-box.module.scss"

interface Props {
    message: string
    type: string
    timeoutInMs?: number
}
export default function AlertBox({ message, type, timeoutInMs = 3000 } : Props) {

    let displayStyle

    const [ isShow, setIsShow ] = useState(true)

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

    useEffect(() => {
        setIsShow(true)

        const timer = setTimeout(() => {
            setIsShow(false)
        },timeoutInMs)

        return () => {
            clearTimeout(timer)
        }

    },[message])

    function handleClose() {
        setIsShow(false)
    }
    return (
        <>
            {
                isShow && message &&
                <div className={`${styles.alertBox} ${displayStyle} `}>
                    {message}
                    <span
                        className={`${styles.cross} material-icons`}
                        onClick={handleClose}
                    >
                        close
                    </span>
                </div>
            }
        </>

    )
}
