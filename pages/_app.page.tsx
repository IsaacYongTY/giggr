import 'antd/dist/antd.css';
import '../styles.scss';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import React from 'react';
import '@material-ui/core';
import '@material-ui/icons';
import axios from '../config/axios';
import '@fullcalendar/common/main.css'; // @fullcalendar/react imports @fullcalendar/common
import '@fullcalendar/daygrid/main.css'; // @fullcalendar/timegrid imports @fullcalendar/daygrid
import '@fullcalendar/timegrid/main.css'; // @fullcalendar/timegrid is a direct import
import { SWRConfig } from 'swr';
import Head from 'next/head';

axios.defaults.withCredentials = true;
// axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;

export default function MyApp({ Component, pageProps }: any) {
    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <SWRConfig
                value={{
                    fetcher: (url: string) =>
                        axios.get(url).then((res) => res.data),
                }}
            >
                {/*TODO: remove after icons are replaced with components*/}
                <Head>
                    <link
                        href="https://fonts.googleapis.com/icon?family=Material+Icons"
                        rel="stylesheet"
                    />
                </Head>
                <Component {...pageProps} />
            </SWRConfig>
        </MuiPickersUtilsProvider>
    );
}
