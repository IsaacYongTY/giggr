import React, { Dispatch, SetStateAction, useState } from 'react';
import Image from 'next/image';
import ActionPopup from 'pages/repertoire/ActionPopup';
import classnames from 'classnames/bind';

import StatusPillButton from 'components/StatusPillButton';

import {
    convertDurationMsToMinSec,
    convertKeyModeIntToKey,
} from 'common/utils';
import { capitalizeString } from 'lib/library';
import { Song } from 'common/types';
import EditSongModal from './EditSongModal';
import ConfirmDeleteModal from './ConfirmDeleteModal';
import { Data } from './types';

import styles from './RepertoireRow.module.scss';

const cx = classnames.bind(styles);

type RepertoireRowProps = {
    song: Song;
    selectedSongs: Song[];
    setSelectedSongs: Dispatch<SetStateAction<Song[]>>;
    data: Data;
};

export default function RepertoireRow({
    song,
    selectedSongs,
    setSelectedSongs,
    data,
}: RepertoireRowProps) {
    const [isShowPopup, setIsShowPopup] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] =
        useState(false);

    const foundIndex = selectedSongs.findIndex(
        (selectedSong) => selectedSong.id === song.id
    );
    const isInSelectedSongsArray = foundIndex > -1;

    function toggleSelect() {
        if (isInSelectedSongsArray) {
            setSelectedSongs((prevState) =>
                prevState.filter((element) => element.id !== song.id)
            );
            return;
        }

        setSelectedSongs((prevState) => [...prevState, song]);
    }

    const onDeleteSongSuccess = () => {
        setIsConfirmDeleteModalOpen(false);
        setSelectedSongs((prevState) =>
            prevState.filter((element) => element.id !== song.id)
        );
    };

    return (
        <>
            <tr
                key={song.id}
                onMouseEnter={() => setIsShowPopup(true)}
                onMouseLeave={() => setIsShowPopup(false)}
            >
                <td className={styles.checkboxCol}>
                    <input
                        type="checkbox"
                        checked={isInSelectedSongsArray}
                        onChange={toggleSelect}
                    />
                </td>
                <td>
                    <div>{song.id}</div>
                </td>
                <td className={styles.titleCol}>
                    {song.romTitle?.split(' ').slice(0, 2).join(' ')}{' '}
                    {song.title}
                    {isShowPopup && (
                        <ActionPopup
                            handleOpenEditModal={() => setIsEditModalOpen(true)}
                            setIsShowPopup={setIsShowPopup}
                            song={song}
                            handleOpenConfirmDeleteModal={() =>
                                setIsConfirmDeleteModalOpen(true)
                            }
                        />
                    )}
                </td>
                <td className={styles.artistCol}>
                    <div>{song.artist?.name}</div>
                </td>
                <td>
                    <div>
                        {song.status && (
                            <StatusPillButton label={song.status} />
                        )}
                    </div>
                </td>
                <td>
                    <div>{convertKeyModeIntToKey(song.key, song.mode)}</div>
                </td>
                <td>
                    <div>{convertKeyModeIntToKey(song.myKey, song.mode)}</div>
                </td>
                <td>
                    <div className={cx('tempo-col')}>
                        {song.tempo ? song.tempo : null}
                    </div>
                </td>
                <td>
                    <div>
                        {song.durationMs
                            ? convertDurationMsToMinSec(song.durationMs)
                            : null}
                    </div>
                </td>
                <td>
                    <div>{song.timeSignature}</div>
                </td>
                <td>
                    <div>
                        {song?.language
                            ? capitalizeString(song?.language?.name)
                            : ''}
                    </div>
                </td>
                <td className={styles.listenCol}>
                    {song.spotifyLink && (
                        <a
                            href={song.spotifyLink}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <Image
                                src="/spotify-icon-green.png"
                                width={20}
                                height={20}
                                className="z-index-minus-1"
                            />
                        </a>
                    )}

                    {song.youtubeLink && (
                        <a
                            href={song.youtubeLink}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <Image
                                src="/youtube-icon-square.png"
                                width={20}
                                height={20}
                                className="z-index-minus-1"
                            />
                        </a>
                    )}

                    {song.otherLink && (
                        <a
                            href={song.youtubeLink}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <Image
                                src="/link-icon.png"
                                width={20}
                                height={20}
                                className="z-index-minus-1"
                            />
                        </a>
                    )}
                </td>
                <td>
                    {song.composers?.map((composer: any) => (
                        <div className={cx('pill-button')} key={composer.id}>
                            {composer.name}
                        </div>
                    ))}
                </td>
                <td>
                    {song.songwriters?.map((songwriter: any) => (
                        <div className={cx('pill-button')} key={songwriter.id}>
                            {songwriter.name}
                        </div>
                    ))}
                </td>
                <td>
                    {song.arrangers?.map((arranger: any) => (
                        <div className={cx('pill-button')} key={arranger.id}>
                            {arranger.name}
                        </div>
                    ))}
                </td>
                <td>
                    {song.genres?.map((arranger: any) => (
                        <div className={cx('pill-button')} key={arranger.id}>
                            {arranger.name}
                        </div>
                    ))}
                </td>
                <td>
                    {song.moods?.map((arranger: any) => (
                        <div className={cx('pill-button')} key={arranger.id}>
                            {arranger.name}
                        </div>
                    ))}
                </td>
                <td>
                    {song.tags?.map((arranger: any) => (
                        <div className={cx('pill-button')} key={arranger.id}>
                            {arranger.name}
                        </div>
                    ))}
                </td>
            </tr>
            <EditSongModal
                isModalOpen={isEditModalOpen}
                setIsModalOpen={setIsEditModalOpen}
                song={song}
                data={data}
            />
            <ConfirmDeleteModal
                isOpen={isConfirmDeleteModalOpen}
                onDeleteSongSuccess={onDeleteSongSuccess}
                songId={song.id}
                songTitle={song.title}
                onDeleteSongCancel={() => setIsConfirmDeleteModalOpen(false)}
            />
        </>
    );
}
