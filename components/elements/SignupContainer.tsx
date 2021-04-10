import React from 'react';
import styles from "./SignupContainer.module.scss";
import Link from "next/link";
export default function SignupContainer() {
    return (
        <div  className={`${styles.wrapper} card`} >
            <div className="card__body">
                <h2>Sign Up</h2>
                <p>Already registered? <Link href="login">Login here</Link></p>
                <form method="POST">
                    <input className="form-control" name="email" placeholder="Email" autoComplete="off" />
                    <input className="form-control" name="password" placeholder="Password" autoComplete="off" />
                    <button className="btn btn-highlight">Create Account</button>
                </form>

                <div className={styles.orLine}>
                    <span>or</span>
                </div>
                <button className="btn btn-outline">Login with Facebook</button>
                <button className="btn btn-outline">Login with Google</button>
            </div>

        </div>
    )
}