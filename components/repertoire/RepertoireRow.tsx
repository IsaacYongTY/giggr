import React, {useState} from "react";
import styles from "../../assets/scss/components/repertoire/_repertoire-row.module.scss";
import ActionPopup from "./ActionPopup";
import {capitalizeString } from "../../lib/library";
import convertDurationMsToMinSec from "../../lib/utils/convert-duration-ms-to-min-sec";
import convertKeyModeIntToKey from "../../lib/utils/convert-key-mode-int-to-key"
import Image from "next/image";
import Song from "../../lib/types/song";

export default function RepertoireRow({song, handleOpenModal, handleDeleteSong }: any) {

    const [isShowPopup, setIsShowPopup] = useState(false)

    function handleHover(song : Song, isEnter : boolean) {
        if(isEnter) {
            setIsShowPopup(true)
            return
        }
        setIsShowPopup(false)
    }

    return (
        <tr
            key={song.id}
            onMouseEnter={() => setIsShowPopup(true)}
            onMouseLeave={() => setIsShowPopup(false)}
        >

            <td>
                <div className={styles.cell}>{song.id}</div>
            </td>
            <td className={styles.titleCol}>
                {song.romTitle?.split(' ').slice(0,2).join(' ')} {song.title}
                {
                    isShowPopup &&
                    <ActionPopup
                        handleOpenModal={handleOpenModal}
                        handleHover={handleHover}
                        setIsShowPopup={setIsShowPopup}
                        song={song}
                        handleDeleteSong={handleDeleteSong}
                    />
                }
            </td>
            <td className={styles.artistCol}>
                <div className={styles.cell}>{song.artist?.name}</div>
            </td>
            <td>
                <div className={styles.cell}>{convertKeyModeIntToKey(song.key, song.mode)}</div>
            </td>
            <td>
                <div className={`${styles.cell} ${styles.tempoCol}`}>{song.tempo}</div>
            </td>
            <td>
                <div className={styles.cell}>{convertDurationMsToMinSec(song.durationMs)}</div>
            </td>
            <td>
                <div className={styles.cell}>{song.timeSignature}</div>
            </td>
            <td>
                <div className={styles.cell}>{capitalizeString(song.language?.name)}</div>
            </td>
            <td className={styles.composersCol}>
                <div className={styles.pillButtonContainer}>
                    {
                        song.composers.map((composer: any) =>(
                            <div className={styles.pillButton} key={composer.id}>{composer.name}</div>
                        ))
                    }
                </div>
            </td>
            <td>
                <div className={styles.pillButtonContainer}>
                    {
                        song.songwriters.map((songwriter: any) =>(
                            <div className={styles.pillButton} key={songwriter.id}>{songwriter.name}</div>
                        ))
                    }
                </div>
            </td>
            <td>
                <div className={styles.pillButtonContainer}>
                    {
                        song.arrangers.map((arranger: any) =>(
                            <div className={styles.pillButton} key={arranger.id}>{arranger.name}</div>
                        ))
                    }
                </div>
            </td>
            <td>
                <div className={styles.cell}>
                    {
                        song.spotifyLink &&
                            <a href={song.spotifyLink}>
                                <Image src="/spotify-icon-green.png" width={20} height={20}
                                       className="z-index-minus-1"/>
                            </a>
                    }

                    {   song.youtubeLink &&

                            <a href={song.youtubeLink}>
                                <Image src="/youtube-icon-square.png" width={20} height={20}
                                       className="z-index-minus-1"/>
                            </a>

                    }


                </div>
            </td>
            <td>


            </td>


        </tr>

    )
}