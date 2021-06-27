import React, { useState } from 'react';
import Layout from "../components/layouts/Layout";
import SearchBar from "../components/elements/SearchBar";
import RepertoireTable from "../components/repertoire/RepertoireTable";
import withAuth from "../middlewares/withAuth";
import { GetServerSideProps } from "next";
import Song from "../lib/types/song";
import AddSongModal from "../components/elements/AddSongModal";
import FilterRow from "../components/repertoire/FilterRow";
import { loadUserRepertoire } from "../lib/library";
import styles from "../assets/scss/pages/_repertoire.module.scss";
import axios from "axios";
import ActionRow from "../components/repertoire/ActionRow";

export const getServerSideProps : GetServerSideProps = withAuth( async({ req, res } : any) => {

    try {
        console.log(req.user)
        let data = await loadUserRepertoire(req.user)
        let { data: { musicians} } = await axios.get('/api/v1/musicians/?category=name&order=ASC', {
            withCredentials: true,
            headers: {
                "x-auth-token": `Bearer ${req.user.tokenString}`
            }
        })
        return {
            props: {
                initialSongs: data.songs,
                initialMusicians: musicians,
                initialData: data,
                user: req.user
            }
        }

    } catch (error) {
        return {
            redirect: {
                permanent: false,
                destination: "/error500"
            }
        }
    }
})

type Props = {
    initialSongs: Array<Song>,
    initialMusicians: any,
    initialData: any
    user: any
}

export default function Repertoire({ initialSongs, initialMusicians, initialData, user }: Props) {

    const [songs, setSongs] = useState(initialSongs)
    const [musicians, setMusicians] = useState(initialMusicians)
    const [filter, setFilter] = useState("title")
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredSongList, setFilteredSongList] = useState(initialSongs);
    const [data, setData] = useState(initialData)
    console.log(data)
    const [isModalOpen, setIsModalOpen] = useState(false);

    function handleOpenModal() {
        setIsModalOpen(true)
    }

    console.log(initialData)

    return (
        <>

            <Layout title="My Repertoire" user={user}>
                <div className={styles.container}>

                    <FilterRow setFilter={setFilter} />

                    <SearchBar
                        songs={songs}
                        setFilteredSongList={setFilteredSongList}
                        filter={filter}
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                    />

                    <ActionRow setIsModalOpen={setIsModalOpen} database="database1"/>

                    <RepertoireTable
                        songs={searchTerm ? filteredSongList : songs}
                        setSongs={setSongs}
                        user={user}
                        database="database1"
                        musicians={musicians}
                        setMusicians={setMusicians}
                        data={data}
                    />
                </div>



            </Layout>

                <AddSongModal
                    isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                    type="add"
                    database="database1"
                    setSongs={setSongs}
                    musicians={musicians}
                    setMusicians={setMusicians}
                    data={data}
                    user={user}


                />

        </>
    )
}

