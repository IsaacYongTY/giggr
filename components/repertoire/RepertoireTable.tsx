import React, { useState } from "react";
import styles from "../../assets/scss/components/repertoire/_repertoire-table.module.scss";
import Song from "../../lib/types/song";
import axios from "../../config/axios";
import AddSongModal from "./AddSongModal";
import RepertoireRow from "./RepertoireRow";
import {trigger} from "swr";

type Props = {
    songs: Song[],
    setSongs: any,
    user: any,
    database: string,
    musicians: any
    setMusicians: any
    data?: any
}
export default function RepertoireTable({ songs, setSongs, user, database, musicians, setMusicians, data } : Props) {

    const colKey = [
        "ID",
        "Title",
        "Artist",
        "Status",
        "Key",
        "My Key",
        "Tempo", "Duration",
        "Time Signature",
        "Language",
        "Listen",
        "Composers",
        "Songwriters",
        "Arrangers",
        "Genres",
        "Moods",
        "Tags"]

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [modalSong, setModalSong] = useState<Song>();

    async function handleDeleteSong(id : number) {
        let url = `/api/v1/songs/`

        if(database === 'master') {
            url = `api/v1/admin/songs`
        }
        try {

            let response = await axios.delete(`${url}/${id}`)
            await trigger("/api/v1/users?category=id&order=ASC")
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
                                <RepertoireRow key={index} song={song} handleOpenModal={handleOpenModal} database={database} handleDeleteSong={handleDeleteSong}/>
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
                musicians={musicians}
                user={user}
                data={data}
            />
        </>
    )
}