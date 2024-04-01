import {
    addSpaceBetweenChineseCharacters,
    removeCharacters,
    addBackSlashToEscapingCharactersArray,
    replaceCharactersWithPlaceholders,
    addHyphensToWordsInSentences,
} from './utils';

describe('addSpaceBetweenChineseWords', () => {
    it('should add a space between all Chinese words', () => {
        expect(addSpaceBetweenChineseCharacters('是不是还那么爱迟到')).toBe(
            '是 不 是 还 那 么 爱 迟 到',
        );
        expect(addSpaceBetweenChineseCharacters('寂寞夜晚上过度的想象')).toBe(
            '寂 寞 夜 晚 上 过 度 的 想 象',
        );
        expect(addSpaceBetweenChineseCharacters('电话握受伤 害怕在抵抗')).toBe(
            '电 话 握 受 伤 害 怕 在 抵 抗',
        );
        expect(addSpaceBetweenChineseCharacters('告白成功 是命中  注定')).toBe(
            '告 白 成 功 是 命 中 注 定',
        );
        expect(addSpaceBetweenChineseCharacters('只怕我情谊你不领！')).toBe(
            '只 怕 我 情 谊 你 不 领 ！',
        );
        expect(addSpaceBetweenChineseCharacters('123 上山打老虎')).toBe(
            '1 2 3 上 山 打 老 虎',
        );
    });

    it('should retain new line characters and the space around it', () => {
        expect(
            addSpaceBetweenChineseCharacters('左思量 右想象\n烦恼到头难  料当'),
        ).toBe('左 思 量 右 想 象\n烦 恼 到 头 难 料 当');
        expect(
            addSpaceBetweenChineseCharacters(
                '我该去告诉你\n告诉你真的爱你\n升华彼此间一 段  感情',
            ),
        ).toBe(
            '我 该 去 告 诉 你\n告 诉 你 真 的 爱 你\n升 华 彼 此 间 一 段 感 情',
        );
    });

    it('should return the string unmodified if a word contains A-z characters without space with Chinese characters', () => {
        expect(addSpaceBetweenChineseCharacters('不敢去面a对你')).toBe(
            '不敢去面a对你',
        );
        expect(addSpaceBetweenChineseCharacters('maybe你错了')).toBe(
            'maybe你错了',
        );
        expect(
            addSpaceBetweenChineseCharacters('maybe我已经睡着 了吗 just maybe'),
        ).toBe('maybe我已经睡着 了 吗 just maybe');
    });

    it('should ignore a complete alphanumeric words', () => {
        expect(addSpaceBetweenChineseCharacters('你是我的 baby')).toBe(
            '你 是 我 的 baby',
        );
        expect(addSpaceBetweenChineseCharacters('哦 眉笔 baby baby baby')).toBe(
            '哦 眉 笔 baby baby baby',
        );
        expect(
            addSpaceBetweenChineseCharacters('Tommy used to work on the dock'),
        ).toBe('Tommy used to work on the dock');
    });

    it('should remove tab characters', () => {
        expect(
            addSpaceBetweenChineseCharacters(
                '同样的     天空  下 还是同样     一天',
            ),
        ).toBe('同 样 的 天 空 下 还 是 同 样 一 天');
        expect(
            addSpaceBetweenChineseCharacters('同样的天空下　还是同样一天'),
        ).toBe('同 样 的 天 空 下 还 是 同 样 一 天');
    });

    it('should remove trailing white spaces of input', () => {
        expect(
            addSpaceBetweenChineseCharacters('     告白成功是命中注定     '),
        ).toBe('告 白 成 功 是 命 中 注 定');
    });
});

