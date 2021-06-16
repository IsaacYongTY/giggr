import React, { useState } from 'react'
import LoginContainer from '../../components/login/LoginContainer'
import styles from '../../assets/scss/pages/_login.module.scss'

export default function Login() {

    return (

        <div className={styles.container}>

            <div className="logo-position-top-center">
                <div className="logo logo-white logo-lg" />
            </div>

            <LoginContainer />


            <div className={styles.overlay}>

            </div>
        </div>
    )
}

