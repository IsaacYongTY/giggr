import React from 'react';

import styles from './ButtonLoader.module.scss';

export default function ButtonLoader() {
    return (
        <div className={`${styles.loader}`}>
            <div className={styles.spinner}>
                <div className={styles.spinnerSector} />
                <div className={`${styles.spinnerSector} ${styles.spinnerSectorWhite}`} />
            </div>
        </div>
    );
}
