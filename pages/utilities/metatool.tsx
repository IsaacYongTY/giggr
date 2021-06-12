import React, {useState, useRef, useEffect} from "react"
import Layout from "../../components/layouts/Layout";
import SpotifySearchBar from "../../components/elements/SpotifySearchBar";
import styles from "./metatool.module.scss";
import AlertBox from "../../components/elements/AlertBox";
import withAuth from "../../middlewares/withAuth";
import {convertDurationToMinSec, convertKeyModeIntToKey} from "../../lib/library";

export const getServerSideProps = withAuth(async ({req, res} : any) => {

    return {
        props: {
            user: req.user
        }
    }
})

export default function MetaTool({ user } : any) {

    const [formValue, setFormValue] = useState({})
    const [text, setText] = useState("")
    const [isAlertOpen, setIsAlertOpen] = useState(false)
    const [isContribute, setIsContribute] = useState(true)
    const [alertMessage, setAlertMessage] = useState("")
    const textAreaContainer = useRef<HTMLDivElement>(null)
    const [searchLink, setSearchLink] = useState("")

    const isAdmin = user.tierId === 4

    useEffect(() => {
        let { title, artist, key, mode, tempo, durationMs, timeSignature, initialism, language, dateReleased } : any = formValue || {}

        let yearReleased = dateReleased?.slice(0,4)
        setText(`${title}\n${artist}\nKey: ${convertKeyModeIntToKey(key, mode)}\nTempo: ${tempo}\nDuration: ${convertDurationToMinSec(durationMs)}\nTime: ${timeSignature}\nKeywords: ${initialism}, ${language}\n\nYear Released: ${yearReleased}`)

        if(title) {
            setSearchLink(`https://www.google.com/search?q=${title}%20${language === 'mandarin' ? "歌词" : "lyrics"}`)
        }

    }, [formValue])

    function copyToClipboard() {
        if(textAreaContainer.current) {
            let sel: any;
            let range: any;
            let el = textAreaContainer.current; //get element id
            if (window.getSelection && document.createRange) { //Browser compatibility
                sel = window.getSelection();
                console.log(sel.toString())
                if (sel.toString() === '') { //no text selection
                    window.setTimeout(function () {
                        range = document.createRange(); //range object
                        range.selectNodeContents(el); //sets Range
                        sel.removeAllRanges(); //remove all ranges from selection
                        sel.addRange(range);//add Range to a Selection.

                        document.execCommand('copy')
                        sel.removeAllRanges()

                        setIsAlertOpen(true)
                        setAlertMessage("Copied to clipboard!")

                    }, 1);
                }
            }

            document.execCommand('copy')
            setIsAlertOpen(true)
            sel.removeAllRanges()
        }
    }

    function clearSelection() {
        if(textAreaContainer.current) {
            textAreaContainer.current.innerHTML = ""
            setIsAlertOpen(true)
            setAlertMessage("Content cleared")
        }
    }



    return (
        <Layout>

            <div className={styles.container}>
                <SpotifySearchBar
                    setFormValue={setFormValue}
                    isContribute={isContribute}
                    user={user}
                    database="master"
                />

                {
                    searchLink &&
                    <a href={searchLink} target="_blank">
                        Search "{formValue?.title} {formValue?.language === 'mandarin' ? "歌词" : "lyrics"}" on Google
                    </a>
                }
                <div contentEditable="true" className={styles.textarea} ref={textAreaContainer}>

                    { Object.keys(formValue).length ? text : null }

                </div>

                <div className={styles.buttonRowContainer}>
                    <button className="btn btn-primary" onClick={copyToClipboard}>Copy To Clipboard</button>
                    <button className="btn btn-primary" onClick={clearSelection}>Clear</button>
                </div>

                {
                    isAdmin &&
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
                    isAlertOpen &&
                    <AlertBox message={alertMessage} timeout={5} setIsAlertOpen={setIsAlertOpen}/>
                }

            </div>



        </Layout>
    )
}
