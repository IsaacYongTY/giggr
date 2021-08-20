import removeCharacters, {
    addBackSlashToEscapingCharactersArray,
} from '../../lib/utils/remove-characters';

describe('removeCharacters', () => {
    it('should remove specified, characters or strings in array from text', () => {
        expect(removeCharacters(['#'], '#testing')).toBe('testing');
        expect(
            removeCharacters(
                ['更多更详尽歌词 在 ※ Mojim.com　魔镜歌词网'],
                '他爱我\n更多更详尽歌词 在 ※ Mojim.com　魔镜歌词网'
            )
        ).toBe('他爱我\n');
        expect(removeCharacters(['#', '※'], '#testing ※another')).toBe('testing another');
        expect(removeCharacters(['*', '#'], '*coding is fun')).toBe('coding is fun');
        expect(removeCharacters(['*'], '*coding is fun')).toBe('coding is fun');
        expect(
            removeCharacters(
                ['*', '#', '＃', '＊', '更多更详尽歌词 在 ※ Mojim.com　魔镜歌词网'],
                '*First\n#Second\n＃Third\n＊Fourth\n更多更详尽歌词 在 ※ Mojim.com　魔镜歌词网Fifth'
            )
        ).toBe('First\nSecond\nThird\nFourth\nFifth');
    });

    it('should return the original string if stringsToRemoveArray is empty', () => {
        expect(removeCharacters([], 'they are the same string')).toBe('they are the same string');
    });

    describe('addBackSlashToEscapingCharacters', () => {
        it('should add backslash to escaping characters in regex', () => {
            expect(addBackSlashToEscapingCharactersArray(['.', 'testing'])).toStrictEqual([
                '\\.',
                'testing',
            ]);
            expect(
                addBackSlashToEscapingCharactersArray(['*', '|', 'another #word'])
            ).toStrictEqual(['\\*', '\\|', 'another #word']);
        });
    });
});
