import isChinese from 'is-chinese';

export default function replaceCharactersWithPlaceholders(
    str: string,
    placeholderChar = 'a'
): string {
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
}
