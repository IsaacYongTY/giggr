import React, { useState } from 'react';
import MenuRow from "./MenuRow";
import styles from "../../assets/scss/components/layouts/_settings-dropdown.module.scss";
import { useRouter } from "next/router";
import { destroyCookie } from "nookies";

export default function SettingsDropdown() {

    const [isOpen, setIsOpen] = useState(false)
    const router = useRouter()

    function handleLogout() {
        console.log('working')
        destroyCookie(undefined, "x-auth-token")
        setIsOpen(false)
        router.push('/accounts/login')
    }

    function handleOpenDropdown() {
        setIsOpen(prevState => !prevState)
    }

    return (
        <div   tabIndex={-1} onBlur={() => setIsOpen(false)}>

        <div className={`${styles.container} noselect`}>
            <button
                className={`material-icons ${styles.gearIcon} }`}
                onClick={handleOpenDropdown}
            >
                settings
            </button>
        </div>

            {
                isOpen &&
                <div
                    className={styles.menu}
                >
                    <MenuRow icon="settings" title="Settings" onClick={() => setIsOpen(false)} />
                    <MenuRow icon="help" title="Help" />
                    <MenuRow icon="logout" title="Logout" action={handleLogout}/>
                </div>
            }


        </div>

    )
}
