import React, { Dispatch, SetStateAction, useRef } from 'react';
import classnames from 'classnames/bind';
import Link from 'next/link';
import Image from 'next/image';

import SidebarRow from './SidebarRow';

import styles from './Sidebar.module.scss';

const cx = classnames.bind(styles);

type Props = {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    currentPathName: string;
    user: any;
};

export default function Sidebar({
    isOpen,
    setIsOpen,
    currentPathName,
    user,
}: Props) {
    const sidebar = useRef<HTMLDivElement>(null);

    function handleToggleSidebar() {
        if (!isOpen) {
            setIsOpen(true);
            sidebar?.current?.classList.add(cx('open'));
            sidebar?.current?.classList.remove(cx('close'));
            return;
        }

        setIsOpen(false);
        sidebar?.current?.classList.add(cx('close'));
        sidebar?.current?.classList.remove(cx('add'));
    }

    return (
        <div className={cx('container')} ref={sidebar}>
            <div className={cx('header')}>
                <div
                    className="material-icons text-white menu-button"
                    onClick={handleToggleSidebar}
                >
                    menu
                </div>

                {isOpen && (
                    <Link href="/dashboard">
                        <div className="logo">
                            <Image
                                src={'/img/logos/giggr-logo-white-600x250.png'}
                                alt="white giggr logo"
                                width={650}
                                height={500}
                            />
                        </div>
                    </Link>
                )}
            </div>

            <SidebarRow
                icon="dashboard"
                title="Dashboard"
                link="/dashboard"
                isOpen={isOpen}
                currentPathName={currentPathName}
            />
            <SidebarRow
                index={1}
                icon="music_note"
                title="My Repertoire"
                link="/repertoire"
                isOpen={isOpen}
                currentPathName={currentPathName}
                hasSubmenu={true}
                options={[
                    { title: 'Artists', link: '#' },
                    { title: 'Setlists', link: '#' },
                ]}
            />
            <SidebarRow
                icon="work"
                title="My Gigs"
                link="/gigs"
                isOpen={isOpen}
                currentPathName={currentPathName}
            />
            <SidebarRow
                index={3}
                icon="handyman"
                title="Utilities"
                link="/utilities"
                hasSubmenu={true}
                isOpen={isOpen}
                currentPathName={currentPathName}
                options={[
                    {
                        title: 'Spotify Meta Tool',
                        link: '/utilities/metatool',
                    },
                    {
                        title: 'Progression Generator',
                        link: '/utilities/progression',
                    },
                    { title: 'BPM Tools', link: '/utilities/bpm' },
                    {
                        title: 'Lead Sheet Spacing',
                        link: '/utilities/leadsheetspacing',
                    },
                ]}
            />

            <SidebarRow
                icon="insights"
                title="Stats"
                link="/stats"
                isOpen={isOpen}
                currentPathName={currentPathName}
            />

            {user?.isAdmin && (
                <SidebarRow
                    icon="admin_panel_settings"
                    title="Admin"
                    link="/admin"
                    isOpen={isOpen}
                    currentPathName={currentPathName}
                    hasSubmenu={true}
                    options={[
                        {
                            title: 'Manage Database',
                            link: '/admin/database',
                        },
                        { title: 'Playground', link: '/test/playground' },
                        { title: 'Gig Form', link: '/test/gigform' },
                    ]}
                />
            )}
        </div>
    );
}
