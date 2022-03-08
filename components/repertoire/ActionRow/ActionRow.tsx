import React, { Dispatch, SetStateAction, useState } from 'react';

import CsvUploadContainer from './CsvUploadContainer';
import { Song } from 'common/types';
import AddSongModal from '../AddSongModal';
import Modal from 'react-modal';
import styles from '../RepertoireTable/RepertoireTable.module.scss';
import classnames from 'classnames/bind';
import axios from '../../../config/axios';
import { trigger } from 'swr';

interface Props {
    selectedSongs: Song[];
    data: any;
    onDeleteSongsSuccess: () => void;
}

const cx = classnames.bind(styles);

export default function ActionRow({
    selectedSongs,
    data,
    onDeleteSongsSuccess,
}: Props) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [isDeleteSongsModalOpen, setIsDeleteSongsModalOpen] = useState(false);
    //
    // function handleOpenConfirmDeleteSelectedModal(selectedSongs: Song[]) {
    //     setIsConfirmDeleteSelectedModalOpen(true);
    //     setSongsToDelete(selectedSongs);
    //     setErrorMessage('');
    // }
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
    function handleCloseModal() {
        setIsModalOpen(false);
    }

    async function handleDeleteSelectedSongs(selectedSongs: Song[]) {
        console.log('multiple songs deleted');

        const idArray = selectedSongs.map((song) => song.id);
        try {
            await axios.delete('/api/v1/songs', { data: { idArray } });

            trigger('/api/v1/users?category=id&order=ASC');

            setIsDeleteSongsModalOpen(false);
            onDeleteSongsSuccess();
        } catch (err) {
            console.log(err);
            // setErrorMessage('Something went wrong. Please try again later!');
        }
    }

    return (
        <>
            <div className="action-row">
                <button
                    className="btn btn-primary"
                    onClick={() => setIsModalOpen(true)}
                >
                    Add Song
                </button>
                <CsvUploadContainer />
                {selectedSongs.length > 0 && (
                    <button
                        className="btn btn-danger"
                        onClick={() => setIsDeleteSongsModalOpen(true)}
                    >
                        Delete Selected
                    </button>
                )}
            </div>

            <AddSongModal
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                data={data}
                handleCloseModal={handleCloseModal}
            />

            {isDeleteSongsModalOpen && (
                <Modal isOpen={isDeleteSongsModalOpen} style={modalStyles}>
                    <div className={cx('modal-container')}>
                        <div>
                            Are you sure you want to delete{' '}
                            {selectedSongs.length} items?
                        </div>

                        {/*{errorMessage && (*/}
                        {/*    <div className="error-message">{errorMessage}</div>*/}
                        {/*)}*/}
                        <div className={styles.buttonRow}>
                            <button
                                className="btn btn-secondary"
                                onClick={() => setIsDeleteSongsModalOpen(false)}
                            >
                                Cancel
                            </button>

                            <button
                                className="btn btn-danger"
                                onClick={() =>
                                    handleDeleteSelectedSongs(selectedSongs)
                                }
                            >
                                Confirm Delete
                            </button>
                        </div>
                    </div>
                </Modal>
            )}
        </>
    );
}
