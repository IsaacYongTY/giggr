import React, {ChangeEvent, useCallback, useEffect, useRef, useState} from "react"
import calculateBpmFromTimeLapsedAndBeat from "../../lib/utils/calculate-bpm-from-time-lapsed-and-beats";
import Layout from "../../components/layouts/Layout";
import styles from "../../assets/scss/pages/_bpm.module.scss";


export default function Bpm() {

    const defaultTempo = 69
    const [count, setCount] = useState(0)
    const [tempo, setTempo] = useState(defaultTempo)
    const [displayTempo, setDisplayTempo] = useState(defaultTempo)
    const [isDecimal, setIsDecimal] = useState(false)

    const tapButton = useRef<HTMLButtonElement>(null)
    const resetButton = useRef<HTMLButtonElement>(null)
    const toggleDecimalButton = useRef<HTMLButtonElement>(null)
    let startTime = useRef(0)
    let totalTimeLapsed = useRef(0)


    useEffect(() => {
        const keyPressHandler = (e: KeyboardEvent) => {
            if(e.key === " ") {
                setCount(prevState => prevState + 1)
            }
        }
        window.addEventListener("keydown", keyPressHandler)

        return () => document.removeEventListener('keydown', keyPressHandler);
    },[])

    useEffect(() => {
        if(count) {
            handleTapTempo()
        }
        tapButton?.current?.blur()
        resetButton?.current?.blur()
        toggleDecimalButton?.current?.blur()
    },[count])

    function handleTapTempo() {

        const idleTime = 2000

        const isIdleMoreThanIdleTime = Date.now() - startTime.current > idleTime

        if(isIdleMoreThanIdleTime && startTime.current > 0) {
            handleReset()
            return
        }

        if(count === 1) {
            startTime.current = Date.now()
            return
        }

        const timeLapsed = Date.now() - startTime.current
        totalTimeLapsed.current += timeLapsed

        if(count === 2) {
            startTime.current = Date.now()
            return
        }

        let calculatedTempo = calculateBpmFromTimeLapsedAndBeat(totalTimeLapsed.current, count - 1)
        setTempo(calculatedTempo)
        setDisplayTempo(Math.round(calculatedTempo))
        startTime.current = Date.now()

    }
    function handleReset() {
        setCount(0)
        setTempo(defaultTempo)
        setDisplayTempo(defaultTempo)
        totalTimeLapsed.current = 0
        startTime.current = 0
    }

    function handleToggleDecimal() {
        setIsDecimal(prevState => !prevState)
    }
    return (
        <Layout user={{ id: 1, firstName: "Isaac", tierId: 4}}>
            <div className={styles.container}>

                <div className={styles.tempoDisplayContainer}>
                    <div className={styles.tempoDisplay}>{isDecimal ? tempo : displayTempo}</div>
                    <div>Tap to play</div>
                </div>

                <div className={styles.buttonRow}>
                    <div>
                        <button
                            className="btn btn-primary"
                            ref={tapButton}
                            onClick={() => setCount(prevState => prevState + 1)}
                        >
                            Tap
                        </button>
                    </div>

                    <div>

                        <label>
                            <div>Count:</div>
                            <input type="number" disabled value={count} className="form-control"/>
                        </label>
                    </div>
                </div>


                <div className={styles.buttonRow}>
                    <div>
                        <button
                            className={ isDecimal ? "btn btn-primary": "btn btn-secondary"}
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
        </Layout>

    )
}
