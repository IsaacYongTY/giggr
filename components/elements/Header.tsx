import React from 'react'
import styles from './Header.module.scss';
import SettingsDropdown from "./SettingsDropdown";

const Header = ({ title }: any) => {
    return (
        <>
            <div className={styles.header}>
                <div className={`${styles.headerLogoPosition} logo logo-blue`}></div>
                <p>{title}</p>
                <SettingsDropdown />

            </div>


        </>



    )
}

export default Header