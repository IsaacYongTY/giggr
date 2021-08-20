import React, { useState } from 'react';
import Image from 'next/image';

import LoginContainer from './LoginContainer';
import SignupContainer from './SignupContainer';

import styles from './login.module.scss';

export default function Login() {
    const [isLoginPage, setIsLoginPage] = useState(true);
    return (
        <div className={styles.container}>
            <div className="logo-position-top-center">
                <Image src="/img/logos/giggr-logo-white-600x250.png" width={200} height={80} />
            </div>

            {isLoginPage ? (
                <LoginContainer setIsLoginPage={setIsLoginPage} />
            ) : (
                <SignupContainer setIsLoginPage={setIsLoginPage} />
            )}

            <div className={styles.overlay} />
        </div>
    );
}
