import React, { useRef, useState } from 'react';
import axios from 'axios';
import styles from './SpotifySearchBar.module.scss';
import convertDurationMsToMinSec from '../../../lib/utils/convert-duration-ms-to-min-sec';
import getSpotifyTrackId from '../../../lib/utils/get-spotify-track-id';
import { shakeAnimation } from '../../../lib/library';
import ButtonWithLoader from '../ButtonWithLoader/ButtonWithLoader';

interface Props {
    setFormValue: any;
    database?: string;
    isContribute?: boolean;
    user?: any;
}

export default function SpotifySearchBar({
    setFormValue,
    isContribute,
    user,
}: Props) {
    const [spotifyLink, setSpotifyLink] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const spotifySearchInput = useRef<HTMLInputElement>(null);

    async function handleGetFromSpotify() {
        setFormValue({});
        if (!spotifyLink) {
            shakeAnimation(spotifySearchInput);
            return;
        }

        const trackId: string = getSpotifyTrackId(spotifyLink);

        if (!trackId) {
            shakeAnimation(spotifySearchInput);
            return;
        }

        setIsLoading(true);

        try {
            const response = await axios.post(
                `/api/v1/songs/spotify?trackId=${trackId}`
            );

            const songData = response.data.result;

            songData.durationMinSec = convertDurationMsToMinSec(
                songData.durationMs
            );
            setFormValue({
                ...songData,
            });

            if (isContribute) {
                await axios.post('/api/v1/admin/songs', songData, {
                    withCredentials: true,
                    headers: {
                        'x-auth-token': `Bearer ${user.tokenString}`,
                    },
                });
            }

            setIsLoading(false);
        } catch (err) {
            setIsLoading(false);
            console.log(err);
        }
    }

    function selectText() {
        if (spotifySearchInput.current) {
            spotifySearchInput.current.select();
            spotifySearchInput.current.classList.remove('error-textbox-border');
        }
    }

    return (
        <div className={styles.container}>
            <input
                name="spotifySearch"
                className={`${styles.searchBar} form-control`}
                onChange={(e) => setSpotifyLink(e.target.value)}
                ref={spotifySearchInput}
                onClick={selectText}
                placeholder="https://open.spotify.com/track/...."
            />
            <ButtonWithLoader
                label="Get From Spotify"
                onClick={handleGetFromSpotify}
                isLoading={isLoading}
                primary={true}
            />
        </div>
    );
}
