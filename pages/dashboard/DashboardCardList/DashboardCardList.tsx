import React from 'react';
import classnames from 'classnames/bind';

import GigsCard from './GigsCard';
import RepertoireCard from './RepertoireCard';

import styles from './DashboardCardList.module.scss';

const cx = classnames.bind(styles);

export default function DashboardCardList({ gigs, songs }: any) {
    return (
        <div className={cx('container')}>
            <RepertoireCard songs={songs} />
            <GigsCard gigs={gigs} />
        </div>
    );
}
