import React, { useRef, useState } from 'react';
import classnames from 'classnames/bind';

import axios from 'config/axios';

import ButtonWithLoader from '../ButtonWithLoader';
import { getSpotifyTrackId } from './utils';
import { shakeAnimation } from 'lib/library';
import { convertDurationMsToMinSec } from 'common/utils';

import styles from './SpotifySearchBar.module.scss';

const cx = classnames.bind(styles);

type SpotifySearchBarProps = {
    onSuccess: (songData: any) => void;
};

export default function SpotifySearchBar({ onSuccess }: SpotifySearchBarProps) {
    const [spotifyLink, setSpotifyLink] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);

    const spotifySearchInput = useRef<HTMLInputElement>(null);

    async function handleGetFromSpotify() {
        const trackId = getSpotifyTrackId(spotifyLink);

        if (!spotifyLink) {
            shakeAnimation(spotifySearchInput);
            setHasError(true);
            return;
        }

        setIsLoading(true);
        setHasError(false);

        try {
            const { data } = await axios.post(
                `/api/spotify?trackId=${trackId}`,
            );

            const songData = data.result;

            songData.durationMinSec = convertDurationMsToMinSec(
                songData.durationMs,
            );

            onSuccess(songData);
        } catch (err) {
            console.log(err);
            setHasError(true);
        } finally {
            setIsLoading(false);
        }
    }

    function selectText() {
        if (spotifySearchInput.current) {
            spotifySearchInput.current.select();
        }
    }

    return (
        <div className={cx('container')}>
            <input
                className={cx(
                    { 'error-textbox-border': hasError },
                    'form-control',
                )}
                onChange={(e) => setSpotifyLink(e.target.value)}
                ref={spotifySearchInput}
                onClick={selectText}
                placeholder="https://open.spotify.com/track/...."
                spellCheck={false}
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
