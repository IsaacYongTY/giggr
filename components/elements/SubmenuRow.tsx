import React from "react"
import styles from "./SubmenuRow.module.scss";

export default function SubmenuRow({ link, title }: any) {

    return (
        <div className={styles.row}>
            <a href={link}>
                {/*<div className="material-icons">*/}
                {/*    {icon}*/}
                {/*</div>*/}


                <div className={`${styles.title}`}>{title}</div>

            </a>
        </div>
    )
}
