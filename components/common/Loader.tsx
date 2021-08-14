import React from 'react';
import styles from '../../assets/scss/components/common/_loader.module.scss';

export default function Loader() {
    return (
        <div className={`${styles.loader}`}>
            <div className={styles.spinner}>
                {/*<div className={styles.spinnerText}></div>*/}
                <div className={styles.spinnerSector} />
                <div
                    className={`${styles.spinnerSector} ${styles.spinnerSectorWhite}`}
                />
            </div>
        </div>
    );
}
