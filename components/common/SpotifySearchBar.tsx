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

    const url = `/api/v1/songs`

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
            console.log(user.tokenString)
            let response = await axios.post(`/api/v1/songs/spotify?trackId=${trackId}`,{},{
                withCredentials: true,
                headers: {
                    "x-auth-token": `Bearer ${user.tokenString}`
                }
            })

            let songData = response.data.result

            songData.durationMinSec = convertDurationMsToMinSec(songData.durationMs)
            setFormValue({
                ...songData
            })

            if(isContribute) {
                await axios.post("/api/v1/admin/songs", songData, {
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



