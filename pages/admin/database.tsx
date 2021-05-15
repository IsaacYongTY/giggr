import React, {useState} from "react";
import { GetServerSideProps } from "next";
import Layout from "../../components/layouts/Layout";
import RepertoireTable from "../../components/elements/RepertoireTable";
import withAuth from "../../middlewares/withAuth";
import axios from "axios";

export const getServerSideProps : GetServerSideProps = withAuth(async ({req, res} : any) => {

    let response = await axios.get(`/api/v1/songs?category=id&order=ASC`, { withCredentials: true})

    return {
        props: {
            initialSongs: response.data.songs,
            user: req.user
        }

    }
})
export default function DatabasePage({user, initialSongs} : any) {

    const [songs, setSongs] = useState(initialSongs)
    return (
        <Layout>
            <div className="container">
                <RepertoireTable songs={songs} setSongs={setSongs} user={user} />
            </div>

        </Layout>
    )
}