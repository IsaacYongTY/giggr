import React, {CSSProperties, useEffect, useState} from 'react'
import styles from "./SidebarRow.module.scss";
import { useRouter } from 'next/router';

export default function SidebarRow({ icon, title, link, hasSubmenu, isOpen, setIsSubmenuOpen, currentPathName }: any ) {

    const [isActive, setIsActive] = useState(false);

    const removePadding: CSSProperties = {
         paddingRight: '0'
    }

    function handleOpenSubmenu() {
       hasSubmenu && setIsSubmenuOpen(true)
    }

    function handleCloseSubmenu() {
        hasSubmenu && setIsSubmenuOpen(false)
    }

    useEffect(() => {

        if (currentPathName === link) {
            setIsActive(true)
        }
    }, [])

    return(
        <div
            className={`${styles.sidebarRow} ${isActive && styles.active}`}
            style={ !isOpen ? removePadding : {}}
            onMouseEnter={handleOpenSubmenu}
            onMouseLeave={handleCloseSubmenu}
        >
            <a href={link}>
                <div className="material-icons">
                    {icon}
                </div>

                {
                    isOpen &&
                    <div className={`${styles.sidebarTitle}`}>{title}</div>
                }
            </a>

            {
                hasSubmenu &&
                <div className={`${isOpen && styles.navigateNext} material-icons`} >
                    navigate_next
                </div>
            }

        </div>
    )
}