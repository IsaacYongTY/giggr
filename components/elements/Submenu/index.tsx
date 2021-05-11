import React from 'react';
import MenuRow from "../MenuRow";
import styles from "./Submenu.module.scss";

export default function Submenu({ isOpen, setIsSubmenuOpen }: any) {


    return (
        <div
            className={`${styles.submenu} ${isOpen ? styles.open : styles.close}`}
            onMouseEnter={() => setIsSubmenuOpen(true)}
            onMouseLeave={() => setIsSubmenuOpen(false)}
        >
            <MenuRow title="Progression Generator" link="/utilities/progression" />
            <MenuRow title="Spotify Meta Tool" link="/utilities/metatool" />
            <MenuRow title="BPM Tools" link="/utilities/bpm" />
            <MenuRow title="Lead Sheet Generator" link="/utilities/leadsheetspacing" />


        </div>
    )
}
