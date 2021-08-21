import React from 'react';
import classnames from 'classnames/bind';

import styles from './PillButton.module.scss';

const cx = classnames.bind(styles);

type Props = {
    composer: any;
    setMusicians: any;
};

export default function PillButton({ composer, setMusicians }: Props) {
    function handleRemoveMusician(id: number) {
        setMusicians((prevState: any) => {
            return prevState.filter((composer: any) => composer.id !== id);
        });
    }

    return (
        <button className={cx('container')}>
            <span id={composer.id}>{composer.name}</span>
            <span
                className={cx('close-button', 'material-icons')}
                onClick={() => handleRemoveMusician(composer.id)}
            >
                close
            </span>
        </button>
    );
}