describe('removeCharacters', () => {
    it('should remove specified, characters or strings in array from text', () => {
        expect(removeCharacters(['#'], '#testing')).toBe('testing');
        expect(
            removeCharacters(
                ['更多更详尽歌词 在 ※ Mojim.com　魔镜歌词网'],
                '他爱我\n更多更详尽歌词 在 ※ Mojim.com　魔镜歌词网',
            ),
        ).toBe('他爱我\n');
        expect(removeCharacters(['#', '※'], '#testing ※another')).toBe(
            'testing another',
        );
        expect(removeCharacters(['*', '#'], '*coding is fun')).toBe(
            'coding is fun',
        );
        expect(removeCharacters(['*'], '*coding is fun')).toBe('coding is fun');
        expect(
            removeCharacters(
                [
                    '*',
                    '#',
                    '＃',
                    '＊',
                    '更多更详尽歌词 在 ※ Mojim.com　魔镜歌词网',
                ],
                '*First\n#Second\n＃Third\n＊Fourth\n更多更详尽歌词 在 ※ Mojim.com　魔镜歌词网Fifth',
            ),
        ).toBe('First\nSecond\nThird\nFourth\nFifth');
    });

    it('should return the original string if stringsToRemoveArray is empty', () => {
        expect(removeCharacters([], 'they are the same string')).toBe(
            'they are the same string',
        );
    });

    describe('addBackSlashToEscapingCharacters', () => {
        it('should add backslash to escaping characters in regex', () => {
            expect(
                addBackSlashToEscapingCharactersArray(['.', 'testing']),
            ).toStrictEqual(['\\.', 'testing']);
            expect(
                addBackSlashToEscapingCharactersArray([
                    '*',
                    '|',
                    'another #word',
                ]),
            ).toStrictEqual(['\\*', '\\|', 'another #word']);
        });
    });
});

describe('replaceCharactersWithPlaceholders', () => {
    it('should take in characters separated by space and convert into placeholder character', () => {
        expect(
            replaceCharactersWithPlaceholders('所 有 的 字 都 会 被 替 换'),
        ).toBe('a a a a a a a a a');
        expect(
            replaceCharactersWithPlaceholders(
                '所 有 的 字 都 会 被 替 换\n包 括 含 有 下 一 行 的',
            ),
        ).toBe('a a a a a a a a a\na a a a a a a a');
        expect(replaceCharactersWithPlaceholders('试 试 看 另 外 一 个')).toBe(
            'a a a a a a a',
        );
    });

    it('should ignore Latin characters', () => {
        expect(
            replaceCharactersWithPlaceholders('this is a-no-ther test'),
        ).toBe('this is a-no-ther test');
        expect(
            replaceCharactersWithPlaceholders(
                '这 是 中 英 混 合 的 a-no-ther test',
            ),
        ).toBe('a a a a a a a a-no-ther test');
    });

    it('should replace Chinese characters with specified Latin characters', () => {
        expect(
            replaceCharactersWithPlaceholders(
                '所 有 的 字 都 会 被 替 换',
                'k',
            ),
        ).toBe('k k k k k k k k k');
    });

    it('should handle edge cases', () => {
        expect(replaceCharactersWithPlaceholders('')).toBe('');
        expect(() =>
            replaceCharactersWithPlaceholders(
                'PLaceholder character is more than one',
                'ka',
            ),
        ).toThrow(/placeholder text must only be a single character/i);
        expect(() =>
            replaceCharactersWithPlaceholders(
                'Placeholder character is empty string',
                '',
            ),
        ).toThrow(/placeholder text must only be a single character/i);
    });
});

describe('addHyphensToWordsInSentences', () => {
    it('should add hyphens to the words', () => {
        expect(addHyphensToWordsInSentences('我是 dictionary')).toBe(
            '我是 dic-tio-nary',
        );
        // expect(addHyphensToWordsInSentences("A certain king had a beautiful garden")).toBe("A cer-tain king had a beau-ti-ful garden")
        expect(
            addHyphensToWordsInSentences(
                '有一个A certain king had a beautiful 姑娘 garden',
            ),
        ).toBe('有一个A cer-tain king had a beau-ti-ful 姑娘 gar-den');
    });
});
