import React, { useRef } from 'react';
import classnames from 'classnames/bind';

import { Song } from 'common/types';

import styles from './ActionPopup.module.scss';

const cx = classnames.bind(styles);

type ActionPopupProps = {
    handleOpenModal: (song: Song) => void;
    song: Song;
    setIsShowPopup: (show: boolean) => void;
    handleOpenConfirmModal: (song: Song) => void;
};
export default function ActionPopup({
    handleOpenModal,
    song,
    setIsShowPopup,
    handleOpenConfirmModal,
}: ActionPopupProps) {
    const actionRow = useRef(null);

    return (
        <div
            ref={actionRow}
            className={cx('container')}
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
