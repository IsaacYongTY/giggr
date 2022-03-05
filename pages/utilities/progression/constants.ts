export const progressionOptions = [
    { value: '15654325', label: 'Canon Progression (15654325)' },
    { value: '45362511', label: 'Typical Ballad Progression (45362511)' },
    { value: '6415', label: 'Top 40s 4-Chords 1 (6415)' },
    { value: '1564', label: 'Top 40s 4-Chords 1 (1564)' },
    { value: '6251', label: 'Circle Progression (6251)' },
];

export const spacingOptions = [
    { value: 8, label: 8 },
    { value: 10, label: 10 },
    { value: 12, label: 12 },
    { value: 14, label: 14 },
];

type KeyInfo = {
    id: number;
    key: string;
    degree: number;
    isSharp: boolean;
};

export const keyMap: KeyInfo[] = [
    {
        id: 0,
        key: 'C',
        degree: 0,
        isSharp: true,
    },
    {
        id: 7,
        key: 'G',
        degree: 1,
        isSharp: true,
    },
    {
        id: 2,
        key: 'D',
        degree: 2,
        isSharp: true,
    },
    {
        id: 9,
        key: 'A',
        degree: 3,
        isSharp: true,
    },
    {
        id: 4,
        key: 'E',
        degree: 4,
        isSharp: true,
    },
    {
        id: 11,
        key: 'B',
        degree: 5,
        isSharp: true,
    },
    {
        id: 12,
        key: 'F#',
        degree: 6,
        isSharp: true,
    },
    {
        id: 5,
        key: 'F',
        degree: 1,
        isSharp: false,
    },
    {
        id: 10,
        key: 'Bb',
        degree: 2,
        isSharp: false,
    },
    {
        id: 3,
        key: 'Eb',
        degree: 3,
        isSharp: false,
    },
    {
        id: 8,
        key: 'Ab',
        degree: 4,
        isSharp: false,
    },
    {
        id: 1,
        key: 'Db',
        degree: 5,
        isSharp: false,
    },
    {
        id: 6,
        key: 'Gb',
        degree: 6,
        isSharp: false,
    },
];
