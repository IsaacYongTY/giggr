import React, {useEffect, useRef, useState} from "react";
import {convertDurationToMinSec} from "../../../lib/library";
import { capitalizeString } from "../../../lib/library";
import styles from "./RepertoireTable.module.scss";
import Song from "../../../lib/types/song";
import axios from "axios";
import AddSongModal from "../AddSongModal";
import Image from "next/image";
import ActionPopup from "../ActionPopup";
import RepertoireRow from "../RepertoireRow";

export default function RepertoireTable({ songs, setSongs, user, database } :
    { songs: Song[], setSongs: any, user: any, database: string }) {

    const colKey = ["ID", "Title", "Artist", "Key", "Tempo", "Duration", "Time Signature", "Language", "Composers", "Songwriters", "Arrangers", "Listen", "Action"]


    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [modalSong, setModalSong] = useState({});
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


    return (
        <>
            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>

                        <tr>
                            {
                                colKey.map((col,index) => (
                                    <th key={index}>
                                        {col}
                                    </th>
                                ))
                            }
                        </tr>

                    </thead>


                    <tbody className="table-content-container">
                        {
                            songs?.map((song : any, index: number) => (
                                <RepertoireRow song={song} handleOpenModal={handleOpenModal} database={database} handleDeleteSong={handleDeleteSong}/>
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