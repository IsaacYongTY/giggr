import React from 'react'
import styles from './Header.module.scss';

const Header = ({ title }: any) => {
    return (
        <div className={styles.header}>
            <div className={`${styles.headerLogoPosition} logo logo-blue`}></div>
            <p>{title}</p>
            <span className={`material-icons ${styles.gearIconPosition} }`}>
                settings
            </span>
        </div>
    )
}

export default Header