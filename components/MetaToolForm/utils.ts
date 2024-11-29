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
    const { title, romTitle, artist, dateReleased, initialism, language } =
        metadata;

    const displayedPinyin =
        pinyinSyllableNum && romTitle
            ? romTitle.split(' ').slice(0, pinyinSyllableNum).join(' ')
            : '';

    const yearReleased = dateReleased?.slice(0, 4);

    const displayedTitle = `${displayedPinyin} ${title}`.trim();

    const keyWordsArray = createKeywordsArray(initialism || '', language || '');
    const displayedKeywords = keyWordsArray.join(', ');

    return (
        `${displayedTitle}\n` +
        (artist ? `${artist}\n` : '') +
        `Key: \n` +
        `Tempo: \n` +
        `Duration: \n` +
        `Time: \n` +
        `Keywords: ${displayedKeywords}\n\n` +
        `Year Released: ${yearReleased || ''}`
    );
}
