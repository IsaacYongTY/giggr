import removeBracketsAndSuffixes from './remove-brackets-and-suffixes';

export default function getInitialism(input: string) {
    return removeBracketsAndSuffixes(input)
        .split(' ')
        .reduce((acc, word) => acc + word[0].toLowerCase(), '');
}
