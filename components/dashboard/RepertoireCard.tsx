import React from 'react';
import styles from '../../assets/scss/components/dashboard/_dashboard-card.module.scss';
import Song from '../../lib/types/song';

import Link from 'next/link';

export default function RepertoireCard({ songs }: any) {
    return (
        <div className={`${styles.container} card`}>
            <div className={styles.title}>
                <p>You have added</p>
                <p>
                    <span className="text-primary">3</span> songs this week
                </p>
            </div>
            <div className={styles.list}>
                <p>Recently added:</p>
                <ul>
                    {songs?.map((song: Song, index: number) => (
                        <li key={index}>
                            {song.title} - {song.artist.name}
                        </li>
                    ))}
                </ul>
            </div>

            <div className={styles.footer}>
                <Link href="/repertoire">
                    <a>Go to My Repertoire {'>'}</a>
                </Link>
            </div>
        </div>
    );
}
