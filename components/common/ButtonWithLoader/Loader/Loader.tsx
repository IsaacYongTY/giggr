import React from 'react';
import classnames from 'classnames/bind';

import styles from './Loader.module.scss';

const cx = classnames.bind(styles);

export default function Loader() {
    return (
        <div className={cx('loader')}>
            <div className={cx('spinner')}>
                <div className={cx('spinner-sector')} />
                <div className={cx('spinner-sector', 'spinner-sector-white')} />
            </div>
        </div>
    );
}
