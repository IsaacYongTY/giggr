import React, {useState} from "react"
import Layout from "../../components/layouts/Layout";
import addSpaceBetweenChineseWords from "../../lib/utils/add-space-between-chinese-words";



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
    return (
        <Layout user={{ id: 1, isAdmin: false }}>
            Lead Sheet Spacing
            <label>
                <div>Input:</div>
                <textarea value={inputText} onChange={(e) => setInputText(e.target.value)}/>
            </label>

            <label>
                <div>Result:</div>
                <textarea value={resultText} onChange={(e) => setResultText(e.target.value)}/>
            </label>

            <button onClick={handleProcessText}>Process</button>
            <button onClick={handleClearAll}>Clear All</button>
        </Layout>
    )
}
