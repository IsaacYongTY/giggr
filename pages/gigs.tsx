import React from "react"
import Layout from "../components/layouts/Layout";
import styles from "./gigs.module.scss";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import axios from "axios";
import withAuth from "../middlewares/withAuth";

export const getServerSideProps : GetServerSideProps = withAuth(async ({ req, res } : any ) => {

    let response = await axios.get(`/api/v1/gigs/`, {
        withCredentials: true,
        headers: {
            "x-auth-token": `Bearer ${req.user.tokenString}`
        }
    })

    return {
        props: { gigs: response.data.gigs }
    }
})

export default function Gigs({ gigs } : any) {

    return (
        <Layout>
            <div className={styles.gridContainer}>
                {
                    gigs.map( (gig:any) => (

                        <div className="card">

                            <div>{gig.title}</div>
                            <div>{gig.venue}</div>
                            <div>{gig.date}</div>
                            <div>Owner: {gig.userId}</div>

                        </div>
                    ))
                }
            </div>

        </Layout>
    )
}
