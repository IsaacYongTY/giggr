// import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles.scss';
import {MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import React from "react";
import "@material-ui/core";
import axios from "axios";
import '@fullcalendar/common/main.css' // @fullcalendar/react imports @fullcalendar/common
import '@fullcalendar/daygrid/main.css' // @fullcalendar/timegrid imports @fullcalendar/daygrid
import '@fullcalendar/timegrid/main.css' // @fullcalendar/timegrid is a direct import

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL

export default function MyApp({ Component, pageProps}) {


    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Component {...pageProps} />
        </MuiPickersUtilsProvider>

    )
}