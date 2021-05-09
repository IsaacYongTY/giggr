// import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles.scss';
import {MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import React from "react";
import "@material-ui/core";
import axios from "axios";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL

export default function MyApp({ Component, pageProps}) {


    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Component {...pageProps} />
        </MuiPickersUtilsProvider>

    )
}