// import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles.scss';
import {MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import React from "react";
import "@material-ui/core";

export default function MyApp({ Component, pageProps}) {


    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Component {...pageProps} />
        </MuiPickersUtilsProvider>

    )
}