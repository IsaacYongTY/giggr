import React from 'react';
import styles from "./LoginContainer.module.scss";
import Link from "next/link";

export default function LoginContainer() {
    return (
        <div  className={`${styles.wrapper} card`} >
            <div className="card__body">
                <h2>Log In</h2>
                <p>New user? <Link href="signup">Sign up here</Link></p>
                <form method="POST">
                    <input className="form-control" name="email" placeholder="Email" autoComplete="off" />
                    <input className="form-control" name="password" placeholder="Password" autoComplete="off" />
                    <button className="btn btn-highlight">Log In</button>
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