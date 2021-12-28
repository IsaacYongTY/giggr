import React, { useState } from 'react';
import classnames from 'classnames/bind';
import axios from 'axios';

import Layout from '../../../components/Layout';
import SpotifySearchBar from '../../../components/common/SpotifySearchBar';
import MetaToolForm from '../../../components/common/MetaToolForm';

import withAuth from '../../../middlewares/withAuth';
import convertDurationMsToMinSec from '../../../lib/utils/convert-duration-ms-to-min-sec';

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

export default function Index({ user }: MetatoolPageProps) {
    const [formValue, setFormValue] = useState<any>({});
    const [isContribute, setIsContribute] = useState(user?.isAdmin);

    async function getFromSpotify(trackId: string) {
        setFormValue({});
        const { data } = await axios.post(
            `/api/v1/songs/spotify?trackId=${trackId}`
        );

        const songData = data.result;

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
    }

    return (
        <Layout user={user} title="Spotify Meta Tool">
            <div className={cx('container')}>
                <div className={cx('search-bar-container')}>
                    <SpotifySearchBar getFromSpotify={getFromSpotify} />
                </div>

                <MetaToolForm
                    formValue={formValue}
                    setFormValue={setFormValue}
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
