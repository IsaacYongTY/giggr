import Form from '../types/Form';
import convertKeyModeIntToKey from './convert-key-mode-int-to-key';

function createKeywordsArray(initialism: string, language: string): string[] {
    if (!initialism) return [language];
    if (!language) return [initialism];
    return [initialism, language];
}

export default function generateMetaData(
    form: Form,
    pinyinSyllableNum = 0
): string {
    let {
        title,
        romTitle,
        artist,
        key,
        mode,
        tempo,
        durationMinSec,
        timeSignature,
        dateReleased,
        initialism,
        language,
    } = form;

    const displayedPinyin =
        pinyinSyllableNum && romTitle
            ? romTitle.split(' ').slice(0, pinyinSyllableNum).join(' ')
            : '';

    const keyString =
        key !== undefined && mode !== undefined
            ? convertKeyModeIntToKey(key, mode)
            : '';

    const yearReleased = dateReleased?.slice(0, 4);

    const displayedTitle = `${displayedPinyin} ${title}`.trim();

    const keyWordsArray = createKeywordsArray(initialism || '', language || '');
    const displayedKeywords = keyWordsArray.join(', ');

    return (
        `${displayedTitle}\n` +
        (artist ? `${artist}\n` : '') +
        `Key: ${keyString}\n` +
        `Tempo: ${tempo || ''}\n` +
        `Duration: ${durationMinSec || ''}\n` +
        `Time: ${timeSignature || ''}\n` +
        `Keywords: ${displayedKeywords}\n\n` +
        `Year Released: ${yearReleased || ''}`
    );
}
