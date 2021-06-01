import React, {useState} from "react";
import styles from "../RepertoireTable/RepertoireTable.module.scss";
import ActionPopup from "../ActionPopup";
import {capitalizeString} from "../../../lib/library";
import Image from "next/image";
import Song from "../../../lib/types/song";
import axios from "axios";

export default function RepertoireRow({song, handleOpenModal, handleDeleteSong }: any) {

    const [isShowPopup, setIsShowPopup] = useState(false)
    const [isEnterPopup, setIsEnterPopup] = useState(false)



    function handleHover(song : Song, isEnter : boolean) {
        if(isEnter || isEnterPopup) {
            setIsShowPopup(true)

            return
        }

        setIsShowPopup(false)
        // setCurrentSong({})
        // setIsShowPopup(false)

    }
    return (
        <tr
            key={song.id}
            onMouseEnter={() =>setIsShowPopup(true)}
            onMouseLeave={() => setIsShowPopup(false)}
        >

            <td>
                <div className={styles.cell}>{song.id}</div>
            </td>
            <td className={styles.titleCol}>
                <div className={`${styles.cell}`}>{song.romTitle?.split(' ').slice(0,2).join(' ')} {song.title}</div>
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
                <div className={styles.cell}>{song.key}</div>
            </td>
            <td>
                <div className={`${styles.cell} ${styles.tempoCol}`}>{song.tempo}</div>
            </td>
            <td>
                <div className={styles.cell}>{song.durationMinSec}</div>
            </td>
            <td>
                <div className={styles.cell}>{song.timeSignature}</div>
            </td>
            <td>
                <div className={styles.cell}>{capitalizeString(song.language?.name)}</div>
            </td>
            <td>
                <div className={styles.cell}>
                    {
                        song.composers.map((composer: any) =>(
                            <span className={styles.pillButton} key={composer.id}>{composer.name}</span>
                        ))
                    }
                </div>
            </td>
            <td>
                <div className={styles.cell}>

                </div>
            </td>
            <td>
                <div className={styles.cell}>

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