import React, {useState, useRef, useEffect} from "react"
import Layout from "../../components/layouts/Layout";
import SpotifySearchBar from "../../components/common/SpotifySearchBar";
import styles from "../../assets/scss/pages/_metatool.module.scss";
import AlertBox from "../../components/common/AlertBox";
import withAuth from "../../middlewares/withAuth";
import convertDurationMsToMinSec from "../../lib/utils/convert-duration-ms-to-min-sec";
import convertKeyModeIntToKey from "../../lib/utils/convert-key-mode-int-to-key"
import Select, { ValueType }  from "react-select";
import CopyToClipboardButton from "../../components/common/CopyToClipboardButton";
import Loader from "../../components/common/Loader";
import convertRelativeKey from "../../lib/utils/convert-relative-key";
import convertKeyToKeyModeInt from "../../lib/utils/convert-key-to-key-mode-int";

interface Option {
    value: number,
    label: string
}

export const getServerSideProps = withAuth(async ({req, res} : any) => {

    return {
        props: {
            user: req.user
        }
    }
})

export interface Props {
    user: {
        tierId: number,
        name: string,
        tokenString: string,
        isAdmin: boolean
    }
}

export default function MetaTool({ user } : Props) {


    const [formValue, setFormValue] = useState<any>({})
    const [text, setText] = useState("")

    const [searchLink, setSearchLink] = useState("")
    const [pinyinSyllable, setPinyinSyllable] = useState({ value: 2, label: "2"})
    const [showPinyin, setShowPinyin] = useState(true)

    const [alertMessage, setAlertMessage] = useState("")
    const [isContribute, setIsContribute] = useState(user.isAdmin)

    const textAreaContainer = useRef<HTMLDivElement>(null)
    const [originalTempo, setOriginalTempo] = useState(0)


    const threeFourToggleRef = useRef<HTMLButtonElement>(null)
    const twelveEightToggleRef = useRef<HTMLButtonElement>(null)

    let buttonTimeSignature;

    useEffect(() => {
        let { title, romTitle, artist, key, mode, tempo, durationMs, timeSignature, initialism, language, dateReleased } : any = formValue || {}

        let yearReleased = dateReleased?.slice(0,4)
        let romTitleDisplayed = romTitle && showPinyin ? romTitle.split(' ').slice(0, pinyinSyllable.value).join(' ') + " " : ""

        setOriginalTempo(tempo)

        buttonTimeSignature = timeSignature
        setText(`${romTitleDisplayed}${title}\n` +
            `${artist}\n` +
            `Key: ${convertKeyModeIntToKey(key, mode)}\n` +
            `Tempo: ${tempo}\n` +
            `Duration: ${convertDurationMsToMinSec(durationMs)}\n` +
            `Time: ${timeSignature}\n` +
            `Keywords: ${initialism}, ${language}\n\n` +
            `Year Released: ${yearReleased}`
        )

        if(title) {
            setSearchLink(`https://www.google.com/search?q=${title}%20${language === 'mandarin' ? "歌词" : "lyrics"}`)
        }

    }, [formValue, pinyinSyllable, showPinyin])

    function clearSelection() {
        if(textAreaContainer.current) {
            textAreaContainer.current.innerHTML = ""
            setAlertMessage("Content cleared")
        }
    }

    function handleChange(selectedOption: ValueType<Option, false>) {
        if(!selectedOption) return
        setPinyinSyllable(selectedOption)
    }

    function toggleTempoAndTimeSignature() {
        if(formValue.timeSignature === "12/8") {
            threeFourToggleRef?.current?.classList.add(styles.selected)
            twelveEightToggleRef?.current?.classList.remove(styles.selected)
            setFormValue((prevState : any) => ({ ...prevState, tempo: originalTempo * 3, timeSignature: "3/4"}))
            return
        }

        twelveEightToggleRef?.current?.classList.add(styles.selected)
        threeFourToggleRef?.current?.classList.remove(styles.selected)
        setFormValue((prevState : any) => ({ ...prevState, tempo: originalTempo / 3, timeSignature: "12/8"}))
    }

    function toggleRelativeKey() {
        const keyString = convertKeyModeIntToKey(formValue.key, formValue.mode)
        const relativeKey = convertRelativeKey(keyString)
        let [key, mode] = convertKeyToKeyModeInt(relativeKey)

        setFormValue((prevState : any) => ({...prevState, key, mode}))
    }

    return (
        <Layout user={user}>
            <div className={styles.container}>
                <div className={styles.searchBarContainer}>

                <SpotifySearchBar
                    setFormValue={setFormValue}
                    isContribute={isContribute}
                    user={user}
                    database="master"
                />
                </div>

                <div className={styles.pinyinRow}>
                    <label>
                        <input
                            type="checkbox"
                            defaultChecked={showPinyin}
                            onChange={() => setShowPinyin(prevState => !prevState)}
                        />
                        Pinyin
                    </label>

                    <div className={styles.dropdown}>
                        <Select
                            value={pinyinSyllable}
                            options={[
                                { value: 1, label: "1" },
                                { value: 2, label: "2" },
                                { value: 99, label: "All" },
                            ]}
                            className="basic-single"
                            isSearchable={false}
                            onChange={handleChange}
                        />
                    </div>
                    {
                        formValue.title &&
                            <>
                                <a href={searchLink} className={styles.searchLink} target="_blank">
                                    Search "{formValue?.title} {formValue?.language === 'mandarin' ? "歌词" : "lyrics"}" on Google
                                </a>
                                <label>
                                    <input type="checkbox" onClick={toggleRelativeKey}/>
                                    Toggle Relative Key
                                </label>

                            </>

                    }

                    {
                        (formValue.timeSignature === "3/4" || formValue.timeSignature === "12/8") &&
                        <div className={styles.timeSignatureToggleGroup}>
                            <button
                                className={styles.timeSignatureToggle}
                                ref={threeFourToggleRef}
                                onClick={toggleTempoAndTimeSignature}
                            >
                                3/4
                            </button>
                            <button
                                className={styles.timeSignatureToggle}
                                ref={twelveEightToggleRef}
                                onClick={toggleTempoAndTimeSignature}
                            >
                                12/8
                            </button>
                        </div>
                    }

                </div>



                <div>
                    <span>Result:</span>
                    <div
                        contentEditable="true"
                        className={styles.textarea}
                        ref={textAreaContainer}
                        suppressContentEditableWarning={true}
                    >
                        { Object.keys(formValue).length ? text : null }
                    </div>
                </div>


                <div className={styles.buttonRowContainer}>
                    <button className="btn btn-danger-outlined" onClick={clearSelection}>Clear</button>
                    <CopyToClipboardButton
                        sourceRef={textAreaContainer}
                        setAlertMessage={setAlertMessage}
                    />
                </div>

                {
                    user.isAdmin &&
                    <div className={styles.checkboxRowContainer}>
                        <input
                            type="checkbox"
                            id="contributeCheckbox"
                            defaultChecked={isContribute}
                            onChange={() => setIsContribute(prevState => !prevState)}
                        />
                        <label htmlFor="contributeCheckbox">Contribute to Database?</label>
                    </div>
                }

                {
                    alertMessage &&
                    <AlertBox alertMessage={alertMessage} setAlertMessage={setAlertMessage}/>
                }


            </div>
        </Layout>
    )
}
