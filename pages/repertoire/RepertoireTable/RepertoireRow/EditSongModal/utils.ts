import chineseToPinyin from 'chinese-to-pinyin';

export const removeBracketsAndSuffixes = (input: string) => {
    const invalidCharactersRegex = /[(（\-[{《]/g;
    const removeIndex = input.search(invalidCharactersRegex);

    if (removeIndex === -1) return input;
    return input.slice(0, removeIndex).trim();
};

export const getInitialism = (input: string) => {
    return removeBracketsAndSuffixes(input)
        .split(' ')
        .reduce((acc, word) => acc + word[0].toLowerCase(), '');
};

export const capitalizeString = (romTitle: string) =>
    romTitle
        .split(' ')
        .map((word) => word[0].toUpperCase() + word.slice(1))
        .join(' ');

export const getRomTitle = (title: string) => {
    title = removeBracketsAndSuffixes(title);
    const romTitle = chineseToPinyin(title, { removeTone: true });
    return capitalizeString(romTitle).replace(/,/g, ' ');
};
