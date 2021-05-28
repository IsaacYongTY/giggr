import React, {useRef} from "react";
import styles from "./index.module.scss";

export default function ActionPopup() {

    const actionRow = useRef(null);
    function handleOpenModal(song: any) {

    }
    const song = ''
    return (

        <div ref={actionRow} className={`${styles.cell} dev`}>
            <span className="material-icons" onClick={() => handleOpenModal(song)}>
                edit
            </span>

            <span className="material-icons" onClick={() => handleDeleteSong(song.id)}>
                delete
            </span>
        </div>
    )
}