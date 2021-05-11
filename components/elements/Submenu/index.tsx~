import React from 'react';
import SubmenuRow from "../SubmenuRow";
import styles from "./Submenu.module.scss";

export default function Submenu({ isOpen, setIsSubmenuOpen }: any) {


    return (
        <div
            className={`${styles.submenu} ${isOpen ? styles.open : styles.close}`}
            onMouseEnter={() => setIsSubmenuOpen(true)}
            onMouseLeave={() => setIsSubmenuOpen(false)}
        >
            <SubmenuRow title="Progression Generator" link="/utilities/progression" />
            <SubmenuRow title="Spotify Meta Tool" link="/utilities/metatool" />
            <SubmenuRow title="BPM Tools" link="/utilities/bpm" />
            <SubmenuRow title="Lead Sheet Generator" link="/utilities/leadsheetspacing" />


        </div>
    )
}
