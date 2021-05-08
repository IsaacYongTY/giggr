import React from "react"
import styles from "./AlertBox.module.scss"

export default function AlertBox() {

    return (
        <div className={`${styles.alertBox} ${styles.success} `}>
            Success or fail message
            <span className={`${styles.cross} material-icons`}>close</span>

        </div>
    )
}
