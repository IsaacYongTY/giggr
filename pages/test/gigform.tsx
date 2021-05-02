import React, { useState } from "react";
import styles from "./gigform.module.scss";
import Layout from "../../components/layouts/Layout";
import { DateTimePicker, TimePicker, DatePicker, KeyboardDatePicker } from "@material-ui/pickers";
import { ThemeProvider } from "@material-ui/styles";
import {createMuiTheme} from "@material-ui/core";
import blue from "@material-ui/core/colors/blue";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import axios from "axios";

export default function GigForm() {

    const [selectedDate, handleDateChange] = useState(new Date())
    const [selectedTime, handleTimeChange] = useState(null)

    const [isRepeated, setIsRepeated] = useState(false)
    const customDatePickerTheme = createMuiTheme({
        typography: {
            fontSize: 22
        },
        palette: {
            primary: blue
        }
    })

    interface FormValues {
        title: string,
        description: string,
        date: Date | null,
        time: Date | null,
        venue: string,
        pay: number,
        isRepeat: boolean,
        frequency: string
    }
    const initialValues: FormValues = {
        title: "",
        description: "",
        date: new Date(),
        time: new Date(),
        venue: "",
        pay: 0,
        isRepeat: false,
        frequency: ""
    }

    const handleSubmit = async (values: FormValues) => {
        console.log(values)

        let response = await axios.post('http://localhost:8080/api/v1/gigs', values, { withCredentials: true })
        console.log(response)
    }

    const TimePickerField = ({ field, form, ...other}: any) => {
        const currentError = form.errors[field.name]

        return (
            <ThemeProvider theme={customDatePickerTheme}>
                <TimePicker
                    name={field.name}
                    value={field.value}
                    helperText={currentError}
                    variant="inline"
                    // inputVariant="outlined"
                    error={Boolean(currentError)}
                    onError = { error => {
                        if(error !== currentError) {
                            form.setFieldError(field.name, error)
                        }
                    }}
                    onChange = { date => form.setFieldValue(field.name, date, false)}
                    {...other}
                />
            </ThemeProvider>
        )
    }

    const validationSchema = Yup.object().shape({
        title: Yup.string().required("Please give the gig a title"),
        description: Yup.string(),
        date: Yup.date().required(),
        pay: Yup.number()
    })
    const DatePickerField = ({ field, form, ...other}: any) => {
        const currentError = form.errors[field.name]

        return (
            <ThemeProvider theme={customDatePickerTheme}>
                <DatePicker
                    name={field.name}
                    value={field.value}
                    helperText={currentError}
                    variant="inline"
                    // inputVariant="outlined"
                    error={Boolean(currentError)}
                    autoOk={true}
                    format="dd/MM/yyyy"
                    onError = { error => {
                        if(error !== currentError) {
                            form.setFieldError(field.name, error)
                        }
                    }}
                    onChange = { date => form.setFieldValue(field.name, date, false)}
                    {...other}
                />
            </ThemeProvider>
        )
    }
    return (

        <Layout>

            <div className={styles.container}>

                <Formik
                    initialValues={initialValues}
                    onSubmit={(values) => handleSubmit(values)}
                    validationSchema={validationSchema}
                >
                    {
                        ({ values, errors, handleChange, handleSubmit, touched ,setFieldValue}) => (
                        <form className={styles.form} onSubmit={handleSubmit}>
                            <div className={styles.formRow}>
                                <label>Title:*</label>
                                <input className="form-control" name="title" onChange={handleChange} autoComplete="off"/>
                                <div className="error-message">
                                    <ErrorMessage name="title" />
                                </div>

                            </div>

                            <div className={styles.formRow}>
                                <label>Description:</label>
                                <textarea className="form-control" name="description" onChange={handleChange}/>
                            </div>

                            <div className={styles.row}>
                                <div className={styles.col}>
                                    <label>Date:</label>
                                    <Field name="date" component={DatePickerField} />
                                </div>


                                <div className={styles.col}>
                                    <label>Time:</label>
                                    <Field name="time" component={TimePickerField} />
                                </div>
                            </div>



                            <div className={styles.formRow}>
                                <label>Venue:</label>
                                <input className="form-control" name="venue" onChange={handleChange} autoComplete="off"/>
                            </div>

                            <div className={styles.formRow}>
                                <label>Pay:</label>
                                <input className="form-control" name="pay" onChange={handleChange} autoComplete="off"/>
                                <div className="error-message">
                                    <ErrorMessage name="pay" />
                                </div>
                            </div>

                            <div className={styles.row}>
                                <div className={styles.formRow}>
                                    <label>Repeat:</label>
                                    <Field type="checkbox" name="isRepeat" onClick={() => setIsRepeated(prevState => !prevState)}/>
                                </div>

                                <div className={styles.formRow}>
                                    {
                                        isRepeated &&
                                        <>
                                            <label>Frequency:</label>
                                            <Field as="select" name="frequency">
                                                <option value="weekly">Weekly</option>
                                                <option value="monthly">Monthly</option>
                                                <option value="biweekly">Biweekly</option>
                                            </Field>
                                        </>
                                    }

                                </div>
                            </div>

                            <div>
                                <button type="submit" className="btn btn-primary">Add Gig</button>
                            </div>
                        </form>
                        )
                    }

                </Formik>
            </div>

        </Layout>


    )
}