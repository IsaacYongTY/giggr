import React, { useState } from 'react';
import classnames from 'classnames/bind';
import Image from 'next/image';

import LoginContainer from 'components/login/LoginContainer';
import SignupContainer from 'components/login/SignupContainer';

import styles from './LoginPage.module.scss';

const cx = classnames.bind(styles);

export default function Index() {
    const [isLoginPage, setIsLoginPage] = useState(true);
    return (
        <div className={cx('container')}>
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

            <div className={cx('overlay')} />
        </div>
    );
}
