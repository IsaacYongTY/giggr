import React from "react";
import DashboardCard from "./DashboardCard";
import styles from "../../assets/scss/components/dashboard/_dashboard-card-list.module.scss";

export default function DashboardCardList({ gigs, songs }: any) {
    return (
        <div className={styles.container}>
            <DashboardCard type="repertoire" link="repertoire" songs={songs}/>
            <DashboardCard type="gigs" link="gigs" gigs={gigs}/>
        </div>
    )
}