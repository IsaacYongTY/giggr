import React from 'react';
import styles from '../../assets/scss/components/dashboard/_dashboard-card.module.scss';
import GigItemRow from './GigItemRow';
import Link from 'next/link';

export default function GigsCard({ gigs }: any) {
    return (
        <div className={`${styles.container} card`}>
            <div className={styles.title}>
                <p>
                    You have{' '}
                    <span className="text-primary">{gigs?.length}</span> gigs{' '}
                </p>
                <p>this week</p>
            </div>
            <div className={styles.list}>
                <ul>
                    {gigs?.slice(0, 3).map((gig: any) => (
                        <li>
                            <GigItemRow gig={gig} />
                        </li>
                    ))}
                </ul>
            </div>

            <div className={styles.footer}>
                <Link href="/gigs">
                    <a>Go to My Gigs {'>'}</a>
                </Link>
            </div>
        </div>
    );
}
