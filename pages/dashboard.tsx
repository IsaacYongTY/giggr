import React from 'react';
import Layout from '../components/layouts/Layout';
import {GetServerSideProps, GetServerSidePropsContext} from "next";
import DashboardCardList from "../components/elements/DashboardCardList";
import jwt from "jsonwebtoken";

export const getServerSideProps : GetServerSideProps = async ({ req, res } : GetServerSidePropsContext) => {

    // @ts-ignore
    let decoded : any = jwt.verify(req.cookies.auth_token, process.env.NEXT_PUBLIC_SECRET)
    console.log(decoded)
    if(!req.cookies.auth_token) {
        return {
            redirect: {
                permanent: false,
                destination: 'accounts/login'
            }
        }
    }

    return {
        props: { user: decoded.user }
    }
}

function Dashboard({ user } : any) {

    return (
        <Layout title="Dashboard">
            <h2>Welcome, {user.firstName} id: {user.id}!</h2>
            <DashboardCardList />
        </Layout>
    )
}

export default Dashboard
