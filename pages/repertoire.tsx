import React, { useState } from 'react';
import Layout from "../components/layouts/Layout";
import SearchBar from "../components/elements/SearchBar";
import RepertoireTable from "../components/repertoire/RepertoireTable";
import withAuth from "../middlewares/withAuth";
import { GetServerSideProps } from "next";
import Song from "../lib/types/song";
import AddSongModal from "../components/elements/AddSongModal";
import FilterRow from "../components/repertoire/FilterRow";
import { loadUserData } from "../lib/library";
import styles from "../assets/scss/pages/_repertoire.module.scss";
import axios from "axios";
import ActionRow from "../components/repertoire/ActionRow";
import Musician from "../lib/types/musician";

export const getServerSideProps : GetServerSideProps = withAuth( async({ req, res } : any) => {

    try {
        console.log(req.user)
        let data = await loadUserData(req.user)

        return {
            props: {
                initialSongs: data.songs,
                initialMusicians: data.musicians,
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
    initialMusicians: Musician[],
    initialData: {
        songs: Song[]
        musicians: Musician[]
        genres: {
            id: number,
            name: string
        },
        tags: {
            id: number,
            name: string
        },
        moods: {
            id: number,
            name: string
        },
        languages: {
            id: number,
            name: string
        },
    }
    user: any
}

export default function Repertoire({ initialSongs, initialMusicians, initialData, user }: Props) {
    console.log(initialData.musicians)
    const [songs, setSongs] = useState(initialSongs)
    const [musicians, setMusicians] = useState(initialData.musicians)
    const [genres, setGenres] = useState(initialData.genres)
    const [tags, setTags] = useState(initialData.tags)
    const [moods, setMoods] = useState(initialData.moods)
    const [languages, setLanguages] = useState(initialData.languages)


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

