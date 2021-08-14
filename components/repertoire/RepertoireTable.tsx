import React, { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import styles from '../../assets/scss/components/repertoire/_repertoire-table.module.scss';
import Song from '../../lib/types/song';
import axios from '../../config/axios';
import AddSongModal from './AddSongModal';
import RepertoireRow from './RepertoireRow';
import { trigger } from 'swr';
import Modal from 'react-modal';
import ButtonLoader from '../common/Loader';
import ActionRow from './ActionRow';
import AlertBox from '../common/AlertBox';

type Props = {
    songs: Song[];
    user: any;
    database: string;
    data?: any;
};
export default function RepertoireTable({
    songs,
    user,
    database,
    data,
}: Props) {
    const [alertOptions, setAlertOptions] = useState({ message: '', type: '' });

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

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [modalSong, setModalSong] = useState<Song>();
    const [deleteSong, setDeleteSong] = useState<Song>();
    const [deleteSongArray, setDeleteSongArray] = useState<Song[]>([]);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [
        isConfirmDeleteSelectedModalOpen,
        setIsConfirmDeleteSelectedModalOpen,
    ] = useState(false);
    const [selectedSongs, setSelectedSongs] = useState<Song[]>([]);
    const [errorMessage, setErrorMessage] = useState('');

    const isAllSelected =
        selectedSongs.length > 0 && songs?.length === selectedSongs.length;

    const colKey = [
        <input
            type="checkbox"
            onChange={toggleSelectAll}
            checked={isAllSelected}
        />,
        'ID',
        'Title',
        'Artist',
        'Status',
        'Key',
        'My Key',
        'Tempo',
        'Duration',
        'Time Signature',
        'Language',
        'Listen',
        'Composers',
        'Songwriters',
        'Arrangers',
        'Genres',
        'Moods',
        'Tags',
    ];

    async function handleDeleteSong(id: number) {
        let url = `/api/v1/songs/`;

        if (database === 'master') {
            url = `api/v1/admin/songs`;
        }
        try {
            await axios.delete(`${url}/${id}`);
            trigger('/api/v1/users?category=id&order=ASC');

            setIsConfirmModalOpen(false);
            setSelectedSongs((prevState) =>
                prevState.filter((song) => song.id !== id)
            );
        } catch (error) {
            console.log(error);
            console.log('Song deletion failed');
            setErrorMessage('Something went wrong. Please try again later.');
        }
    }

    async function handleDeleteSelectedSongs(selectedSongs: Song[]) {
        console.log('multiple songs deleted');

        const idArray = selectedSongs.map((song) => song.id);
        try {
            await axios.delete('/api/v1/songs', { data: { idArray } });
            trigger('/api/v1/users?category=id&order=ASC');
            setIsConfirmDeleteSelectedModalOpen(false);
            setSelectedSongs([]);
        } catch (err) {
            console.log(err);
            setErrorMessage('Something went wrong. Please try again later!');
        }
    }

    function handleOpenModal(song: Song) {
        setIsEditModalOpen(true);
        setModalSong(song);
    }

    function handleOpenConfirmModal(song: Song) {
        setIsConfirmModalOpen(true);
        setDeleteSong(song);
        setErrorMessage('');
    }

    function handleOpenConfirmDeleteSelectedModal(selectedSongs: Song[]) {
        setIsConfirmDeleteSelectedModalOpen(true);
        setDeleteSongArray(selectedSongs);
        setErrorMessage('');
    }

    function toggleSelectAll(e: ChangeEvent<HTMLInputElement>) {
        if (e.target.checked) {
            setSelectedSongs(data.songs);
            return;
        }

        setSelectedSongs([]);
    }

    return (
        <>
            <ActionRow
                setIsModalOpen={setIsModalOpen}
                database="database1"
                selectedSongs={selectedSongs}
                handleOpenConfirmDeleteSelectedModal={
                    handleOpenConfirmDeleteSelectedModal
                }
            />

            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            {colKey.map((col, index) => (
                                <th key={index}>{col}</th>
                            ))}
                        </tr>
                    </thead>

                    {data?.songs ? (
                        <tbody className="table-content-container">
                            {songs?.map((song: Song, index: number) => (
                                <RepertoireRow
                                    key={index}
                                    song={song}
                                    handleOpenModal={handleOpenModal}
                                    handleDeleteSong={handleDeleteSong}
                                    handleOpenConfirmModal={
                                        handleOpenConfirmModal
                                    }
                                    selectedSongs={selectedSongs}
                                    setSelectedSongs={setSelectedSongs}
                                />
                            ))}
                        </tbody>
                    ) : (
                        <ButtonLoader />
                    )}
                </table>
            </div>

            <AddSongModal
                isModalOpen={isEditModalOpen}
                setIsModalOpen={setIsEditModalOpen}
                type="edit"
                song={modalSong}
                database={database}
                user={user}
                data={data}
            />

            <AddSongModal
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                type="add"
                database="database1"
                data={data}
                user={user}
            />

            {isConfirmModalOpen && (
                <Modal isOpen={isConfirmModalOpen} style={modalStyles}>
                    <div className={styles.modalContainer}>
                        <div>
                            Are you sure you want to delete "{deleteSong?.title}
                            "?
                        </div>

                        {errorMessage && (
                            <div className="error-message">{errorMessage}</div>
                        )}

                        <div className={styles.buttonRow}>
                            <button
                                className="btn btn-secondary"
                                onClick={() => setIsConfirmModalOpen(false)}
                            >
                                Cancel
                            </button>

                            <button
                                className="btn btn-danger"
                                onClick={() =>
                                    handleDeleteSong(deleteSong?.id || -1)
                                }
                            >
                                Confirm Delete
                            </button>
                        </div>
                    </div>
                </Modal>
            )}

            {isConfirmDeleteSelectedModalOpen && (
                <Modal
                    isOpen={isConfirmDeleteSelectedModalOpen}
                    style={modalStyles}
                >
                    <div className={styles.modalContainer}>
                        <div>
                            Are you sure you want to delete{' '}
                            {deleteSongArray.length} items?
                        </div>

                        {errorMessage && (
                            <div className="error-message">{errorMessage}</div>
                        )}
                        <div className={styles.buttonRow}>
                            <button
                                className="btn btn-secondary"
                                onClick={() =>
                                    setIsConfirmDeleteSelectedModalOpen(false)
                                }
                            >
                                Cancel
                            </button>

                            <button
                                className="btn btn-danger"
                                onClick={() =>
                                    handleDeleteSelectedSongs(deleteSongArray)
                                }
                            >
                                Confirm Delete
                            </button>
                        </div>
                    </div>
                </Modal>
            )}

            <AlertBox
                setAlertOptions={setAlertOptions}
                message={alertOptions.message}
                type={alertOptions.type}
            />
        </>
    );
}
