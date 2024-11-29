import React, { useState } from 'react';
import classnames from 'classnames/bind';

import Layout from 'components/Layout';
import SpotifySearchBar from 'components/SpotifySearchBar';
import MetaToolForm from 'components/MetaToolForm';
import { MetatoolSongMetadata } from 'common/types';
import { defaultMetatoolSongMetadata } from 'common/constants';

import withAuth from 'middlewares/withAuth';

import styles from './MetatoolPage.module.scss';

const cx = classnames.bind(styles);

export const getServerSideProps = withAuth(async ({ req }: any) => {
    return {
        props: {
            user: req.user,
        },
    };
});

export type MetatoolPageProps = {
    user: {
        tierId: number;
        name: string;
        tokenString: string;
        isAdmin: boolean;
    };
};

const MetatoolPage: React.FC<MetatoolPageProps> = ({ user }) => {
    const [metadata, setMetadata] = useState<MetatoolSongMetadata>(
        defaultMetatoolSongMetadata,
    );
    const [isContribute, setIsContribute] = useState(user?.isAdmin);

    function getFromSpotifyOnSuccess(songData: any) {
        setMetadata({
            ...songData,
        });
    }

    return (
        <Layout title="Spotify Meta Tool">
            <div className={cx('container')}>
                <div className={cx('search-bar-container')}>
                    <SpotifySearchBar onSuccess={getFromSpotifyOnSuccess} />
                </div>
                <MetaToolForm metadata={metadata} />
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
                New
            </div>
        </Layout>
    );
};

export default MetatoolPage;
