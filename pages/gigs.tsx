import React, {useEffect, useState} from "react"
import Layout from "../components/layouts/Layout";
import styles from "../assets/scss/pages/_gigs.module.scss";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import axios from "axios";
import withAuth from "../middlewares/withAuth";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

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

    const [events, setEvents] = useState([])

    function gigsToFullCalendar(gigs: any) {
        return gigs.map((gig: any) => (
            {
                title: gig.title,
                start: gig.date
            }
        ))
    }
    useEffect(() => {
        setEvents(gigsToFullCalendar(gigs))
        console.log(events)
    },[])
    return (
        <Layout>
            <div className="container">


                    <FullCalendar
                        plugins={[ dayGridPlugin, interactionPlugin ]}
                        initialView="dayGridMonth"
                        // initialEvents={events}
                        nowIndicator={true}
                        editable={true}
                        droppable={true}
                        events={events}
                    />

            </div>



            {/*<div className={styles.gridContainer}>*/}
            {/*    {*/}
            {/*        gigs.map( (gig:any) => (*/}

            {/*            <div className="card">*/}

            {/*                <div>{gig.title}</div>*/}
            {/*                <div>{gig.venue}</div>*/}
            {/*                <div>{gig.date}</div>*/}
            {/*                <div>Owner: {gig.userId}</div>*/}

            {/*            </div>*/}
            {/*        ))*/}
            {/*    }*/}
            {/*</div>*/}

        </Layout>
    )
}
