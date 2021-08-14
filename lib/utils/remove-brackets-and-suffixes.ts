export default function removeBracketsAndSuffixes(input: string) {
    const invalidCharactersRegex = /[(（\-\[{《]/g;
    const removeIndex = input.search(invalidCharactersRegex);

    if (removeIndex === -1) return input;
    return input.slice(0, removeIndex).trim();
}
