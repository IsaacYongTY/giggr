import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import styles from './_musicians-dropdown.module.scss';
import PillButton from '../../common/PillButton/PillButton';
import Musician from '../../../lib/types/musician';

export default function MusiciansDropdown() {
    const dropdownMenu = useRef(null);
    const [musicians, setMusicians] = useState<Musician[]>([]);
    const [filteredMusicians, setFilteredMusicians] = useState<Musician[]>([]);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [selectedMusicians, setSelectedMusicians] = useState<Musician[]>([]);

    useEffect(() => {
        axios.get('/api/v1/musicians').then((res) => {
            setMusicians(res.data.musicians);
            setFilteredMusicians(res.data.musicians);
        });

        axios.get('api/v1/songs/1').then((res) => {
            setSelectedMusicians(res.data.song.composers);
        });
    }, []);

    function toggleSelectMusician(musician: Musician) {
        const foundIndex = selectedMusicians.findIndex((element) => element.id === musician.id);
        if (foundIndex === -1) {
            setSelectedMusicians((prevState) => [...prevState, musician]);
            return;
        }

        setSelectedMusicians((prevState) =>
            prevState.filter((element) => element.id !== musician.id)
        );
    }

    function handleInput(e: ChangeEvent<HTMLInputElement>) {
        if (!e.target.value) {
            setFilteredMusicians(musicians);
            return;
        }
        setFilteredMusicians(
            musicians.filter((musician) => musician.name.toLowerCase().includes(e.target.value))
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.pillButtonRow}>
                {selectedMusicians?.map((composer: any) => (
                    <PillButton
                        key={composer.id}
                        composer={composer}
                        setMusicians={setSelectedMusicians}
                    />
                ))}
            </div>

            <input
                className={`${styles.inputRow} form-control`}
                onFocus={() => setIsMenuOpen(true)}
                onChange={handleInput}
            />
            <button>Add New</button>
            {isMenuOpen && (
                <div
                    className={styles.dropdown}
                    onBlur={() => setIsMenuOpen(false)}
                    tabIndex={0}
                    ref={dropdownMenu}
                >
                    {filteredMusicians?.map((musician) => (
                        <div
                            key={musician.id}
                            className={styles.dropdownRow}
                            onClick={() => toggleSelectMusician(musician)}
                        >
                            <div>{musician.name}</div>
                            {selectedMusicians.findIndex((element) => element.id === musician.id) >
                                -1 && <span className="material-icons">done</span>}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
