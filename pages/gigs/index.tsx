import React, { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import axios from 'axios';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

import Layout from '../../components/Layout';
import withAuth from '../../middlewares/withAuth';

import styles from './gigs.module.scss';

export const getServerSideProps: GetServerSideProps = withAuth(async ({ req }: any) => {
    const response = await axios.get(`/api/v1/gigs/`, {
        withCredentials: true,
        headers: {
            'x-auth-token': `Bearer ${req.user.tokenString}`,
        },
    });

    return {
        props: { gigs: response.data.gigs },
    };
});

export default function Index({ gigs }: any) {
    const [events, setEvents] = useState([]);

    function gigsToFullCalendar(gigs: any) {
        return gigs.map((gig: any) => ({
            title: gig.title,
            start: gig.date,
        }));
    }
    useEffect(() => {
        setEvents(gigsToFullCalendar(gigs));
        console.log(events);
    }, []);
    return (
        <Layout>
            <div className={styles.container}>
                <FullCalendar
                    plugins={[dayGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    nowIndicator={true}
                    editable={true}
                    droppable={true}
                    events={events}
                />
            </div>
        </Layout>
    );
}
