import React from "react";
import styles from "./GigItemRow.module.css";

export default function GigItemRow() {

    return (
        <div>
            <div className={styles.row}>
                <a href="gigs/1">Gig 1</a>
                <p>Katong V</p>
            </div>
            <div className={styles.row}>

                <p>11.30am - 3.30pm</p>
                <p>22/7/2021 </p>
            </div>
        </div>

    )
}