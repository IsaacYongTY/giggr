import React from 'react';

import styles from './MenuRow.module.scss';

export default function MenuRow({ icon, link, title, action }: any) {
    return (
        <div className={styles.container}>
            <a href={link} className={styles.row} onClick={action}>
                {icon && <div className={`${styles.icon} material-icons`}>{icon}</div>}

                <div className={`${styles.title}`}>{title}</div>
            </a>
        </div>
    );
}
