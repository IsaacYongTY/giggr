import React, {CSSProperties, useEffect, useState} from 'react'
import styles from "../../assets/scss/components/layouts/_sidebar-row.module.scss";
import Submenu from "./Submenu";

interface Props {
    index?: number
    icon: string,
    title: string,
    link: string,
    isOpen: boolean
    hasSubmenu?: boolean
    currentPathName: string
    options?: { title: string, link: string}[]

}
export default function SidebarRow({ index, icon, title, link, isOpen, hasSubmenu = false, currentPathName, options  }: Props ) {

    const [isActive, setIsActive] = useState(false);
    const [isSubmenuOpen, setIsSubmenuOpen] = useState(false)

    const removePadding: CSSProperties = {
         paddingRight: '0'
    }

    function handleOpenSubmenu() {
        if(hasSubmenu && setIsSubmenuOpen) {
            setIsSubmenuOpen(true)
        }
    }

    function handleCloseSubmenu() {
        if(hasSubmenu && setIsSubmenuOpen) {
            setIsSubmenuOpen(false)
        }
    }

    useEffect(() => {
        if(currentPathName.includes(link)) {
            setIsActive(true)
        }
    }, [])

    return(
        <>
            <a
                href={link}
                className={`${styles.sidebarRow} ${isActive && styles.active}`}
                style={ !isOpen ? removePadding : {}}
                onMouseEnter={handleOpenSubmenu}
                onMouseLeave={handleCloseSubmenu}
            >

                    <div className="material-icons">
                        {icon}
                    </div>

                    {
                        isOpen &&
                        <div className={`${styles.sidebarTitle}`}>{title}</div>
                    }


                {
                    hasSubmenu &&
                    <div className={`${isOpen && styles.navigateNext} material-icons`} >
                        navigate_next
                    </div>
                }

            </a>

            {
                (isSubmenuOpen && setIsSubmenuOpen && options) &&
                <Submenu
                    index={index}
                    isOpen={isOpen}
                    setIsSubmenuOpen={setIsSubmenuOpen}
                    options={options}
                />
            }
    </>
    )
}