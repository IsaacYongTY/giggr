import React, {useRef, useState} from "react";
import styles from "./index.module.scss";
import axios from "axios";
import Song from "../../../lib/types/song";

export default function ActionPopup({ handleOpenModal, handleHover, song, setIsShowPopup, handleDeleteSong} : any) {

    const actionRow = useRef(null);

    return (

        <div
            ref={actionRow}
            className={`${styles.container} `}
            onMouseEnter={() => setIsShowPopup(true)}
            onMouseLeave={() => setIsShowPopup(false)}
        >
            <span className="material-icons" onClick={() => handleOpenModal(song)}>
                edit
            </span>

            <span className="material-icons"
                  onClick={() => handleDeleteSong(song.id)}
            >
                delete
            </span>
        </div>
    )
}