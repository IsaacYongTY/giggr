import React, { CSSProperties } from 'react'
import styles from "./SidebarRow.module.scss";

export default function SidebarRow({ icon, title, link, hasSubmenu, isOpen }: any ) {

    const removePadding: CSSProperties = {
         paddingRight: '0'
    }


    return(
        <div
            className={`${styles.sidebarRow}`}
            style={ !isOpen ? removePadding : {}}
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
                <div className={`${isOpen && styles.navigateNext} material-icons`} onMouseEnter={() => console.log('open submenu')}>
                    navigate_next
                </div>
            }

        </div>
    )
}