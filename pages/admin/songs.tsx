import React, {useEffect, useState} from 'react';
import Layout from "../../components/layouts/Layout";
import Head from "next/head";
import SearchBar from "../../components/elements/SearchBar";
import axios from "axios";
import RepertoireTable from "../../components/elements/RepertoireTable";
import withAuth from "../../middlewares/withAuth";
import { GetServerSideProps } from "next";
import {useRouter} from "next/router";
import Song from "../../lib/types/song";

export const getServerSideProps : GetServerSideProps = withAuth(async({req, res} : any) => {

    let response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/songs`)

    return {
        props: {
            songs: response.data.songs,
            user: req.user
        }
    }
})

export default function Repertoire({ songs }: { songs: Array<Song> }) {
    const router = useRouter()
    const [songList, setSongList] = useState(songs)
    const [filter, setFilter] = useState("")
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredSongList, setFilteredSongList] = useState(songs);
    const [spotifyLink, setSpotifyLink] = useState("");

    useEffect(() => {


    },[])


    function refreshData() {
        router.replace(router.asPath)
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

            refreshData()

        } catch (err) {
            console.log(err)
        }

    }

    return (
        <Layout title="Admin - All Songs | GIGGR">
            <div className="container">

                Filter:
                <div className="d-flex">
                    <button className="btn btn-link" onClick={() => setFilter('title')}>Title</button>
                    <button className="btn btn-link" onClick={() => setFilter('initialism')}>Initials</button>
                    <button className="btn btn-link" onClick={() => setFilter('artist')}>Artist</button>
                </div>



                <SearchBar
                    songList={songs}
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
                <RepertoireTable songList={searchTerm ? filteredSongList : songs}/>
            </div>
        </Layout>
    )
}

