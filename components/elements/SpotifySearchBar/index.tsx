import React, {useState} from 'react';
import axios from "axios";
import {useRouter} from "next/router";

export default function SpotifySearchBar({ setFormValue } : any) {

    const router = useRouter();
    const [spotifyLink, setSpotifyLink] = useState("");

    const getTrackId = (spotifyLink: string) => {
        spotifyLink = spotifyLink.replace('spotify:track:', '')
        spotifyLink = spotifyLink.replace('https://open.spotify.com/track/', '')
        spotifyLink = spotifyLink.substring(0,22)
        return spotifyLink
    }

    // function refreshData() {
    //     router.replace(router.asPath)
    // }


    console.log(spotifyLink)

    async function handleAddSong() {

        const trackId : string = getTrackId(spotifyLink)
        console.log(trackId)


        try {

            let response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/songs/fill`, { trackId })

            console.log(response.data.result)
            const songData = response.data.result
            setFormValue({
                ...songData
            })
            setSpotifyLink('')

        } catch (err) {
            console.log(err)
        }

    }


    return (
        <div className="spotify-search">
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
    )
}



