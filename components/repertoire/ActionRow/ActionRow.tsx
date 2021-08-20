import React, { Dispatch, SetStateAction } from 'react';
import CsvUploadContainer from '../CsvUploadContainer/CsvUploadContainer';
import Song from '../../../lib/types/song';

interface Props {
    setIsModalOpen: Dispatch<SetStateAction<boolean>>;
    database: string;
    selectedSongs: Song[];
    handleOpenConfirmDeleteSelectedModal: any;
}

export default function ActionRow({
    setIsModalOpen,
    database,
    selectedSongs,
    handleOpenConfirmDeleteSelectedModal,
}: Props) {
    return (
        <div className="action-row">
            <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
                Add Song
            </button>
            <CsvUploadContainer database={database} />
            {selectedSongs.length > 0 && (
                <button
                    className="btn btn-danger"
                    onClick={() => handleOpenConfirmDeleteSelectedModal(selectedSongs)}
                >
                    Delete Selected
                </button>
            )}
        </div>
    );
}
