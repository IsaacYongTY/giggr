import React, {ChangeEvent, useCallback, useEffect, useRef, useState} from "react"
import calculateBpmFromTimeLapsedAndBeat from "../../lib/utils/calculate-bpm-from-time-lapsed-and-beats";
import Layout from "../../components/layouts/Layout";
import styles from "../../assets/scss/pages/_bpm.module.scss";
import withAuth from "../../middlewares/withAuth";

export const getServerSideProps = withAuth(async ({ req, res} : any) => {
    return {
        props: {
            user: req.user
        }
    }
})

interface Props {
    user: any
}


export default function Bpm({ user } : Props) {

    const defaultTempo = 69
    const [count, setCount] = useState(0)
    const [tempo, setTempo] = useState(defaultTempo)
    const [displayTempo, setDisplayTempo] = useState(defaultTempo)
    const [isDecimal, setIsDecimal] = useState(false)
    const [isPlaying, setIsPlaying] = useState(false)
    const [audio, setAudio] = useState<HTMLAudioElement>()

    const [userTempo, setUserTempo] = useState("")

    const [errorMessage, setErrorMessage] = useState("")

    const tapButton = useRef<HTMLButtonElement>(null)
    const resetButton = useRef<HTMLButtonElement>(null)
    const toggleDecimalButton = useRef<HTMLButtonElement>(null)
    const tempoDisplayButton = useRef<HTMLButtonElement>(null)
    let startTime = useRef(0)
    let totalTimeLapsed = useRef(0)
    let timer : any



    useEffect(() => {
        const keyPressHandler = (e: KeyboardEvent) => {
            console.log(e.key)
            if(e.key === " ") {
                setCount(prevState => prevState + 1)
            }
            if(e.key === "p") {
                setIsPlaying(prevState => !prevState)
            }
            if(e.key === "Enter") {

                handleSetTempo()
            }
        }
        window.addEventListener("keydown", keyPressHandler)

        return () => window.removeEventListener('keydown', keyPressHandler);
    },[userTempo])

    useEffect(() => {
        const metronomeSound = new Audio( "/audios/metronome-sound.mp3")
        metronomeSound.volume = 0.4
        setAudio(metronomeSound)

    },[])



    useEffect(() => {
        const interval = (1 / tempo) * 60 * 1000

        if(isPlaying) {

            if(audio) audio.play()

            timer = setInterval(() => {
                if(audio) {
                    audio.currentTime = 0
                    audio.play()
                    console.log('metronome fires')
                }

            },interval)
        } else {
            console.log('clear')
            clearInterval(timer)
        }

        return () => clearInterval(timer)

    }, [isPlaying])

    useEffect(() => {
        if(count) {
            handleTapTempo()
        }
        tapButton?.current?.blur()
        resetButton?.current?.blur()
        toggleDecimalButton?.current?.blur()
        tempoDisplayButton?.current?.blur()
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
        setErrorMessage("")
        totalTimeLapsed.current = 0
        startTime.current = 0
    }

    function handleToggleDecimal() {
        setIsDecimal(prevState => !prevState)
    }


    function toggleMetronome() {
        setIsPlaying(prevState => !prevState)
    }

    function handleSetTempo() {
        if(!userTempo) {
            setErrorMessage("Please enter tempo of range 40 - 200")
            return
        }

        setTempo(parseFloat(userTempo))
        setDisplayTempo(Math.round(parseFloat(userTempo)))
        setUserTempo("")
        setErrorMessage("")
    }

    function handleUserTempoInput(e : ChangeEvent<HTMLInputElement>) {
        const containNonDigit = /\D/.test(e.target.value)

        if(containNonDigit) return
        setUserTempo(e.target.value)
    }

    console.log(userTempo)
    return (
        <Layout user={user}>
            <div className={styles.container}>

                <button
                    className={`${styles.tempoDisplayContainer} btn`}
                    onClick={toggleMetronome}
                    ref={tempoDisplayButton }
                >
                    <div className={styles.tempoDisplay}>{isDecimal ? tempo : displayTempo}</div>
                    {
                        isPlaying 
                            ? <div>Tap to stop</div>
                            : <div>Tap to play</div>
                    }
                </button>

                <div className={styles.buttonRow}>


                    <div>

                        <label>
                            <div>Count:</div>
                            <input type="number" disabled value={count} readOnly className="form-control"/>
                        </label>
                    </div>

                    <div>
                        <button
                            className="btn btn-primary"
                            ref={tapButton}
                            onClick={() => setCount(prevState => prevState + 1)}
                        >
                            Tap Tempo
                        </button>
                    </div>
                </div>


                <div className={styles.buttonRow}>
                    <div>
                        <label>
                            <span>Input:</span> { errorMessage && <span className="error-message">* {errorMessage}</span>}
                            <input value={userTempo} className="form-control" onChange={handleUserTempoInput}/>
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

                <div className={`${styles.buttonRow} pt-1-5`}>
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
