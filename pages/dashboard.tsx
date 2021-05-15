import React from 'react';
import Layout from '../components/layouts/Layout';
import {GetServerSideProps, GetServerSidePropsContext} from "next";
import DashboardCardList from "../components/elements/DashboardCardList";
import jwt from "jsonwebtoken";
import axios from "axios";
import withAuth from "../middlewares/withAuth";


export const getServerSideProps : GetServerSideProps = withAuth(async ({ req, res } : any) => {

    console.log("working here")
    console.log(req.user.tokenString)
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
            songs: songsResponse.data.songs
        }
    }
})

function Dashboard({ gigs, songs } : any) {
    console.log(gigs)
    return (
        <Layout title="Dashboard">
            <div>
                <h2>Welcome!</h2>
                <DashboardCardList gigs={gigs} songs={songs}/>
            </div>

        </Layout>
    )
}

export default Dashboard
