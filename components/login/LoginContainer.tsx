import React, {Dispatch, SetStateAction, useState} from 'react';
import styles from "../../assets/scss/components/login/_login-container.module.scss";
import Link from "next/link";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useRouter } from "next/router";

interface Props {
    setIsLoginPage: Dispatch<SetStateAction<boolean>>
}

export default function LoginContainer({ setIsLoginPage } : Props) {

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

    async function handleLogin(values : MyFormValues) {

        try {

            await axios.post(`/api/v1/auth/login`, values, { withCredentials: true})

            setIsShowErrorMessage(false)
            router.push('/dashboard')

        } catch (err) {
            setIsShowErrorMessage(true)
            console.log(err)
        }

    }

    return (
        <div  className={`${styles.wrapper} card`} >
            <div className="card__body">
                <h2>Log In</h2>
                <p>New user?<a onClick={() => setIsLoginPage(false)}>Sign up here</a></p>


                <Formik
                    initialValues ={initialValues}
                    onSubmit={handleLogin}
                    validationSchema={schema}

                >
                    {
                        ({ values, errors, handleChange, handleSubmit, touched }) => (
                            <form method="POST" onSubmit={handleSubmit}>
                                <input className="form-control" name="email" placeholder="Email" autoComplete="off" onChange={handleChange} type="email"  />
                                <div>
                                    { errors.email && touched.email && errors.email}
                                </div>

                                <input className="form-control" name="password" placeholder="Password" type="password" onChange={handleChange} autoComplete="off" />
                                { errors.password && touched.password && errors.password}
                                { isShowErrorMessage && <span>Invalid email or password. Please try again.</span>}
                                <button className="btn btn-highlight" type="submit">Log In</button>
                            </form>
                        )


                    }
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