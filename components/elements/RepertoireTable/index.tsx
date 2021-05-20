import React, {useEffect, useRef, useState} from "react";
import {convertDurationToMinSec} from "../../../lib/library";
import { capitalizeString } from "../../../lib/library";
import styles from "./RepertoireTable.module.scss";
import Song from "../../../lib/types/song";
import axios from "axios";
import AddSongModal from "../AddSongModal";
import Image from "next/image";

export default function RepertoireTable({ songs, setSongs, user, database } :
    { songs: Song[], setSongs: any, user: any, database: string }) {

    const colKey = ["ID", "Title", "Artist", "Key", "Tempo", "Duration", "Time Signature", "Language", "Composers", "Listen", "Action"]
    const colKeyBackup = [
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

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [modalSong, setModalSong] = useState({});
    const [isActionShow, setIsActionShow] = useState(false)
    const [isActionShowArray, setIsActionShowArray] = useState(Array(songs.length).fill(false))
    const actionRow = useRef(null);
    console.log(isActionShowArray)
    console.log(isActionShowArray)
    async function handleDeleteSong(id : number) {
        let url = `/api/v1/songs/`

        if(database === 'master') {
            url = `api/v1/admin/songs`
        }
        try {

            let response = await axios.delete(`${url}/${id}`, {
                withCredentials: true,
                headers: {
                    "x-auth-token": `Bearer ${user.tokenString}`
                }
            })
            console.log(response)
            setSongs((prevState : Song) => prevState.filter((song: Song) => song.id !== id))
        } catch (error) {
            console.log(error)
            console.log("Song deletion failed")
        }
    }

    function handleOpenModal(song : Song) {
        setIsEditModalOpen(true)
        setModalSong(song)
    }

    function handleHover(index : number, isEnter : boolean) {
        setIsActionShowArray((prevState: boolean[]) => {
            let resultArray = prevState.map(() => false)

            if(isEnter) {
                resultArray[index] = true
            }

            return resultArray
        })
    }

    return (
        <>
            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>

                        <tr>
                            {
                                colKey.map((col,index) => (
                                    <th key={index}>
                                        <div className={styles.cell}>
                                            {col}
                                        </div>
                                    </th>
                                ))
                            }
                        </tr>

                    </thead>


                    <tbody className="table-content-container">
                        {
                            songs?.map((song : any, index: number) => (
                                <tr
                                    key={song.id}
                                    onMouseEnter={() => handleHover(index, true)}
                                    onMouseLeave={() => handleHover(index, false)}
                                >

                                    <td>
                                        <div className={styles.cell}>{song.id}</div>
                                    </td>
                                    <td>
                                        <div className={styles.cell}>{song.romTitle?.split(' ').slice(0,2).join(' ')} {song.title}</div>
                                    </td>
                                    <td>
                                        <div className={styles.cell}>{song.artist?.name}</div>
                                    </td>
                                    <td>
                                        <div className={styles.cell}>{song.key}</div>
                                    </td>
                                    <td>
                                        <div className={styles.cell}>{song.tempo}</div>
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
                                            {
                                                song.spotifyLink &&
                                                <a href={song.spotifyLink}>
                                                    <Image src="/spotify-icon-green.png" width={20} height={20}/>
                                                </a>
                                            }

                                        </div>
                                    </td>
                                    <td>
                                        {
                                            isActionShowArray[index] &&
                                            <div ref={actionRow} className={styles.cell}>
                                            <span className="material-icons" onClick={() => handleOpenModal(song)}>
                                                edit
                                            </span>

                                                <span className="material-icons" onClick={() => handleDeleteSong(song.id)}>
                                                delete
                                            </span>
                                            </div>
                                        }

                                    </td>


                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>

            <AddSongModal
                isModalOpen={isEditModalOpen}
                setIsModalOpen={setIsEditModalOpen}
                type="edit"
                song={modalSong}
                database={database}
                setSongs={setSongs}
            />

        </>
    )
}