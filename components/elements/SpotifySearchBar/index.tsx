import React, {useRef, useState} from 'react';
import axios from "axios";
import {useRouter} from "next/router";

export default function SpotifySearchBar({ setFormValue } : any) {

    const [spotifyLink, setSpotifyLink] = useState("");
    const spotifySearchInput = useRef<HTMLInputElement>(null);

    const getTrackId = (spotifyLink: string) => spotifyLink
        .replace('spotify:track:', '')
        .replace('https://open.spotify.com/track/', '')
        .substring(0,22)

    async function handleAddSong() {

        setFormValue({})
        const trackId : string = getTrackId(spotifyLink)
        console.log(trackId)

        try {

            let response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/songs/spotify`, { trackId })

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
                onClick={handleAddSong}
            >Get from Spotify</button>
        </div>
    )
}



