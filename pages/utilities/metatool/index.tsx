import React, { useState } from 'react';
import classnames from 'classnames/bind';
import axios from 'axios';

import Layout from 'components/Layout';
import SpotifySearchBar from 'components/common/SpotifySearchBar';
import MetaToolForm from 'components/common/MetaToolForm';
import { MetatoolSongMetadata } from 'common/types';
import { deriveMetatoolSongMetadata } from 'common/utils';
import { defaultMetatoolSongMetadata } from 'common/constants';
import Form from 'lib/types/Form';

import withAuth from 'middlewares/withAuth';

import styles from './metatool.module.scss';

const cx = classnames.bind(styles);

export const getServerSideProps = withAuth(async ({ req }: any) => {
    return {
        props: {
            user: req.user,
        },
    };
});

export interface MetatoolPageProps {
    user: {
        tierId: number;
        name: string;
        tokenString: string;
        isAdmin: boolean;
    };
}

export default function MetatoolPage({ user }: MetatoolPageProps) {
    const [metadata, setMetadata] = useState<MetatoolSongMetadata>(
        defaultMetatoolSongMetadata
    );
    const [isContribute, setIsContribute] = useState(user?.isAdmin);

    async function getFromSpotify(trackId: string) {
        // TODO: update endpoint to GET and remove .result from data
        const { data } = await axios.post(
            `/api/v1/songs/spotify?trackId=${trackId}`
        );

        const songData: Form = data.result;

        const metatoolSongMetadata = deriveMetatoolSongMetadata(songData);
        setMetadata(metatoolSongMetadata);

        if (isContribute) {
            await axios.post('/api/v1/admin/songs', songData, {
                withCredentials: true,
                headers: {
                    'x-auth-token': `Bearer ${user.tokenString}`,
                },
            });
        }
    }

    const handleMetadataChange = (metadata: MetatoolSongMetadata) => {
        setMetadata(metadata);
    };

    return (
        <Layout user={user} title="Spotify Meta Tool">
            <div className={cx('container')}>
                <div className={cx('search-bar-container')}>
                    <SpotifySearchBar getFromSpotify={getFromSpotify} />
                </div>

                <MetaToolForm
                    metadata={metadata}
                    handleMetadataChange={handleMetadataChange}
                />

                {user?.isAdmin && (
                    <div className={cx('checkbox-row-container')}>
                        <input
                            type="checkbox"
                            id="contributeCheckbox"
                            defaultChecked={isContribute}
                            onChange={() =>
                                setIsContribute((prevState) => !prevState)
                            }
                        />
                        <label htmlFor="contributeCheckbox">
                            Contribute to Database?
                        </label>
                    </div>
                )}
            </div>
        </Layout>
    );
}
