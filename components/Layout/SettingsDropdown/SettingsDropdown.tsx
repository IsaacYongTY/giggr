import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { destroyCookie } from 'nookies';

import MenuRow from '../../common/MenuRow';

import styles from './SettingsDropdown.module.scss';

export default function SettingsDropdown() {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();

    function handleLogout() {
        console.log('working');
        destroyCookie(undefined, 'x-auth-token');
        setIsOpen(false);
        router.push('/accounts/login');
    }

    function handleOpenDropdown() {
        setIsOpen((prevState) => !prevState);
    }

    //temporary solution
    function handleOnBlur() {
        const timer = setTimeout(() => {
            setIsOpen(false);
            clearTimeout(timer);
        }, 100);
    }

    return (
        <div tabIndex={-1} onBlur={handleOnBlur}>
            <div className={`${styles.container} noselect`}>
                <button
                    className={`material-icons ${styles.gearIcon} }`}
                    onClick={handleOpenDropdown}
                >
                    settings
                </button>
            </div>

            {isOpen && (
                <div className={styles.menu}>
                    <MenuRow icon="settings" title="Settings" onClick={() => setIsOpen(false)} />
                    <MenuRow icon="help" title="Help" />
                    <MenuRow icon="logout" title="Logout" action={handleLogout} />
                </div>
            )}
        </div>
    );
}
