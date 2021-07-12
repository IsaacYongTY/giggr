import { hyphenateSync } from "hyphen/en"

export default function addHyphensToWordsInSentences(paragraph: string) : string {

    const result = hyphenateSync(paragraph, { hyphenChar: "-"})
    return result
}