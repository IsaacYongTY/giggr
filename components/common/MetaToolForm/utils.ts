// only support mandarin for now, affixes "lyrics" for all other languages
export const deriveGoogleSearchLink = (
    title: string,
    language: string | undefined
) => {
    const affix = language === 'mandarin' ? '歌词' : 'lyrics';

    return `https://www.google.com/search?q=${title}%20${affix}`;
};

export const deriveGoogleSearchText = (
    title: string,
    language: string | undefined
) => {
    const affix = language === 'mandarin' ? '歌词' : 'lyrics';
    return `Search "${title} ${affix}" on Google`;
};
