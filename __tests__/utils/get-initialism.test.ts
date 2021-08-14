import getInitialism from '../../lib/utils/get-initialism';

describe('getInitialism', () => {
    it('should return the initials of the song title in latin alphabets', () => {
        expect(getInitialism('Li Bai')).toBe('lb');
        expect(getInitialism("Livin' on a Prayer")).toBe('loap');
        expect(getInitialism('Never Gonna Give You Up')).toBe('nggyu');
    });

    it('should ignore the content inside any brackets', () => {
        expect(
            getInitialism('Master of Puppets (2002 Remastered Version)')
        ).toBe('mop');
        expect(
            getInitialism('Master of Puppets (2002 Remastered Version)')
        ).toBe('mop');
        expect(getInitialism('Ru Guo Yu Zhi Hou 《Demo Version》')).toBe(
            'rgyzh'
        );
        expect(
            getInitialism('Have I Told You Lately [2050 Anniversary Edition]')
        ).toBe('hityl');
        expect(getInitialism('24k Magic - feat. Lil Doug')).toBe('2m');
    });
});
