import React from 'react';
import classnames from 'classnames/bind';

import styles from './MenuRow.module.scss';

const cx = classnames.bind(styles);

type MenuRowProps = {
    icon?: string;
    link?: string;
    title: string,
    callback?: () => void;
}
export default function MenuRow({ icon, link, title, callback }: MenuRowProps) {
    return (
        <div className={cx('container')}>
            <a href={link} className={cx('row')} onClick={callback}>
                {icon && <div className={`${cx('icon')} material-icons`}>{icon}</div>}

                <div className={`${cx('title')}`}>{title}</div>
            </a>
        </div>
    );
}
