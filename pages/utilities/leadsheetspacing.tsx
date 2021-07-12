import React, {useState} from "react"
import Layout from "../../components/layouts/Layout";
import addSpaceBetweenChineseWords from "../../lib/utils/add-space-between-chinese-words";
import styles from "../../assets/scss/pages/_lead-sheet-spacing.module.scss";

export default function LeadSheetSpacing() {

    const [inputText, setInputText] = useState("")
    const [resultText, setResultText] = useState("")

    function handleProcessText() {
        const result = addSpaceBetweenChineseWords(inputText)
        setResultText(result)
    }

    function handleClearAll() {
        setInputText("")
        setResultText("")
    }

    function handleClearResult() {
        setResultText("")
    }

    return (
        <Layout user={{ id: 1, isAdmin: false }} title="Lead Sheet Spacing">
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
