import React, {useState} from 'react';
import styles from "../../assets/scss/components/login/_signup-container.module.scss";
import Link from "next/link";
import {useRouter} from "next/router";
import * as Yup from "yup";
import { Formik } from "formik";
import axios from "axios";

export default function SignupContainer() {

    const router = useRouter();
    const [isShowErrorMessage, setIsShowErrorMessage] = useState(false)
    let schema = Yup.object().shape({
        email: Yup.string()
            .required("Please provide email")
            .email("Please provide a valid email"),
        password: Yup.string()
            .required("Please provide password")
            .min(5)
    })

    interface MyFormValues {
        email: string
        password: string
    }
    const initialValues: MyFormValues = {
        email: "",
        password: ""
    }

    async function handleSignup(values : MyFormValues) {
        console.log(values)
        try {
            let response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/signup`, values, { withCredentials: true})

            await router.push('/dashboard')
        } catch (err) {
            console.log(err.response.data.message)
        }

    }
    return (
        <div className={`${styles.wrapper} card`} >
            <div className="card__body">
                <h2>Sign Up</h2>
                <p>Already registered? <Link href="login">Login here</Link></p>
                <Formik
                    initialValues={initialValues}
                    onSubmit={handleSignup}
                    validationSchema={schema}
                >
                    {({ handleChange,handleSubmit, values, errors, touched }) => (
                        <form method="POST" onSubmit={handleSubmit}>
                            <input className="form-control" name="email" placeholder="Email" type="email" onChange={handleChange} autoComplete="off" />
                            <input className="form-control" name="password" placeholder="Password" type="password" onChange={handleChange} autoComplete="off" />
                            <button className="btn btn-highlight" type="submit">Create Account</button>
                        </form>
                    )}

                </Formik>


                <div className={styles.orLine}>
                    <span>or</span>
                </div>
                <button className="btn btn-outline">Login with Facebook</button>
                <button className="btn btn-outline">Login with Google</button>
            </div>

        </div>
    )
}