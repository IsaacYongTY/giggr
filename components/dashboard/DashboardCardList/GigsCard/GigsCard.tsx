import React from 'react';
import classnames from 'classnames/bind';
import Link from 'next/link';

import GigItemRow from './GigItemRow';

import styles from './GigsCard.module.scss';

const cx = classnames.bind(styles);

export default function GigsCard({ gigs }: any) {
    return (
        <div className={cx('container', 'card')}>
            <div className={cx('title')}>
                <p>
                    You have{' '}
                    <span className="text-primary">{gigs?.length}</span> gigs{' '}
                </p>
                <p>this week</p>
            </div>
            <div className={cx('list')}>
                <ul>
                    {gigs?.slice(0, 3).map((gig: any, index: number) => (
                        <li key={index}>
                            <GigItemRow gig={gig} />
                        </li>
                    ))}
                </ul>
            </div>

            <div className={cx('footer')}>
                <Link href="/gigs">
                    <a>Go to My Gigs {'>'}</a>
                </Link>
            </div>
        </div>
    );
}
