import React, { useRef } from 'react';
import classnames from 'classnames/bind';

import { Song } from 'common/types';

import styles from './ActionPopup.module.scss';

const cx = classnames.bind(styles);

type ActionPopupProps = {
    handleOpenEditModal: (song: Song) => void;
    song: Song;
    setIsShowPopup: (show: boolean) => void;
    handleOpenConfirmDeleteModal: () => void;
};
export default function ActionPopup({
    handleOpenEditModal,
    song,
    setIsShowPopup,
    handleOpenConfirmDeleteModal,
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
                onClick={() => handleOpenEditModal(song)}
            >
                edit
            </span>

            <span
                className="material-icons"
                onClick={() => handleOpenConfirmDeleteModal()}
            >
                delete
            </span>
        </div>
    );
}
