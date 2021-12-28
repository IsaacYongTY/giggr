import React, { useState } from 'react';
import classnames from 'classnames/bind';
import { useRouter } from 'next/router';
import { destroyCookie } from 'nookies';

import MenuRow from '../../common/MenuRow';

import styles from './SettingsDropdown.module.scss';

const cx = classnames.bind(styles);

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
            <div className={cx('container')}>
                <button
                    className={cx('material-icons', 'gear-icon')}
                    onClick={handleOpenDropdown}
                >
                    settings
                </button>
            </div>

            {isOpen && (
                <div className={cx('menu')}>
                    <MenuRow
                        icon="settings"
                        title="Settings"
                        callback={() => setIsOpen(false)}
                    />
                    <MenuRow icon="help" title="Help" />
                    <MenuRow
                        icon="logout"
                        title="Logout"
                        callback={handleLogout}
                    />
                </div>
            )}
        </div>
    );
}
