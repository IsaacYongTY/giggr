import React from 'react';
import styles from '../../assets/scss/components/common/_status-pill-button.module.scss';

type Props = {
    label: string;
};

export default function StatusPillButton({ label }: Props) {
    let selectedStyle;

    switch (label) {
        case 'New':
            selectedStyle = styles.new;
            break;
        case 'In Progress':
            selectedStyle = styles.inProgress;
            break;
        case 'Learned':
            selectedStyle = styles.learned;
            break;
        case 'Charted':
            selectedStyle = styles.charted;
            break;
    }

    return (
        <button className={selectedStyle}>
            <span>{label}</span>
        </button>
    );
}
