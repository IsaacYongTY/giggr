import React, { Dispatch, SetStateAction } from 'react';
import MenuRow from "./MenuRow";
import styles from "../../assets/scss/components/layouts/_submenu.module.scss";

interface Props {
    index?: number,
    isOpen: boolean,
    setIsSubmenuOpen: Dispatch<SetStateAction<boolean>>
    options: { title: string, link: string}[]
}
export default function Submenu({ index, isOpen, setIsSubmenuOpen, options }: Props) {

    const posY = `pos${index}`

    return (
        <div
            className={`${styles.submenu} ${isOpen ? styles.open : styles.close} ${index && index > -1 ? styles[posY] : ""}`}
            onMouseEnter={() => setIsSubmenuOpen(true)}
            onMouseLeave={() => setIsSubmenuOpen(false)}
        >
            {
                options.map(option => (
                    <MenuRow title={option.title} link={option.link} />
                ))
            }

        </div>
    )
}
