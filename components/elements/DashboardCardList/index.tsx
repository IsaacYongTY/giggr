import React from "react";
import DashboardCard from "../DashboardCard";
import styles from "./DashboardCardList.module.scss";

export default function Index({ gigs, songs }: any) {
    return (
        <div className={styles.container}>
            <DashboardCard type="repertoire" link="repertoire" songs={songs}/>
            <DashboardCard type="gigs" link="gigs" gigs={gigs}/>
        </div>
    )
}