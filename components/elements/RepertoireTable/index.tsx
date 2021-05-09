import React, {useEffect, useState} from "react";
import {convertDurationToMinSec} from "../../../lib/library";
import { capitalizeString } from "../../../lib/library";
import styles from "./RepertoireTable.module.scss";
import Song from "../../../lib/types/song";
import axios from "axios";
import { useRouter } from "next/router";
import AddSongModal from "../AddSongModal";

export default function RepertoireTable({ songs, setSongs } : { songs: Song[], setSongs: any }) {
    const router = useRouter()

    // useEffect(() => {
    //
    // }, [songs])
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

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [modalSong, setModalSong] = useState({});

    function refreshData() {
        router.replace(router.asPath)
    }
    async function handleDeleteSong(id : number) {
        try {

            let response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/songs/${id}`, {withCredentials: true})
            console.log(response)
            setSongs((prevState : Song) => prevState.filter((song: Song) => song.id !== id))
        } catch (error) {
            console.log(error)
            console.log("Song deletion failed")
        }
    }

    function handleOpenModal(song : Song) {
        setIsEditModalOpen(true)
        console.log(song)
        setModalSong(song)
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
                                    {col.name}
                                </div>
                            </th>
                        ))
                    }

                </tr>

                </thead>


                <tbody className="table-content-container">
                {
                    songs?.map((song : any) => (
                        <tr key={song.id}>
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
                                <div className={styles.cell}>{song.language?.name}</div>
                            </td>
                            <td>
                                <div className={styles.cell}>
                                    {
                                        song.composers.map((composer: any) =>(
                                            <span className={styles.pillButton} key={composer.id}>{composer.enName}</span>
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
                                    <span className="material-icons" onClick={() => handleOpenModal(song)}>
                                        edit
                                    </span>

                                    <span className="material-icons" onClick={() => handleDeleteSong(song.id)}>
                                        delete
                                    </span>
                                </div>
                            </td>


                        </tr>


                    ))


                }
                </tbody>


            </table>
            </div>

            <AddSongModal isModalOpen={isEditModalOpen} setIsModalOpen={setIsEditModalOpen} type="edit" song={modalSong} />

        </>
    )
}