import React from 'react';
import Layout from '../components/layouts/Layout';
import {GetServerSideProps, GetServerSidePropsContext} from "next";

export const getServerSideProps : GetServerSideProps = async ({ req, res } : GetServerSidePropsContext) => {

    if(!req.cookies.auth_token) {
        return {
            redirect: {
                permanent: false,
                destination: 'accounts/login'
            }
        }
    }
    return {
        props: { }
    }
}

function Dashboard() {

    return (
        <Layout title="Dashboard">
            <h1>THis is a Dashboard</h1>
            khglkijhfglasdkjhdddddddddddddddddddddddddddddddddddddddddddd
        </Layout>
    )
}

export default Dashboard
