import React, { useEffect, useState } from 'react';
import Layout from '../components/layouts/Layout';
import { GetServerSideProps } from 'next';
import DashboardCardList from '../components/dashboard/DashboardCardList';
import axios from '../config/axios';
import withAuth from '../middlewares/withAuth';
import styles from '../assets/scss/pages/_dashboard.module.scss';
import { Switch } from '@material-ui/core';
import Song from '../lib/types/song';
import useSWR from 'swr';

export const getServerSideProps: GetServerSideProps = withAuth(
    async ({ req, res }: any) => {
        return {
            props: {
                user: req.user,
            },
        };
    }
);

function Dashboard({ user }: any) {
    // const config = {
    //     headers: {
    //         "x-auth-token": `Bearer ${user.tokenString}`
    //     }
    // }
    let { data: { gigs } = {} } = useSWR(`/api/v1/gigs`);
    let { data: { songs } = {} } = useSWR(
        `/api/v1/songs?number=5&category=createdAt&order=DESC`
    );

    // const [gigs, setGigs] = useState<any>([])
    // const [songs, setSongs] = useState<Song[]>([])

    useEffect(() => {
        // setSongs(initialSongs)
        // setGigs(initialGigs)
    }, []);

    return (
        <Layout title="Dashboard" user={user}>
            <div className={styles.container}>
                <h2>Welcome!</h2>
                <Switch color="primary" />
                <DashboardCardList gigs={gigs} songs={songs} />
            </div>
        </Layout>
    );
}

export default Dashboard;
