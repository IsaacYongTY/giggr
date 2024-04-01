import React from 'react';
import classnames from 'classnames/bind';
import { format } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';

import styles from './GigItemRow.module.scss';

const cx = classnames.bind(styles);

export default function GigItemRow({ gig }: any) {
    const combineDateTime = (date: string, time: string) => {
        console.log(date + time);
        return utcToZonedTime(date + 'T' + time, 'Asia/Singapore');
    };

    return (
        <div>
            <div className={cx('row')}>
                <a href={`gigs/${gig.id}`}>{gig.title}</a>
                <p>{gig.venue}</p>
            </div>
            <div className={cx('row')}>
                <p>
                    {format(
                        new Date(combineDateTime(gig.date, gig.time)),
                        'dd MMM yyyy hh:mm a',
                    )}
                </p>
            </div>
        </div>
    );
}
