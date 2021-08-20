import React, { Dispatch, SetStateAction, useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useRouter } from 'next/router';
import { setCookie } from 'nookies';

import ButtonWithLoader from '../../common/ButtonWithLoader';

import styles from './LoginContainer.module.scss';

interface Props {
    setIsLoginPage: Dispatch<SetStateAction<boolean>>;
}

export default function LoginContainer({ setIsLoginPage }: Props) {
    const router = useRouter();

    const [isShowErrorMessage, setIsShowErrorMessage] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const schema = Yup.object().shape({
        email: Yup.string().required('Please provide email').email('Please provide a valid email'),
        password: Yup.string().required('Please provide password').min(5),
    });

    interface MyFormValues {
        email: string;
        password: string;
    }
    const initialValues: MyFormValues = {
        email: '',
        password: '',
    };

    async function handleLogin(values: MyFormValues) {
        try {
            setIsLoading(true);
            const res = await axios.post(`/api/v1/auth/login`, values);

            setCookie(null, 'x-auth-token', `Bearer ${res.data.token}`, {
                maxAge: 30 * 24 * 60 * 60,
                path: '/',
            });

            setIsShowErrorMessage(false);
            router.push('/dashboard');
        } catch (err) {
            setIsShowErrorMessage(true);
            setIsLoading(false);
            console.log(err);
        }
    }

    return (
        <div className={`${styles.wrapper} card`}>
            <div className="card__body">
                <h2>Log In</h2>
                <p>
                    New user?
                    <a onClick={() => setIsLoginPage(false)}>Sign up here</a>
                </p>

                <Formik
                    initialValues={initialValues}
                    onSubmit={handleLogin}
                    validationSchema={schema}
                >
                    {({ errors, handleChange, handleSubmit, touched }) => (
                        <form method="POST" onSubmit={handleSubmit}>
                            <input
                                className="form-control"
                                name="email"
                                placeholder="Email"
                                autoComplete="off"
                                onChange={handleChange}
                                type="email"
                            />
                            <div>{errors.email && touched.email && errors.email}</div>

                            <input
                                className="form-control"
                                name="password"
                                placeholder="Password"
                                type="password"
                                onChange={handleChange}
                                autoComplete="off"
                            />
                            {errors.password && touched.password && errors.password}
                            {isShowErrorMessage && (
                                <span>Invalid email or password. Please try again.</span>
                            )}
                            <ButtonWithLoader
                                isLoading={isLoading}
                                label="Log In"
                                onClick={() => console.log('placeholder')}
                            />
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
    );
}
