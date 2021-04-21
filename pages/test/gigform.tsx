import React from "react";
import styles from "./gigform.module.scss";
import Layout from "../../components/layouts/Layout";

export default function GigForm() {

    return (
        <Layout>
            <div className={styles.container}>
                <form className={styles.form}>
                    <div className={styles.formRow}>
                        <label>Title:</label>
                        <input className="form-control"/>
                    </div>

                    <div className={styles.formRow}>
                        <label>Description:</label>
                        <textarea className="form-control"/>
                    </div>

                    <div className={styles.formRow}>
                        <label>Date:</label>
                        <input className="form-control"/>
                    </div>

                    <div className={styles.formRow}>
                        <label>Time:</label>
                        <input className="form-control"/>
                    </div>

                    <div className={styles.formRow}>
                        <label>Venue:</label>
                        <input className="form-control"/>
                    </div>

                    <div className={styles.formRow}>
                        <label>Pay:</label>
                        <input className="form-control"/>
                    </div>

                    <div>
                        <label>Repeat:</label>
                        <input type="checkbox" className="form-control"/>
                    </div>

                    <button type="submit" className="btn btn-primary">Add Gig</button>
                </form>
            </div>

        </Layout>
    )
}