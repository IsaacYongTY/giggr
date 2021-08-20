import React from 'react';
import SettingsDropdown from '../SettingsDropdown/SettingsDropdown';
import Image from 'next/image';

import styles from './Header.module.scss';

const Header = ({ title, setIsOpen, isOpen }: any) => {
    return (
        <div className={styles.header}>
            <div className={`material-icons ${styles.menuButton}`} onClick={() => setIsOpen(true)}>
                menu
            </div>
            <div className={`${styles.headerLogoPosition} logo `}>
                <Image
                    src={'/img/logos/giggr-logo-blue-600x250.png'}
                    alt="blue-giggr-logo"
                    width={600}
                    height={250}
                />
            </div>
            <p
                className={`${styles.title} ${
                    isOpen ? styles.sidebarOpenOffset : styles.sidebarCloseOffset
                }`}
            >
                {title}
            </p>
            <SettingsDropdown />
        </div>
    );
};

export default Header;