import React, {useState} from 'react';
import SubmenuRow from "./SubmenuRow";
import styles from "./SettingsDropdown.module.scss";
import { useRouter } from "next/router";

export default function SettingsDropdown() {

    const [isOpen, setIsOpen] = useState(false)
    const router = useRouter()

    function handleLogout() {
        document.cookie = "x-auth-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/"

        router.push('accounts/login')
    }

    return (

        <div className={`${styles.container} noselect`}>
            <div
                className={`material-icons ${styles.gearIcon} }`}
                onClick={() => setIsOpen(prevState => !prevState)}
            >
                settings
            </div>

            {
                isOpen &&
                <div className={styles.menu}>
                    <SubmenuRow icon="settings" title="Settings" />
                    <SubmenuRow icon="help" title="Help" />
                    <SubmenuRow icon="logout" title="Logout" action={handleLogout}/>
                </div>
            }

        </div>

    )
}
