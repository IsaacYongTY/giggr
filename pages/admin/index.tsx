import React from "react";
import Layout from "../../components/layouts/Layout";
import {GetServerSideProps, GetServerSidePropsContext} from "next";
import withAuth from "../../middlewares/withAuth";

export const getServerSideProps : GetServerSideProps = withAuth((({req, res} : any) => {
    return {
        props: {
            user: req.user
        }
    }
}))

export default function AdminPage({ user } : any) {

    return (
        <Layout user={user}>

        </Layout>
    )
}