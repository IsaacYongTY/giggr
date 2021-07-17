import React, {useState} from 'react';
import MenuRow from "./MenuRow";
import styles from "../../assets/scss/components/layouts/_settings-dropdown.module.scss";
import { useRouter } from "next/router";
import { destroyCookie } from "nookies";

export default function SettingsDropdown() {

    const [isOpen, setIsOpen] = useState(false)
    const router = useRouter()

    function handleLogout() {

        destroyCookie(undefined, "x-auth-token")
        router.push('/accounts/login')
    }

    return (
        <>

        <div className={`${styles.container} noselect`}>
            <button
                className={`material-icons ${styles.gearIcon} }`}
                onClick={() => setIsOpen(prevState => !prevState)}
                onBlurCapture={() => setIsOpen(false)}

            >
                settings
            </button>
        </div>

            {
                isOpen &&
                <div className={styles.menu}>
                    <MenuRow icon="settings" title="Settings" />
                    <MenuRow icon="help" title="Help" />
                    <MenuRow icon="logout" title="Logout" action={handleLogout}/>
                </div>
            }


        </>

    )
}
