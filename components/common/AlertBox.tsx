import React, {Dispatch, SetStateAction, useEffect, useState} from "react"
import styles from "../../assets/scss/components/common/_alert-box.module.scss"

interface Props {
    options: {
        message: string
        type: string
    }
}
export default function AlertBox({ options } : Props) {
    const { message, type } = options
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

    },[])

    let timer : NodeJS.Timeout;

    useEffect(() => {
        setIsShow(true)


        timer = setTimeout(() => {
            setIsShow(false)
        },3000)

        return () => {
            clearTimeout(timer)
        }

    },[options])

    function handleClose() {
        setIsShow(false)
    }
    return (
        <>
            {
                isShow &&
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
