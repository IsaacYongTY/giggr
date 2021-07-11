import React from "react"
import styles from "../../assets/scss/components/_menu-row.module.scss";

export default function MenuRow({ icon, link, title, action }: any) {

    return (
        <a href={link} className={styles.row} onClick={action}>

                <div className="material-icons">
                    {icon}
                </div>

                <div className={`${styles.title}`}>{title}</div>
        </a>
    )
}
