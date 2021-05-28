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
import CsvUploadContainer from "../components/elements/CsvUploadContainer";
import { loadRepertoire } from "../lib/library";

export const getServerSideProps : GetServerSideProps = withAuth( async({ req, res } : any) => {


    let initialSongs = await loadRepertoire()

    return {
        props: {
            initialSongs,
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


    console.log(setSongs)
    function handleOpenModal() {

        setIsModalOpen(true)
    }



    return (
        <>

            <Layout title="My Repertoire" user={user}>
                <div>

                    <FilterRow setFilter={setFilter} />

                    <CsvUploadContainer database="database1" />

                    <SearchBar
                        songs={songs}
                        setFilteredSongList={setFilteredSongList}
                        filter={filter}
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                    />

                    <button className="btn btn-primary" onClick={handleOpenModal}>Add Song</button>


                    <RepertoireTable
                        songs={searchTerm ? filteredSongList : songs}
                        setSongs={setSongs}
                        user={user}
                        database="database1"
                    />
                </div>

            </Layout>

                <AddSongModal
                    isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                    type="add"
                    database="database1"
                    setSongs={setSongs}
                />

        </>
    )
}

