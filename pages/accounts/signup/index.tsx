import React, { useState } from 'react'
import SignupContainer from '../../../components/elements/SignupContainer'

const Signup = () => {

    return (
        <div className="login-container">
            <div className="logo-position-top-center">
                <div className="logo logo-white logo-lg"></div>
            </div>
            <SignupContainer />
            <div className="login-overlay"></div>
        </div>
    )
}

export default Signup