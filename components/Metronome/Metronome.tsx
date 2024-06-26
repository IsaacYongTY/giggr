import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import classnames from 'classnames/bind';

import { calculateBpmFromTimeLapsedAndBeats } from './utils';

import styles from './Metronome.module.scss';

const cx = classnames.bind(styles);

type MetronomeProps = {
    defaultTempo: number;
};

const Metronome: React.FC<MetronomeProps> = ({ defaultTempo }) => {
    const [count, setCount] = useState(0);
    const [tempo, setTempo] = useState(defaultTempo);
    const [displayTempo, setDisplayTempo] = useState(defaultTempo);
    const [isDecimal, setIsDecimal] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [audio, setAudio] = useState<HTMLAudioElement>();

    const [userTempo, setUserTempo] = useState('');

    const [errorMessage, setErrorMessage] = useState('');

    const tapButton = useRef<HTMLButtonElement>(null);
    const resetButton = useRef<HTMLButtonElement>(null);
    const toggleDecimalButton = useRef<HTMLButtonElement>(null);
    const tempoDisplayButton = useRef<HTMLButtonElement>(null);

    const startTime = useRef(0);
    const totalTimeLapsed = useRef(0);

    let timer: any;

    useEffect(() => {
        const keyPressHandler = (e: KeyboardEvent) => {
            if (e.key === ' ') {
                setCount((prevState) => prevState + 1);
            }
            if (e.key === 'p') {
                setIsPlaying((prevState) => !prevState);
            }
            if (e.key === 'Enter') {
                handleSetTempo();
            }
        };
        window.addEventListener('keydown', keyPressHandler);

        return () => window.removeEventListener('keydown', keyPressHandler);
    }, [userTempo]);

    useEffect(() => {
        const metronomeSound = new Audio('/audios/metronome-sound.mp3');
        metronomeSound.volume = 0.4;
        setAudio(metronomeSound);
    }, []);

    useEffect(() => {
        const interval = (1 / tempo) * 60 * 1000;

        if (isPlaying) {
            if (audio) audio.play();

            timer = setInterval(() => {
                if (audio) {
                    audio.currentTime = 0;
                    audio.play();
                    console.log('metronome fires');
                }
            }, interval);
        } else {
            clearInterval(timer);
        }

        return () => clearInterval(timer);
    }, [isPlaying]);

    useEffect(() => {
        if (count) {
            handleTapTempo();
        }
        tapButton?.current?.blur();
        resetButton?.current?.blur();
        toggleDecimalButton?.current?.blur();
        tempoDisplayButton?.current?.blur();
    }, [count]);

    function handleTapTempo() {
        const idleTime = 2000;

        const isIdleMoreThanIdleTime =
            Date.now() - startTime.current > idleTime;

        if (isIdleMoreThanIdleTime && startTime.current > 0) {
            handleReset();
            setCount(1);
            return;
        }

        if (count === 1) {
            startTime.current = Date.now();
            return;
        }

        const timeLapsed = Date.now() - startTime.current;
        totalTimeLapsed.current += timeLapsed;

        if (count === 2) {
            startTime.current = Date.now();
            return;
        }

        const calculatedTempo = calculateBpmFromTimeLapsedAndBeats(
            totalTimeLapsed.current,
            count - 1,
        );
        setTempo(calculatedTempo);
        setDisplayTempo(Math.round(calculatedTempo));
        startTime.current = Date.now();
    }

    function handleReset() {
        setCount(0);

        if (!tempo || !displayTempo) {
            setTempo(defaultTempo);
            setDisplayTempo(defaultTempo);
        }

        setErrorMessage('');
        totalTimeLapsed.current = 0;
        startTime.current = 0;
    }

    function handleToggleDecimal() {
        setIsDecimal((prevState) => !prevState);
    }

    function toggleMetronome() {
        setIsPlaying((prevState) => !prevState);
    }

    function handleSetTempo() {
        if (!userTempo) {
            setErrorMessage('Please enter tempo of range 40 - 200');
            return;
        }

        setTempo(parseFloat(userTempo));
        setDisplayTempo(Math.round(parseFloat(userTempo)));
        setUserTempo('');
        setErrorMessage('');
    }

    function handleUserTempoInput(e: ChangeEvent<HTMLInputElement>) {
        const containNonDigit = /\D/.test(e.target.value);

        if (containNonDigit) return;
        setUserTempo(e.target.value);
    }

    return (
        <div className={cx('container')}>
            <button
                className={cx('tempo-display-container', 'btn')}
                onClick={toggleMetronome}
                ref={tempoDisplayButton}
            >
                <div className={cx('tempo-display')}>
                    {isDecimal ? tempo : displayTempo}
                </div>
                <div>Tap to {isPlaying ? 'stop' : 'play'}</div>
            </button>

            <div className={cx('button-row')}>
                <div>
                    <label>
                        <div>Count:</div>
                        <input
                            type="number"
                            disabled
                            value={count}
                            readOnly
                            className="form-control"
                        />
                    </label>
                </div>

                <div>
                    <button
                        className="btn btn-primary"
                        ref={tapButton}
                        onClick={() => setCount((prevState) => prevState + 1)}
                    >
                        Tap Tempo
                    </button>
                </div>
            </div>

            <div className={cx('button-row')}>
                <div>
                    <label>
                        <span>Input:</span>{' '}
                        {errorMessage && (
                            <span className="error-message">
                                * {errorMessage}
                            </span>
                        )}
                        <input
                            value={userTempo}
                            className="form-control"
                            onChange={handleUserTempoInput}
                        />
                    </label>
                </div>

                <div>
                    <button
                        className="btn btn-primary"
                        ref={tapButton}
                        onClick={handleSetTempo}
                    >
                        Set Tempo
                    </button>
                </div>
            </div>

            <div className={cx('button-row', 'pt-1-5')}>
                <div>
                    <button
                        className={
                            isDecimal ? 'btn btn-primary' : 'btn btn-secondary'
                        }
                        onClick={handleToggleDecimal}
                        ref={toggleDecimalButton}
                    >
                        Toggle Decimal
                    </button>
                </div>

                <div>
                    <button
                        className="btn btn-danger-outlined"
                        ref={resetButton}
                        onClick={handleReset}
                    >
                        Reset
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Metronome;
