import React from 'react';
import classnames from 'classnames/bind';
import Link from 'next/link';

import Song from '../../../../lib/types/song';

import styles from './RepertoireCard.module.scss';

const cx = classnames.bind(styles);

export default function RepertoireCard({ songs }: any) {
    return (
        <div className={cx('container', 'card')}>
            <div className={cx('title')}>
                <p>You have added</p>
                <p>
                    <span className="text-primary">3</span> songs this week
                </p>
            </div>
            <div className={cx('list')}>
                <p>Recently added:</p>
                <ul>
                    {songs?.map((song: Song, index: number) => (
                        <li key={index}>
                            {song.title} - {song.artist.name}
                        </li>
                    ))}
                </ul>
            </div>

            <div className={cx('footer')}>
                <Link href="/repertoire">
                    <a>Go to My Repertoire {'>'}</a>
                </Link>
            </div>
        </div>
    );
}
