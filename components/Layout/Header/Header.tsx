import React from 'react';
import classnames from 'classnames/bind';

import SettingsDropdown from '../SettingsDropdown/SettingsDropdown';
import Image from 'next/image';

import styles from './Header.module.scss';

const cx = classnames.bind(styles);

type HeaderProps = {
    title?: string;
    setIsOpen: (open: boolean) => void,
    isOpen: boolean;
}

const Header: React.FC<HeaderProps> = ({ title, setIsOpen, isOpen }) => {
    return (
        <div className={cx('header')}>
            <div
                className={cx('menu-button', 'material-icons')}
                onClick={() => setIsOpen(true)}
            >
                menu
            </div>
            <div className={cx('logo-position', 'logo')}>
                <Image
                    src={'/img/logos/giggr-logo-blue-600x250.png'}
                    alt="blue-giggr-logo"
                    width={600}
                    height={250}
                />
            </div>
            <p
                className={cx(
                    'title',
                    isOpen ? 'sidebar-open-offset' : 'sidebar-close-offset'
                )}
            >
                {title}
            </p>
            <SettingsDropdown />
        </div>
    );
};

export default Header;
