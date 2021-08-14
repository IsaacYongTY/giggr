import React, { useState } from 'react';
import LoginContainer from '../../components/login/LoginContainer';
import styles from '../../assets/scss/pages/_login.module.scss';
import SignupContainer from '../../components/login/SignupContainer';
import Image from 'next/image';

export default function Login() {
    const [isLoginPage, setIsLoginPage] = useState(true);
    return (
        <div className={styles.container}>
            <div className="logo-position-top-center">
                <Image
                    src="/img/logos/giggr-logo-white-600x250.png"
                    width={200}
                    height={80}
                />
            </div>

            {isLoginPage ? (
                <LoginContainer setIsLoginPage={setIsLoginPage} />
            ) : (
                <SignupContainer setIsLoginPage={setIsLoginPage} />
            )}

            <div className={styles.overlay}></div>
        </div>
    );
}
