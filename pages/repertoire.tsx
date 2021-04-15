import React, {useEffect, useState} from 'react';
import Layout from "../components/layouts/Layout";
import Head from "next/head";
import SearchBar from "../components/SearchBar";
import axios from "axios";
import { convertDurationToMinSec } from "../lib/library";
import RepertoireTable from "../components/RepertoireTable";

export default function Repertoire() {

    const [songList, setSongList] = useState([])
    const [filter, setFilter] = useState("")
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredSongList, setFilteredSongList] = useState("");

    useEffect(() => {
        handleLoadRepertoire()
        console.log(songList)

    },[])
    async function handleLoadRepertoire() {
        let response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/songs`)
        console.log(response.data.result)
        setSongList(response.data.result)

        console.log(response)
    }
    return (
        <Layout title="My Repertoire">
            <div className="container">

                Filter:
                <div className="d-flex">
                    <button className="btn btn-link" onClick={() => setFilter('title')}>Title</button>
                    <button className="btn btn-link" onClick={() => setFilter('initialism')}>Initials</button>
                    <button className="btn btn-link" onClick={() => setFilter('artist')}>Artist</button>
                </div>

                <SearchBar
                    songList={songList}
                    setFilteredSongList={setFilteredSongList}
                    filter={filter}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                />
                <RepertoireTable songList={searchTerm ? filteredSongList : songList}/>
            </div>


        </Layout>
    )
}