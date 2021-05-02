import React from 'react';
import Layout from '../components/layouts/Layout';
import {GetServerSideProps, GetServerSidePropsContext} from "next";
import DashboardCardList from "../components/elements/DashboardCardList";
import jwt from "jsonwebtoken";

export const getServerSideProps : GetServerSideProps = async ({ req, res } : GetServerSidePropsContext) => {

    if(!req.cookies.auth_token) {
        return {
            redirect: {
                permanent: false,
                destination: '/accounts/login'
            }
        }
    }

    let secret: string = process.env.NEXT_PUBLIC_SECRET || '';

    let decoded: any = jwt.verify(req.cookies.auth_token, secret);

    return {
        props: { user: decoded.user}
    }

}

function Dashboard({  } : any) {

    return (
        <Layout title="Dashboard">
            <h2>Welcome!</h2>
            <DashboardCardList />
        </Layout>
    )
}

export default Dashboard
