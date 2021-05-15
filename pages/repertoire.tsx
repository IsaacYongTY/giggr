import React, {useEffect, useState} from 'react';
import Layout from "../components/layouts/Layout";
import Head from "next/head";
import SearchBar from "../components/elements/SearchBar";
import axios from "axios";
import RepertoireTable from "../components/elements/RepertoireTable";
import withAuth from "../middlewares/withAuth";
import { GetServerSideProps } from "next";
import Song from "../lib/types/song";
import { useRouter } from "next/router";
import AddSongModal from "../components/elements/AddSongModal";
import FilterRow from "../components/elements/FilterRow";

export const getServerSideProps : GetServerSideProps = withAuth( async({ req, res } : any) => {

    let response = await axios.get(`/api/v1/songs?category=id&order=ASC`)

    return {
        props: {
            initialSongs: response.data.songs,
            user: req.user
        }
    }
})

export default function Repertoire({ initialSongs, user }: { initialSongs: Array<Song>, user: any }) {

    const [songs, setSongs] = useState(initialSongs)
    const [filter, setFilter] = useState("title")
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredSongList, setFilteredSongList] = useState(initialSongs);

    const [isModalOpen, setIsModalOpen] = useState(false);


    function handleOpenModal() {

        setIsModalOpen(true)
    }



    return (
        <>

            <Layout title="My Repertoire" user={user}>
                <div className="container">

                    <FilterRow setFilter={setFilter} />

                    <SearchBar
                        songs={songs}
                        setFilteredSongList={setFilteredSongList}
                        filter={filter}
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                    />

                    <button className="btn btn-primary" onClick={handleOpenModal}>Add Song</button>


                    <RepertoireTable songs={searchTerm ? filteredSongList : songs} setSongs={setSongs} user={user}/>
                </div>

            </Layout>

                <AddSongModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} type="add" />

        </>
    )
}

