import React, {useState} from 'react';
import SubmenuRow from "./SubmenuRow";
import styles from "./SettingsDropdown.module.scss";

export default function SettingsDropdown() {

    const [isOpen, setIsOpen] = useState(false)
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
                    <SubmenuRow icon="logout" title="Logout" />
                </div>
            }

        </div>

    )
}
