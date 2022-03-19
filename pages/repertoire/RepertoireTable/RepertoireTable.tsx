import React, { ChangeEvent, useState } from 'react';
import classnames from 'classnames/bind';

import ButtonLoader from 'components/Loader';
import AlertBox from 'components/AlertBox';
import RepertoireRow from './RepertoireRow';
import ActionRow from '../ActionRow';

import { Song } from 'common/types';

import styles from './RepertoireTable.module.scss';
import { defaultColKey } from './constants';

const cx = classnames.bind(styles);

type Props = {
    songs: Song[];
    data?: any;
};

export default function RepertoireTable({ songs, data }: Props) {
    const [alertOptions, setAlertOptions] = useState({ message: '', type: '' });

    const [selectedSongs, setSelectedSongs] = useState<Song[]>([]);

    const isAllSelected =
        selectedSongs.length > 0 && songs?.length === selectedSongs.length;

    function toggleSelectAll(e: ChangeEvent<HTMLInputElement>) {
        setSelectedSongs(e.target.checked ? data.songs : []);
    }

    const onDeleteSongsSuccess = () => {
        setSelectedSongs([]);
    };

    const colKey = [
        <input
            key="song-checkbox"
            type="checkbox"
            onChange={toggleSelectAll}
            checked={isAllSelected}
        />,
        ...defaultColKey,
    ];

    return (
        <>
            <ActionRow
                selectedSongs={selectedSongs}
                data={data}
                onDeleteSongsSuccess={onDeleteSongsSuccess}
            />

            <div className={cx('table-container')}>
                <table className={cx('table')}>
                    <thead>
                        <tr>
                            {colKey.map((col, index) => (
                                <th key={index}>{col}</th>
                            ))}
                        </tr>
                    </thead>

                    {songs ? (
                        <tbody className={cx('table-content-container')}>
                            {songs.map((song: Song, index: number) => (
                                <RepertoireRow
                                    key={index}
                                    song={song}
                                    selectedSongs={selectedSongs}
                                    setSelectedSongs={setSelectedSongs}
                                    data={data}
                                />
                            ))}
                        </tbody>
                    ) : (
                        <ButtonLoader />
                    )}
                </table>
            </div>

            <AlertBox
                setAlertOptions={setAlertOptions}
                message={alertOptions.message}
                type={alertOptions.type}
            />
        </>
    );
}
