import React, { Dispatch, SetStateAction, useState } from 'react';
import { useRouter } from 'next/router';
import * as Yup from 'yup';
import { Formik } from 'formik';
import axios from 'axios';
import { setCookie } from 'nookies';

import ButtonWithLoader from 'components/ButtonWithLoader';

import styles from './SignupContainer.module.scss';

interface Props {
    setIsLoginPage: Dispatch<SetStateAction<boolean>>;
}

export default function SignupContainer({ setIsLoginPage }: Props) {
    const router = useRouter();
    const [isShowErrorMessage, setIsShowErrorMessage] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const schema = Yup.object().shape({
        email: Yup.string()
            .required('Please provide email')
            .email('Please provide a valid email'),
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

    async function handleSignup(values: MyFormValues) {
        try {
            setIsLoading(true);
            const { data } = await axios.post(`/api/v1/auth/signup`, values);

            setCookie(null, 'x-auth-token', `Bearer ${data.token}`, {
                maxAge: 30 * 24 * 60 * 60,
                path: '/',
            });

            await router.push('/dashboard');
        } catch (err) {
            setIsShowErrorMessage(true);
            setIsLoading(false);
            setErrorMessage(err.response.data.message);
        }
    }
    return (
        <div className={`${styles.wrapper} card`}>
            <div className="card__body">
                <h2>Sign Up</h2>
                <p>
                    Already registered?{' '}
                    <a onClick={() => setIsLoginPage(true)}>Login here</a>
                </p>
                <Formik
                    initialValues={initialValues}
                    onSubmit={handleSignup}
                    validationSchema={schema}
                >
                    {({ handleChange, handleSubmit, errors, touched }) => (
                        <form method="POST" onSubmit={handleSubmit}>
                            <input
                                className="form-control"
                                name="email"
                                placeholder="Email"
                                type="email"
                                onChange={handleChange}
                                autoComplete="off"
                            />
                            <div>
                                {errors.email && touched.email && errors.email}
                            </div>
                            <input
                                className="form-control"
                                name="password"
                                placeholder="Password"
                                type="password"
                                onChange={handleChange}
                                autoComplete="off"
                            />
                            {errors.password &&
                                touched.password &&
                                errors.password}
                            {isShowErrorMessage && <div>{errorMessage}</div>}
                            <ButtonWithLoader
                                label="Create Account"
                                isLoading={isLoading}
                                onClick={() => console.log(handleSubmit)}
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
