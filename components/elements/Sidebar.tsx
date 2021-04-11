import React, { useState } from 'react';
import styles from './Sidebar.module.scss'
import SidebarRow from "./SidebarRow";
import Link from "next/link";
import Submenu from "./Submenu";

export default function Sidebar({ isOpen, setIsOpen, currentPathName }: any) {

    const [isSubmenuOpen, setIsSubmenuOpen] = useState(false)

    function handleToggleSidebar() {
        setIsOpen((prevState: Boolean) => !prevState)
    }

    return (
        <>
            <div
                className={`${styles.sidebar} ${isOpen ? styles.open : styles.close}`}
            >
                <div className={styles.sidebarHeader}>
                    <div className="material-icons text-white menu-button" onClick={handleToggleSidebar}>
                        menu
                    </div>

                    {
                        isOpen &&
                        <Link href="/dashboard">
                            <div className="logo logo-white" />
                        </Link>
                    }
                </div>

                <SidebarRow icon="dashboard" title="Dashboard" link="/dashboard" isOpen={isOpen} currentPathName={currentPathName} />
                <SidebarRow icon="music_note" title="My Repertoire" link="/repertoire" isOpen={isOpen} currentPathName={currentPathName} />
                <SidebarRow icon="work" title="My Gigs" link="/gigs" isOpen={isOpen} currentPathName={currentPathName} />
                <SidebarRow icon="handyman" title="Utilities" hasSubmenu={true} isOpen={isOpen} setIsSubmenuOpen={setIsSubmenuOpen} currentPathName={currentPathName}/>
                <SidebarRow icon="insights" title="Stats" link="/stats" isOpen={isOpen} currentPathName={currentPathName} />


            </div>
            {
                isSubmenuOpen &&
                <Submenu isOpen={isOpen} setIsSubmenuOpen={setIsSubmenuOpen} />
            }

        </>

    )
}