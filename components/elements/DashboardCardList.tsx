import React from "react";
import DashboardCard from "./DashboardCard";
import styles from "./DashboardCardList.module.scss";

export default function DashboardCardList() {
    return (
        <div className={styles.container}>
            <DashboardCard type="repertoire" link="repertoire"/>
            <DashboardCard type="gigs" link="gigs"/>
        </div>
    )
}