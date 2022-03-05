import isChinese from 'is-chinese';

export const addSpaceBetweenChineseCharacters = (str: string): string => {
    const alphaNumRegex = /[A-z]/;
    const spacesRegex = /\s+/g;
    const lineArray = str.split('\n');

    const resultArray = lineArray.map((line) => {
        const wordArray = line.trim().split(spacesRegex);
        const addedSpacesWordArray = wordArray.map((word) =>
            alphaNumRegex.test(word) ? word : word.split('').join(' ')
        );
        return addedSpacesWordArray.join(' ');
    });

    return resultArray.join('\n');
};

export const isEscapedCharacter = (char: string) => {
    const regexEscapedCharacters = '[\\^$.|?*+()';
    return regexEscapedCharacters.split('').indexOf(char) > -1;
};

export const addBackSlashToEscapingCharactersArray = (
    strArray: string[]
): string[] => {
    return strArray.map((char) =>
        isEscapedCharacter(char) ? `\\${char}` : char
    );
};

export const removeCharacters = (
    stringsToRemoveArray: string[],
    text: string
): string => {
    if (stringsToRemoveArray.length === 0) return text;

    const regexString =
        addBackSlashToEscapingCharactersArray(stringsToRemoveArray);

    const stringsToRemoveRegex = new RegExp(regexString.join('|'), 'g');
    return text.replace(stringsToRemoveRegex, '');
};

export const replaceCharactersWithPlaceholders = (
    str: string,
    placeholderChar = 'a'
): string => {
    if (!placeholderChar || placeholderChar.length > 1) {
        throw new Error('Placeholder text must only be a single character');
    }
    const lines = str.split('\n');

    const replacedLines = lines.map((line) =>
        line
            .split(' ')
            .map((str) => (isChinese(str) ? placeholderChar : str))
            .join(' ')
    );

    return replacedLines.join('\n');
};
