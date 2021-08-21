import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import classnames from 'classnames/bind';

import styles from './AlertBox.module.scss';

const cx = classnames.bind(styles);

interface Props {
    message: string;
    type: string;
    timeoutInMs?: number;
    setAlertOptions: Dispatch<SetStateAction<{ message: string; type: string }>>;
}
export default function AlertBox({ setAlertOptions, message, type, timeoutInMs = 3000 }: Props) {
    let displayStyle;

    const [isShow, setIsShow] = useState(true);

    switch (type) {
        case 'fail':
            displayStyle = 'fail';
            break;
        case 'success':
            displayStyle = 'success';
            break;
        default:
            displayStyle = '';
    }

    useEffect(() => {
        setIsShow(true);

        const timer = setTimeout(() => {
            setIsShow(false);
            setAlertOptions({ message: '', type: '' });
        }, timeoutInMs);

        return () => {
            clearTimeout(timer);
        };
    }, [message]);

    function handleClose() {
        setIsShow(false);
        setAlertOptions({ message: '', type: '' });
    }
    return (
        <>
            {isShow && message && (
                <div className={cx('container', displayStyle)}>
                    {message}
                    <span className={`${styles.cross} material-icons`} onClick={handleClose}>
                        close
                    </span>
                </div>
            )}
        </>
    );
}
