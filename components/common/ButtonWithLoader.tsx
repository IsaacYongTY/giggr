import React from "react"

import Loader from "./Loader";
import styles from "../../assets/scss/components/common/_button-with-loader.module.scss";

interface ButtonProps {
    /**
     * Is this the principal call to action on the page?
     */
    primary?: boolean;
    /**
     * What background color to use
     */
    backgroundColor?: string;
    /**
     * How large should the button be?
     */
    size?: 'small' | 'medium' | 'large';
    /**
     * Button contents
     */
    label: string;
    /**
     * Optional click handler
     */
    onClick?: () => void;
    isLoading: boolean
}


export default function ButtonWithLoader({
     primary = false,
     size = 'medium',
     backgroundColor,
     label,
     onClick,
    isLoading,
     ...props
 }: ButtonProps) {

    return (
        <button
            className={`${styles.btnPrimary} btn btn-primary`}
            onClick={onClick}
            disabled={isLoading}
        >
            <div>{label}</div>
            {isLoading && <Loader />}

        </button>
    )
}