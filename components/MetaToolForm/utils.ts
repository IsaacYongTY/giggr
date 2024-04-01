import { convertKeyModeIntToKey } from 'common/utils';
import { MetatoolSongMetadata } from 'common/types';

// only support mandarin for now, affixes "lyrics" for all other languages
export const deriveGoogleSearchLink = (
    title: string,
    language: string | undefined,
) => {
    const affix = language === 'mandarin' ? '歌词' : 'lyrics';

    return `https://www.google.com/search?q=${title}%20${affix}`;
};

export const deriveGoogleSearchText = (
    title: string,
    language: string | undefined,
) => {
    const affix = language === 'mandarin' ? '歌词' : 'lyrics';
    return `Search "${title} ${affix}" on Google`;
};

function createKeywordsArray(initialism: string, language: string): string[] {
    if (!initialism) return [language];
    if (!language) return [initialism];
    return [initialism, language];
}

export function generateMetadataText(
    metadata: MetatoolSongMetadata,
    pinyinSyllableNum = 0,
): string {
    const {
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
    } = metadata;

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
