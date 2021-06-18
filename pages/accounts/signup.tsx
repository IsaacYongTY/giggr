import React, { useState } from 'react'
import SignupContainer from '../../components/login/SignupContainer'
import styles from '../../assets/scss/pages/_login.module.scss'
const Signup = () => {


    return (
        <div className={styles.container}>
            <div className="logo-position-top-center">
                <div className="logo logo-white logo-lg"></div>
            </div>
            <SignupContainer />
            <div className="login-overlay"></div>
        </div>
    )
}

export default Signup