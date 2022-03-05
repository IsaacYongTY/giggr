import { hyphenateSync } from 'hyphen/en';

export default function addHyphensToWordsInSentences(
    paragraph: string
): string {
    return hyphenateSync(paragraph, { hyphenChar: '-' });
}
