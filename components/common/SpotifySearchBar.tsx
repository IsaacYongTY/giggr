import React, { useRef, useState} from 'react';
import axios from "axios";
import styles from "../../assets/scss/components/common/_spotify-search-bar.module.scss";
import convertDurationMsToMinSec from "../../lib/utils/convert-duration-ms-to-min-sec";
import getSpotifyTrackId from "../../lib/utils/get-spotify-track-id"
import { shakeAnimation } from "../../lib/library"
interface Props {
    setFormValue: any
    database: string
    isContribute?: boolean,
    user?: any
}

export default function SpotifySearchBar({ setFormValue, database, isContribute, user} : Props) {

    const [spotifyLink, setSpotifyLink] = useState("");
    const spotifySearchInput = useRef<HTMLInputElement>(null);

    const url = database === 'master' ? `/api/v1/admin/songs` : `/api/v1/songs`

    async function handleGetFromSpotify() {


        if(!spotifyLink) {
            shakeAnimation(spotifySearchInput)
            return
        }

        setFormValue({})
        const trackId : string = getSpotifyTrackId(spotifyLink)

        if(!trackId) {
            shakeAnimation(spotifySearchInput)
            return
        }

        try {
            let response = await axios.post(`${url}/spotify?trackId=${trackId}`)

            let songData = response.data.result

            songData.durationMinSec = convertDurationMsToMinSec(songData.durationMs)
            setFormValue({
                ...songData
            })

            if(isContribute) {
                let res = await axios.post(url, songData, {
                    withCredentials: true,
                    headers: {
                        "x-auth-token": `Bearer ${user.tokenString}`
                    }
                })
            }

        } catch (err) {
            console.log(err)
        }

    }

    function selectText() {
        if(spotifySearchInput.current) {
            spotifySearchInput.current.select()
            spotifySearchInput.current.classList.remove("error-textbox-border")
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
            >
                Get from Spotify
            </button>
        </div>
    )
}



