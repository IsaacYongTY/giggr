import React from "react"
import Layout from "../components/layouts/Layout";
import styles from "./gigs.module.scss";
import {GetServerSideProps, GetServerSidePropsContext} from "next";
import axios from "axios";
import withAuth from "../middlewares/withAuth";

export const getServerSideProps : GetServerSideProps = withAuth(async ({ req, res} : GetServerSidePropsContext ) => {

    // const secret : string = process.env.NEXT_PUBLIC_SECRET || ''
    // let decoded = jwt.verify(req.cookies.auth_token, secret)
    // console.log(decoded)
    let response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/gigs/`, {
        withCredentials: true,
        headers: {
            "x-auth-token": `Bearer ${req.user.token}`
        }
    })
    console.log(response.data)
    return {
        props: { gigs: response.data.gigs }
    }
})

export default function Gigs({ gigs } : any) {

    return (
        <Layout>
            <div className={styles.gridContainer}>
                {
                    gigs.map( gig => (
                        <div>
                            <div className="card">

                                    <div>{gig.title}</div>
                                    <div>{gig.venue}</div>
                                    <div>{gig.date}</div>
                                    <div>Owner: {gig.userId}</div>

                            </div>
                        </div>
                    ))
                }


            </div>
            Gigs Page
        </Layout>
    )
}
