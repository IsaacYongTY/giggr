import React from 'react';
import Layout from '../components/layouts/Layout';
import {GetServerSideProps, GetServerSidePropsContext} from "next";
import DashboardCardList from "../components/dashboard/DashboardCardList";
import axios from "axios";
import withAuth from "../middlewares/withAuth";
import styles from "../assets/scss/pages/_dashboard.module.scss";

export const getServerSideProps : GetServerSideProps = withAuth(async ({ req, res } : any) => {

    const config = {
        withCredentials: true,
        headers: {
            "x-auth-token": `Bearer ${req.user.tokenString}`
        }
    }

    let response = await axios.get(`/api/v1/gigs`, config)
    let songsResponse = await axios.get(`/api/v1/songs?number=5&category=createdAt&order=DESC`, config)

    return {
        props: {
            gigs: response.data.gigs,
            songs: songsResponse.data.songs,
            user: req.user
        }
    }
})

function Dashboard({ gigs, songs, user } : any) {
    return (
        <Layout title="Dashboard" user={user}>
            <div className={styles.container}>
                <h2>Welcome!</h2>
                <DashboardCardList gigs={gigs} songs={songs}/>
            </div>

        </Layout>
    )
}

export default Dashboard
