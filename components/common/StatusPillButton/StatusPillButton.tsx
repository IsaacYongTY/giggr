import React from 'react';
import classnames from 'classnames/bind';

import styles from './StatusPillButton.module.scss';

const cx = classnames.bind(styles);

type Props = {
    label: string;
};

export default function StatusPillButton({ label }: Props) {
    let selectedStyle;

    switch (label) {
        case 'New':
            selectedStyle = cx('new');
            break;
        case 'In Progress':
            selectedStyle = cx('in-progress');
            break;
        case 'Learned':
            selectedStyle = cx('learned');
            break;
        case 'Charted':
            selectedStyle = cx('charted');
            break;
    }

    return (
        <button className={selectedStyle}>
            <span>{label}</span>
        </button>
    );
}
