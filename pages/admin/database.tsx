import React, {useState} from "react";
import { GetServerSideProps } from "next";
import Layout from "../../components/layouts/Layout";
import RepertoireTable from "../../components/elements/RepertoireTable";
import withAuth from "../../middlewares/withAuth";
import CsvRow from "../../components/elements/CsvUploadModal";
import axios from "axios";
import AddSongModal from "../../components/elements/AddSongModal";
import CsvUploadContainer from "../../components/elements/CsvUploadContainer";

export const getServerSideProps : GetServerSideProps = withAuth(async ({req, res} : any) => {

    let response = await axios.get(`/api/v1/admin/songs?category=id&order=ASC`, { withCredentials: true})

    return {
        props: {
            initialSongs: response.data.songs,
            user: req.user
        }

    }
})
export default function DatabasePage({user, initialSongs} : any) {

    const [songs, setSongs] = useState(initialSongs)
    const [isModalOpen, setIsModalOpen] = useState(false);


    function handleOpenModal() {
        setIsModalOpen(true)
    }


    return (
        <>
            <Layout user={user} title="Admin View">


                <div className="container">
                    <CsvUploadContainer database="master" />
                    <button className="btn btn-primary" onClick={handleOpenModal}>Add Song</button>
                    <RepertoireTable songs={songs} setSongs={setSongs} user={user} database="master" />
                </div>

            </Layout>
            <AddSongModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} type="add" database="master"/>
        </>

    )
}