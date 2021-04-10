import React, { CSSProperties, useState } from 'react';
import styles from './Sidebar.module.scss'
import { Row, Col } from 'react-bootstrap';
import SidebarRow from "./SidebarRow";
import Link from "next/link";

export default function Sidebar({ isOpen, setIsOpen }: any) {



    function handleToggleSidebar() {
        console.log('clicked')
        setIsOpen((prevState: Boolean) => !prevState)
    }

    const closedSidebarCSS : CSSProperties = {
        width: '6.5rem'
    }

    return (
        <div
            className={`${styles.sidebar} ${isOpen ? styles.open : styles.close}`}
            style={ !isOpen ? closedSidebarCSS : {}}
        >
            <div className={styles.sidebarHeader}>
                <div className="material-icons text-white menu-button" onClick={handleToggleSidebar}>
                    menu
                </div>

                {
                    isOpen &&
                    <Link href="dashboard">
                        <div className="logo logo-white"></div>
                    </Link>
                }

            </div>

            <SidebarRow icon="dashboard" title="Dashboard" link="dashboard" isOpen={isOpen} />
            <SidebarRow icon="music_note" title="My Repertoire" link="repertoire" isOpen={isOpen} />
            <SidebarRow icon="work" title="My Gigs" link="gigs" isOpen={isOpen} />
            <SidebarRow icon="handyman" title="Utilities" hasSubmenu={true} isOpen={isOpen} />
            <SidebarRow icon="insights" title="Stats" link="stats" isOpen={isOpen} />

        </div>
    )
}