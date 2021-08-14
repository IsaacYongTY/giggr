import React, { Dispatch, SetStateAction } from 'react';
import styles from '../../assets/scss/pages/_lead-sheet-spacing.module.scss';

interface Props {
    label: string;
    setStringToRemoveArray: Dispatch<SetStateAction<string[]>>;
}
export default function Tag({ label, setStringToRemoveArray }: Props) {
    function handleOnClick() {
        setStringToRemoveArray((prevState) => {
            const resultArray = prevState.filter((str) => str !== label);
            localStorage.setItem(
                'strings-to-remove',
                JSON.stringify(resultArray)
            );
            return resultArray;
        });
    }

    return (
        <li>
            {label}
            <button
                className={`${styles.deleteStringButton} material-icons`}
                onClick={handleOnClick}
            >
                clear
            </button>
        </li>
    );
}
