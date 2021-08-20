import React from 'react';

import GigsCard from './GigsCard';
import RepertoireCard from './RepertoireCard';

import styles from './DashboardCardList.module.scss';

export default function DashboardCardList({ gigs, songs }: any) {
    return (
        <div className={styles.container}>
            <RepertoireCard songs={songs} />
            <GigsCard gigs={gigs} />
        </div>
    );
}
