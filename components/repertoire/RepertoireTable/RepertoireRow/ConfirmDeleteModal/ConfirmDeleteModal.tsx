import React from 'react';
import classnames from 'classnames/bind';
import Modal from 'react-modal';

import styles from './ConfirmDeleteModal.module.scss';
import axios from '../../../../../config/axios';
import { trigger } from 'swr';
import { message } from 'antd';

const cx = classnames.bind(styles);

type ConfirmDeleteModalProps = {
    isOpen: boolean;
    songId: number;
    songTitle: string;
    onDeleteSongSuccess: () => void;
    onDeleteSongCancel: () => void;
};

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
    isOpen,
    songId,
    songTitle,
    onDeleteSongSuccess,
    onDeleteSongCancel,
}) => {
    const modalStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '40rem',
            height: '15rem',
            padding: '1rem 3rem',
            borderRadius: '1rem',
            backgroundColor: 'white',
        },
    };

    async function handleDeleteSong(id: number) {
        try {
            await axios.delete(`/api/v1/songs//${id}`);
            trigger('/api/v1/users?category=id&order=ASC');

            onDeleteSongSuccess();
        } catch (error) {
            message.error('Something went wrong. Please try again later.');
        }
    }

    return (
        <Modal isOpen={isOpen} style={modalStyles}>
            <div className={cx('modal-container')}>
                <div>
                    Are you sure you want to delete &quot;
                    {songTitle}
                    &quot;?
                </div>

                {/*{errorMessage && (*/}
                {/*    <div className="error-message">{errorMessage}</div>*/}
                {/*)}*/}

                <div className={cx('button-row')}>
                    <button
                        className="btn btn-secondary"
                        onClick={onDeleteSongCancel}
                    >
                        Cancel
                    </button>

                    <button
                        className="btn btn-danger"
                        onClick={() => handleDeleteSong(songId)}
                    >
                        Confirm Delete
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default ConfirmDeleteModal;
