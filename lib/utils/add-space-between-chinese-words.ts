export default function addSpaceBetweenChineseWords(str: string): string {
    const alphaNumRegex = /[A-z]/;
    const spacesRegex = /[ 　]+/g;
    const lineArray = str.split('\n');

    const resultArray = lineArray.map((line) => {
        const wordArray = line.trim().split(spacesRegex);
        const addedSpacesWordArray = wordArray.map((word) =>
            alphaNumRegex.test(word) ? word : word.split('').join(' ')
        );
        return addedSpacesWordArray.join(' ');
    });

    return resultArray.join('\n');
}
