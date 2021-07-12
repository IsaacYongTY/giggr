import React, {useState} from "react"
import Layout from "../../components/layouts/Layout";
import addSpaceBetweenChineseWords from "../../lib/utils/add-space-between-chinese-words";
import styles from "../../assets/scss/pages/_lead-sheet-spacing.module.scss";
import {hyphenateSync} from "hyphen/en-gb";
import {GetServerSideProps, GetServerSidePropsContext} from "next";
import withAuth from "../../middlewares/withAuth";
import {IncomingMessage} from "http";
import {NextApiRequestCookies} from "next/dist/next-server/server/api-utils";
import removeCharacters from "../../lib/utils/remove-characters";

interface GetServerSidePropsContextWithUser extends GetServerSidePropsContext {
    req: IncomingMessage & {
        user: any
        cookies: NextApiRequestCookies
    }
}

interface Props {
    user: any
}
export const getServerSideProps : GetServerSideProps = withAuth(async({req, res} : GetServerSidePropsContextWithUser) => {
    return {
        props: {
            user: req.user
        }
    }
})


export default function LeadSheetSpacing({ user } : Props) {

    const [inputText, setInputText] = useState("")
    const [resultText, setResultText] = useState("")
    const [isAddHyphen, setIsAddHyphen] = useState(true)
    const [isRemoveStrings, setIsRemoveStrings] = useState(true)
    const [stringToRemove, setStringToRemove] = useState("")
    const [stringsToRemoveArray, setStringsToRemoveArray] = useState<string[]>(["#", "*"])
    function toggleAddHyphen() {
        setIsAddHyphen(prevState => !prevState)
    }

    function toggleRemoveStrings() {
        setIsRemoveStrings(prevState => !prevState)
    }
    function handleProcessText() {

        try {
            let result = addSpaceBetweenChineseWords(inputText)

            if(isRemoveStrings) {
                result = removeCharacters(stringsToRemoveArray, result)
            }
            if(isAddHyphen) {
                result = hyphenateSync(result, { hyphenChar: "-"})
            }

            setResultText(result)
        } catch (error) {
            console.log(error)
        }

    }

    function handleClearAll() {
        setInputText("")
        setResultText("")
    }

    function handleClearResult() {
        setResultText("")
    }

    function handleSetStringToRemove() {
        setStringToRemove("")
    }
    return (
        <Layout user={user} title="Lead Sheet Spacing">
            <div className={styles.container}>
                <div className={styles.textAreaContainer}>

                    <div>
                        <label>
                            <div>Input:</div>
                            <textarea value={inputText} onChange={(e) => setInputText(e.target.value)}/>
                        </label>

                        <div className={styles.buttonRow}>
                            <button className="btn btn-primary" onClick={handleProcessText}>Process</button>
                            <button className="btn btn-danger-outlined" onClick={handleClearAll}>Clear All</button>
                        </div>

                        <label>
                            <input type="checkbox" checked={isAddHyphen} onChange={toggleAddHyphen}/>
                            <span>Add Hyphen between Syllables (testing)</span>
                        </label>

                        <label>
                            <input type="checkbox" checked={isRemoveStrings} onChange={toggleRemoveStrings}/>
                            <span>Remove selected strings</span>
                        </label>

                        <label>
                            <div>Add string to remove:</div>
                            <div className="d-flex">
                                <input
                                    type="text"
                                    onChange={(e) => setStringToRemove(e.target.value)}
                                    className="form-control"
                                    value={stringToRemove}
                                />
                                <button className="btn btn-secondary" onClick={handleSetStringToRemove}>Add</button>
                            </div>

                        </label>
                    </div>

                    <div>
                        <label>
                            <div>Result:</div>
                            <textarea value={resultText} onChange={(e) => setResultText(e.target.value)}/>
                        </label>

                        <div className={styles.buttonRow}>
                            <button className="btn btn-danger-outlined" onClick={handleClearResult}>Clear Result</button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
