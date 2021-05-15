import React from "react"
import styles from "./MenuRow.module.scss";

export default function MenuRow({ icon, link, title, action }: any) {

    return (
        <div className={styles.row} onClick={action}>
            <a href={link}>
                <div className="material-icons">
                    {icon}
                </div>

                <div className={`${styles.title}`}>{title}</div>
            </a>
        </div>
    )
}
