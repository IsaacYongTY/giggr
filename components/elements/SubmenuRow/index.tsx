import React from "react"
import styles from "./SubmenuRow.module.scss";

export default function SubmenuRow({ icon, link, title, action }: any) {

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
