import React from 'react';
import Layout from '../components/layouts/Layout';
import {GetServerSideProps, GetServerSidePropsContext} from "next";
import DashboardCardList from "../components/elements/DashboardCardList";
import jwt from "jsonwebtoken";
import axios from "axios";
import withAuth from "../middlewares/withAuth";


export const getServerSideProps : GetServerSideProps = withAuth(async ({ req, res } : any) => {

    const config = {
        withCredentials: true,
        headers: {
            "x-auth-token": `Bearer ${req.user.token}`
        }
    }

    let response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/gigs`, config)
    let songsResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/songs?number=5`, config)

    return {
        props: {
            gigs: response.data.gigs,
            songs: songsResponse.data.songs
        }
    }
})

function Dashboard({ gigs, songs } : any) {
    console.log(gigs)
    return (
        <Layout title="Dashboard">
            <h2>Welcome!</h2>
            <DashboardCardList gigs={gigs} songs={songs}/>
        </Layout>
    )
}

export default Dashboard
