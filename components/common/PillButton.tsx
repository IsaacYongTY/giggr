import React from 'react';
import styles from '../../assets/scss/components/common/_pill-button.module.scss';

type Props = {
    composer: any;
    setMusicians: any;
};

export default function PillButton({ composer, setMusicians }: Props) {
    function handleRemoveMusician(id: number) {
        console.log(id);
        setMusicians((prevState: any) => {
            console.log(prevState);
            let composers = prevState.filter(
                (composer: any) => composer.id !== id
            );
            console.log(composers);
            return composers;
        });
        // setFormValue((prevState : any) => {

        // })
    }

    return (
        <button className={styles.container}>
            <span id={composer.id}>{composer.name}</span>
            <span
                className={`${styles.closeButton} material-icons`}
                onClick={() => handleRemoveMusician(composer.id)}
            >
                close
            </span>
        </button>
    );
}
