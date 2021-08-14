import React, { useRef, useState } from 'react';
import styles from '../../assets/scss/components/repertoire/_action-popup.module.scss';

export default function ActionPopup({
    handleOpenModal,
    song,
    setIsShowPopup,
    handleDeleteSong,
    handleOpenConfirmModal,
}: any) {
    const actionRow = useRef(null);

    return (
        <div
            ref={actionRow}
            className={`${styles.container} `}
            onMouseEnter={() => setIsShowPopup(true)}
        >
            <span
                className="material-icons"
                onClick={() => handleOpenModal(song)}
            >
                edit
            </span>

            <span
                className="material-icons"
                onClick={() => handleOpenConfirmModal(song)}
            >
                delete
            </span>
        </div>
    );
}
