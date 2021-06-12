import React, { useState } from 'react'
import LoginContainer from '../../components/login/LoginContainer'

export default function Login() {

    return (

        <div className="login-container">

            <div className="logo-position-top-center">
                <div className="logo logo-white logo-lg"></div>
            </div>

            <LoginContainer />


            <div className="login-overlay">

            </div>
        </div>
    )
}

