import React from "react";
import GigsCard from "./GigsCard";
import styles from "../../assets/scss/components/dashboard/_dashboard-card-list.module.scss";
import RepertoireCard from "./RepertoireCard";

export default function DashboardCardList({ gigs, songs }: any) {
    return (
        <div className={styles.container}>
            <RepertoireCard songs={songs}/>
            <GigsCard gigs={gigs}/>
        </div>
    )
}