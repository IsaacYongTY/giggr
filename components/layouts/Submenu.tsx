import React from 'react';
import MenuRow from "../elements/MenuRow";
import styles from "../../assets/scss/components/layouts/_submenu.module.scss";

export default function Submenu({ isOpen, setIsSubmenuOpen }: any) {


    return (
        <div
            className={`${styles.submenu} ${isOpen ? styles.open : styles.close}`}
            onMouseEnter={() => setIsSubmenuOpen(true)}
            onMouseLeave={() => setIsSubmenuOpen(false)}
        >
            <MenuRow title="Spotify Meta Tool" link="/utilities/metatool" />
            <MenuRow title="Progression Generator" link="/utilities/progression" />
            <MenuRow title="BPM Tools" link="/utilities/bpm" />
            <MenuRow title="Lead Sheet Generator" link="/utilities/leadsheetspacing" />

        </div>
    )
}
