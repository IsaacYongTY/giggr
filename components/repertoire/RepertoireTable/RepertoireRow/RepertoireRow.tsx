import React, { Dispatch, SetStateAction, useState } from 'react';
import Image from 'next/image';
import ActionPopup from '../../ActionPopup/ActionPopup';

import StatusPillButton from '../../../common/StatusPillButton/StatusPillButton';

import convertDurationMsToMinSec from '../../../../lib/utils/convert-duration-ms-to-min-sec';
import convertKeyModeIntToKey from '../../../../lib/utils/convert-key-mode-int-to-key';
import { capitalizeString } from '../../../../lib/library';
import Song from '../../../../lib/types/song';

import styles from './RepertoireRow.module.scss';

interface Props {
    song: Song;
    handleOpenModal: (song: Song) => void;
    handleDeleteSong: (id: number) => Promise<void>;
    handleOpenConfirmModal: (song: Song) => void;
    selectedSongs: Song[];
    setSelectedSongs: Dispatch<SetStateAction<Song[]>>;
}
export default function RepertoireRow({
    song,
    handleOpenModal,
    handleDeleteSong,
    handleOpenConfirmModal,
    selectedSongs,
    setSelectedSongs,
}: Props) {
    const [isShowPopup, setIsShowPopup] = useState(false);

    function handleHover(song: Song, isEnter: boolean) {
        if (isEnter) {
            setIsShowPopup(true);
            return;
        }
        setIsShowPopup(false);
    }

    const foundIndex = selectedSongs.findIndex((selectedSong) => selectedSong.id === song.id);
    const isInSelectedSongsArray = foundIndex > -1;

    function toggleSelect() {
        if (isInSelectedSongsArray) {
            setSelectedSongs((prevState) => prevState.filter((element) => element.id !== song.id));
            return;
        }

        setSelectedSongs((prevState) => [...prevState, song]);
    }

    return (
        <tr
            key={song.id}
            onMouseEnter={() => setIsShowPopup(true)}
            onMouseLeave={() => setIsShowPopup(false)}
        >
            <td className={styles.checkboxCol}>
                <input type="checkbox" checked={isInSelectedSongsArray} onChange={toggleSelect} />
            </td>
            <td>
                <div className={styles.cell}>{song.id}</div>
            </td>
            <td className={styles.titleCol}>
                {song.romTitle?.split(' ').slice(0, 2).join(' ')} {song.title}
                {isShowPopup && (
                    <ActionPopup
                        handleOpenModal={handleOpenModal}
                        handleHover={handleHover}
                        setIsShowPopup={setIsShowPopup}
                        song={song}
                        handleDeleteSong={handleDeleteSong}
                        handleOpenConfirmModal={handleOpenConfirmModal}
                    />
                )}
            </td>
            <td className={styles.artistCol}>
                <div className={styles.cell}>{song.artist?.name}</div>
            </td>
            <td>
                <div className={styles.cell}>
                    {song.status && <StatusPillButton label={song.status} />}
                </div>
            </td>
            <td>
                <div className={styles.cell}>{convertKeyModeIntToKey(song.key, song.mode)}</div>
            </td>
            <td>
                <div className={styles.cell}>{convertKeyModeIntToKey(song.myKey, song.mode)}</div>
            </td>
            <td>
                <div className={`${styles.cell} ${styles.tempoCol}`}>
                    {song.tempo ? song.tempo : null}
                </div>
            </td>
            <td>
                <div className={styles.cell}>
                    {song.durationMs ? convertDurationMsToMinSec(song.durationMs) : null}
                </div>
            </td>
            <td>
                <div className={styles.cell}>{song.timeSignature}</div>
            </td>
            <td>
                <div className={styles.cell}>
                    {song?.language ? capitalizeString(song?.language?.name) : ''}
                </div>
            </td>
            <td className={styles.listenCol}>
                {song.spotifyLink && (
                    <a href={song.spotifyLink} target="_blank" rel="noreferrer">
                        <Image
                            src="/spotify-icon-green.png"
                            width={20}
                            height={20}
                            className="z-index-minus-1"
                        />
                    </a>
                )}

                {song.youtubeLink && (
                    <a href={song.youtubeLink} target="_blank" rel="noreferrer">
                        <Image
                            src="/youtube-icon-square.png"
                            width={20}
                            height={20}
                            className="z-index-minus-1"
                        />
                    </a>
                )}

                {song.otherLink && (
                    <a href={song.youtubeLink} target="_blank" rel="noreferrer">
                        <Image
                            src="/link-icon.png"
                            width={20}
                            height={20}
                            className="z-index-minus-1"
                        />
                    </a>
                )}
            </td>
            <td className={styles.composersCol}>
                <div className={styles.pillButtonContainer}>
                    {song.composers?.map((composer: any) => (
                        <div className={styles.pillButton} key={composer.id}>
                            {composer.name}
                        </div>
                    ))}
                </div>
            </td>
            <td className={styles.songwritersCol}>
                <div className={styles.pillButtonContainer}>
                    {song.songwriters?.map((songwriter: any) => (
                        <div className={styles.pillButton} key={songwriter.id}>
                            {songwriter.name}
                        </div>
                    ))}
                </div>
            </td>
            <td className={styles.arrangersCol}>
                <div className={styles.pillButtonContainer}>
                    {song.arrangers?.map((arranger: any) => (
                        <div className={styles.pillButton} key={arranger.id}>
                            {arranger.name}
                        </div>
                    ))}
                </div>
            </td>
            <td className={styles.genresCol}>
                <div className={styles.pillButtonContainer}>
                    {song.genres?.map((arranger: any) => (
                        <div className={styles.pillButton} key={arranger.id}>
                            {arranger.name}
                        </div>
                    ))}
                </div>
            </td>
            <td className={styles.moodsCol}>
                <div className={styles.pillButtonContainer}>
                    {song.moods?.map((arranger: any) => (
                        <div className={styles.pillButton} key={arranger.id}>
                            {arranger.name}
                        </div>
                    ))}
                </div>
            </td>
            <td className={styles.tagsCol}>
                <div className={styles.pillButtonContainer}>
                    {song.tags?.map((arranger: any) => (
                        <div className={styles.pillButton} key={arranger.id}>
                            {arranger.name}
                        </div>
                    ))}
                </div>
            </td>
        </tr>
    );
}
