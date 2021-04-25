import React, {useEffect, useState} from 'react';
import Layout from "../components/layouts/Layout";
import Head from "next/head";
import SearchBar from "../components/elements/SearchBar";
import axios from "axios";
import RepertoireTable from "../components/elements/RepertoireTable";

export default function Repertoire() {

    const [songList, setSongList] = useState([])
    const [filter, setFilter] = useState("")
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredSongList, setFilteredSongList] = useState("");
    const [spotifyLink, setSpotifyLink] = useState("");

    useEffect(() => {
        handleLoadRepertoire()
        console.log(songList)

    },[])
    async function handleLoadRepertoire() {
        let response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/songs`)
        setSongList(response.data.songs)

        console.log(response)
    }

    const getTrackId = (spotifyLink: string) => {
        spotifyLink = spotifyLink.replace('spotify:track:', '')
        spotifyLink = spotifyLink.replace('https://open.spotify.com/track/', '')
        spotifyLink = spotifyLink.substring(0,22)
        return spotifyLink
    }

    async function handleAddSong() {

        const trackId : string = getTrackId(spotifyLink)
        console.log(trackId)
        try {
            let response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/songs/addauto`, { trackId })
            console.log(response)

            await handleLoadRepertoire()
        } catch (err) {
            console.log(err)
        }



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

                <div className="d-flex">
                    <input
                        name="spotifySearch"
                        className="form-control"
                        onChange={(e) => setSpotifyLink(e.target.value)}
                    />
                    <button
                        className="btn btn-primary"
                        onClick={handleAddSong}
                    >Get from Spotify</button>
                </div>
                <RepertoireTable songList={searchTerm ? filteredSongList : songList}/>
            </div>


        </Layout>
    )
}