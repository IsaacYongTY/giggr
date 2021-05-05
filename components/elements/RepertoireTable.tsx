import React, {CSSProperties} from "react";
import {convertDurationToMinSec} from "../../lib/library";
import { capitalizeString } from "../../lib/library";
import styles from "./RepertoireTable.module.scss";
import Song from "../../lib/types/song";

export default function RepertoireTable({ songList } : { songList: Song[] }) {

    const colKey = [
        {
            name: "ID",
            key: "id"
        },
        {
            name: "Title",
            key: "title"
        },
        {
            name: "Artist",
            key: "artist"
        },
        {
            name: "Key",
            key: "key"
        },
        {
            name: "Tempo",
            key: "tempo"
        },
        {
            name: "Duration",
            key: "duration"
        },
        {
            name: "Time Signature",
            key: "timeSignature"
        },
        {
            name: "Language",
            key: "language"
        },
        {
            name: "Composers",
            key: "composers"
        },
        {
            name: "Spotify",
            key: "composers"
        },
        {
            name: "Action",
            key: "actions"
        }


    ]


    return (
        <div className={styles.tableContainer}>
        <table className={styles.table}>
            <thead>


            <tr>
                {
                    colKey.map(col => (
                        <th>
                            <div className={styles.cell}>
                                {col.name}
                            </div>
                        </th>
                    ))
                }

            </tr>

            </thead>


            <tbody className="table-content-container">
            {
                songList.map((song : any) => (
                    <tr>
                        {/*{*/}
                        {/*    colKey.map( col => (*/}
                        {/*        <td>*/}
                        {/*            <div className={styles.cell}>{song[col.key]}</div>*/}
                        {/*        </td>*/}
                        {/*    ))*/}
                        {/*}*/}
                        <td>
                            <div className={styles.cell}>{song.id}</div>
                        </td>
                        <td>
                            <div className={styles.cell}>{song.romTitle?.split(' ').slice(0,2).join(' ')} {song.title}</div>
                        </td>
                        <td>
                            <div className={styles.cell}>{song.artist.enName}</div>
                        </td>
                        <td>
                            <div className={styles.cell}>{song.key}</div>
                        </td>
                        <td>
                            <div className={styles.cell}>{song.tempo}</div>
                        </td>
                        <td>
                            <div className={styles.cell}>{convertDurationToMinSec(song.durationMs)}</div>
                        </td>
                        <td>
                            <div className={styles.cell}>{song.timeSignature}</div>
                        </td>
                        <td>
                            <div className={styles.cell}>{capitalizeString(song.language)}</div>
                        </td>
                        <td>
                            <div className={styles.cell}>
                                {
                                    song.composers.map((composer: any) =>(
                                        <span className={styles.pillButton}>{composer.enName}</span>
                                    ))
                                }
                            </div>
                        </td>
                        <td>
                            <div className={styles.cell}>
                                <a href={song.spotifyLink}>Link</a>
                            </div>
                        </td>
                        <td>
                            <div className={styles.cell}>

                                    <span className="material-icons">
                                        edit
                                    </span>

                                    <span className="material-icons">
                                        delete
                                    </span>



                            </div>
                        </td>

                        {/*<td><input /></td>*/}
                    </tr>
                ))
            }
            </tbody>


        </table>
        </div>
    )
}