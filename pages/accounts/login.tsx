import React, { useState } from 'react'
import LoginContainer from '../../components/elements/LoginContainer'

const Login = () => {

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

export default Login
