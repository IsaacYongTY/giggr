import React, { useState } from 'react'
import LoginContainer from '../../components/login/LoginContainer'
import styles from '../../assets/scss/pages/_login.module.scss'
import SignupContainer from "../../components/login/SignupContainer";

export default function Login() {
    const [isLoginPage, setIsLoginPage] = useState(true)
    return (

        <div className={styles.container}>

            <div className="logo-position-top-center">
                <div className="logo logo-white logo-lg" />
            </div>

            {
                isLoginPage ?  <LoginContainer setIsLoginPage={setIsLoginPage}/> : <SignupContainer setIsLoginPage={setIsLoginPage}/>
            }



            <div className={styles.overlay}>

            </div>
        </div>
    )
}

