import React, { useEffect, useState } from 'react';
import classnames from 'classnames/bind';

import Loader from './Loader';

import styles from './ButtonWithLoader.module.scss';

const cx = classnames.bind(styles);

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
            className={
                primary ? cx('btn', 'btn-primary') : cx('btn', 'btn-highlight')
            }
            onClick={handleOnClick}
            disabled={isLoading}
        >
            <div>{label}</div>
            {isLoading && isClicked && <Loader />}
        </button>
    );
}
