import React from 'react';
import Layout from '../components/layouts/Layout';
import {GetServerSideProps, GetServerSidePropsContext} from "next";
import DashboardCardList from "../components/elements/DashboardCardList";
import jwt from "jsonwebtoken";
import axios from "axios";

export const getServerSideProps : GetServerSideProps = async ({ req, res } : GetServerSidePropsContext) => {


    let secret: string = process.env.NEXT_PUBLIC_SECRET || '';

    let decoded = jwt.verify(req.cookies.auth_token, secret);
    console.log(decoded)


    let response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/gigs`)
    //
    // console.log(response)

    let songsResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/songs?number=5`)
    console.log(songsResponse.data)
    if(!req.cookies.auth_token) {
        return {
            redirect: {
                permanent: false,
                destination: 'accounts/login'
            }
        }
    }

    return {
        props: {
            gigs: response.data.gigs,
            songs: songsResponse.data.songs
        }
    }
}

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
