import React, {useRef, useState} from 'react';
import axios from "axios";
import {useRouter} from "next/router";
import { getSpotifyTrackId } from "../../../lib/library";

export default function SpotifySearchBar({ setFormValue } : any) {

    const [spotifyLink, setSpotifyLink] = useState("");
    const spotifySearchInput = useRef<HTMLInputElement>(null);

    async function handleGetFromSpotify() {

        setFormValue({})
        const trackId : string = getSpotifyTrackId(spotifyLink)
        console.log(trackId)

        if(trackId) {
            return
        }

        try {

            let response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/songs/spotify?trackId=${trackId}`)

            console.log(response.data.result)
            const songData = response.data.result
            setFormValue({
                ...songData
            })

        } catch (err) {
            console.log(err)
        }

    }

    function selectText() {
        if(spotifySearchInput.current) {
            spotifySearchInput.current.select()
        }
    }

    return (
        <div className="spotify-search">
            <input
                name="spotifySearch"
                className="form-control"
                onChange={(e) => setSpotifyLink(e.target.value)}
                ref={spotifySearchInput}
                onClick={selectText}
            />
            <button
                className="btn btn-primary"
                onClick={handleGetFromSpotify}
            >Get from Spotify</button>
        </div>
    )
}



