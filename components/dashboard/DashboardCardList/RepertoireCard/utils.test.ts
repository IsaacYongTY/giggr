import { deriveSongsAddedThisWeek } from './utils';
import { subDays } from 'date-fns';

import Song from '../../../../lib/types/song';
import { generateMockSong } from '../../../../fixtures/generate-mock-song';

const mockSongs: Song[] = [
    generateMockSong('Qi Tian', new Date()),
    generateMockSong('Tu Recuerdos', new Date()),
    generateMockSong('A song that is out of range', subDays(new Date(), 10)),
];

describe('deriveSongsAddedThisWeek', () => {
    it('should return songs added this week', () => {
        expect(deriveSongsAddedThisWeek(mockSongs)).toBe(2);
    });
});
