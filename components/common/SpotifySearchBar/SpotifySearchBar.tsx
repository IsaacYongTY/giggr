import React, { useRef, useState } from 'react';
import classnames from 'classnames/bind';
import ButtonWithLoader from '../ButtonWithLoader';

import { getSpotifyTrackId } from './utils';
import { shakeAnimation } from 'lib/library';

import styles from './SpotifySearchBar.module.scss';

const cx = classnames.bind(styles);

type SpotifySearchBarProps = {
    getFromSpotify: (trackId: string) => Promise<void>;
};

export default function SpotifySearchBar({
    getFromSpotify,
}: SpotifySearchBarProps) {
    const [spotifyLink, setSpotifyLink] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const spotifySearchInput = useRef<HTMLInputElement>(null);

    async function handleGetFromSpotify() {
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
            await getFromSpotify(trackId);
        } catch (err) {
            console.log(err);
        } finally {
            setIsLoading(false);
        }
    }

    function selectText() {
        if (spotifySearchInput.current) {
            spotifySearchInput.current.select();
            spotifySearchInput.current.classList.remove('error-textbox-border');
        }
    }

    return (
        <div className={cx('container')}>
            <input
                name="spotifySearch"
                className="form-control"
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
