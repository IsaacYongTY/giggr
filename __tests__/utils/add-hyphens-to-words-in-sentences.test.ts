import addHyphensToWordsInSentences from '../../lib/utils/add-hyphens-to-words-in-sentences';

describe('addHyphensToWordsInSentences', () => {
    it('should add hyphens to the words', () => {
        expect(addHyphensToWordsInSentences('我是 dictionary')).toBe(
            '我是 dic-tio-nary'
        );
        // expect(addHyphensToWordsInSentences("A certain king had a beautiful garden")).toBe("A cer-tain king had a beau-ti-ful garden")
        expect(
            addHyphensToWordsInSentences(
                '有一个A certain king had a beautiful 姑娘 garden'
            )
        ).toBe('有一个A cer-tain king had a beau-ti-ful 姑娘 gar-den');
    });
});
