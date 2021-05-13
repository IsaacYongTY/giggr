import React, { useState, useEffect } from "react"
import styles from "./AlertBox.module.scss"

export default function AlertBox({ message, timeout, setIsAlertOpen } : any) {

    useEffect(() => {
        setTimeout(() => {
            setIsAlertOpen(false)
        }, timeout * 1000)
    }, [])

   const [isOpen, setIsOpen] = useState(true)
    return (
        <>
            {

                <div className={`${styles.alertBox} ${styles.success} `}>
                    {message}
                    <span
                        className={`${styles.cross} material-icons`}
                        onClick={() => setIsAlertOpen(false)}
                    >
                        close
                    </span>
                </div>
            }
        </>

    )
}
