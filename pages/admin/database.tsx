import React, {useState} from "react";
import { GetServerSideProps } from "next";
import Layout from "../../components/layouts/Layout";
import RepertoireTable from "../../components/repertoire/RepertoireTable";
import withAuth from "../../middlewares/withAuth";
import axios from "axios";
import AddSongModal from "../../components/elements/AddSongModal";
import CsvUploadContainer from "../../components/elements/CsvUploadContainer";
import Song from "../../lib/types/song";
import styles from "../../assets/scss/pages/_repertoire.module.scss";

export const getServerSideProps : GetServerSideProps = withAuth(async ({req, res} : any) => {

    let songsResponse = await axios.get(`/api/v1/admin/songs?category=id&order=ASC`, { withCredentials: true})
    let musiciansResponse = await axios.get('/api/v1/admin/musicians?category=name&order=ASC', {
        headers: {
            "x-auth-token": `Bearer ${req.user.token}`
        }
    })
    return {
        props: {
            initialSongs: songsResponse.data.songs,
            initialMusicians: musiciansResponse.data.musicians,
            user: req.user
        }

    }
})

type Props = {
    user: any,
    initialSongs: Song[]
    initialMusicians: any
}
export default function DatabasePage({user, initialSongs, initialMusicians} : Props) {

    const [songs, setSongs] = useState(initialSongs)
    const [musicians, setMusicians] = useState(initialMusicians)
    const [isModalOpen, setIsModalOpen] = useState(false);


    function handleOpenModal() {
        setIsModalOpen(true)
    }


    return (
        <>
            <Layout user={user} title="Admin View">


                <div className={styles.container}>
                    <CsvUploadContainer database="master" />
                    <button className="btn btn-primary" onClick={handleOpenModal}>Add Song</button>
                    <RepertoireTable songs={songs} setSongs={setSongs} user={user} database="master" musicians={musicians} setMusicians={setMusicians} />
                </div>

            </Layout>
            <AddSongModal
                isModalOpen={isModalOpen}
                setSongs={setSongs}
                setIsModalOpen={setIsModalOpen}
                type="add"
                database="master"
                musicians={musicians}
                setMusicians={setMusicians}
            />
        </>

    )
}