import React, {useRef, useState} from 'react';
import axios from "axios";
import styles from "../../assets/scss/components/common/_spotify-search-bar.module.scss";
import convertDurationMsToMinSec from "../../lib/utils/convert-duration-ms-to-min-sec";
import convertKeyModeIntToKey from "../../lib/utils/convert-key-mode-int-to-key";
import getSpotifyTrackId from "../../lib/utils/get-spotify-track-id"

export default function SpotifySearchBar({ setFormValue, database, isContribute, user} : any) {

    const [spotifyLink, setSpotifyLink] = useState("");
    const spotifySearchInput = useRef<HTMLInputElement>(null);

    let url = `/api/v1/songs`

    if(database === 'master') {
        url = `/api/v1/admin/songs`
    }

    async function handleGetFromSpotify() {

        setFormValue({})
        const trackId : string = getSpotifyTrackId(spotifyLink)
        console.log(trackId)

        if(!trackId) {
            return
        }

        try {
            console.log(url)
            let response = await axios.post(`${url}/spotify?trackId=${trackId}`)

            console.log(response.data.result)
            let songData = response.data.result

            // songData.artist = { value: songData.artist, label: songData.artist }
            setFormValue({
                ...songData
            })

            if(isContribute) {
                await axios.post(url, songData, {
                    withCredentials: true,
                    headers: {
                        "x-auth-token": `Bearer ${user.tokenString}`
                    }
                })
                console.log("Added to database successfully")
            }

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
        <div className={styles.container}>
            <input
                name="spotifySearch"
                className="form-control"
                onChange={(e) => setSpotifyLink(e.target.value)}
                ref={spotifySearchInput}
                onClick={selectText}
                placeholder="https://open.spotify.com/track/...."
            />
            <button
                className="btn btn-primary"
                onClick={handleGetFromSpotify}
            >Get from Spotify</button>
        </div>
    )
}



