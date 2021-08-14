import React, { useEffect, useState } from 'react';

import ButtonLoader from './ButtonLoader';
import styles from '../../assets/scss/components/common/_button-with-loader.module.scss';

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
    isLoading: boolean;
}

export default function ButtonWithLoader({
    primary = false,
    label,
    onClick,
    isLoading,
    ...props
}: ButtonProps) {
    const [isClicked, setIsClicked] = useState(false);

    function handleOnClick() {
        if (!onClick) return;
        setIsClicked(true);
        onClick();
    }

    useEffect(() => {
        if (!isLoading) {
            setIsClicked(false);
        }
    }, [isLoading]);

    return (
        <button
            className={`${
                primary ? styles.btnPrimary : styles.btnHighlight
            } btn`}
            onClick={handleOnClick}
            disabled={isLoading}
        >
            <div>{label}</div>
            {isLoading && isClicked && <ButtonLoader />}
        </button>
    );
}
