import React, { useState, useEffect } from "react"
import styles from "./AlertBox.module.scss"

export default function AlertBox() {

   const [isOpen, setIsOpen] = useState(true)
    return (
        <>
            {
                isOpen &&
                <div className={`${styles.alertBox} ${styles.success} `}>
                    Success or fail message
                    <span
                        className={`${styles.cross} material-icons`}
                        onClick={() => setIsOpen(false)}
                    >
                        close
                    </span>
                </div>
            }
        </>

    )
}
