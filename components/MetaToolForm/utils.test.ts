import { generateMetadataText } from './utils';
import { MetatoolSongMetadata } from 'common/types';

const sampleForm: MetatoolSongMetadata = {
    title: '不遗憾',
    romTitle: 'Bu Yi Han',
    artist: 'Ronghao Li',
    durationMinSec: '5:29',
    timeSignature: '4/4',
    language: 'mandarin',
    key: 2,
    mode: 1,
    tempo: 66,
    initialism: 'byh',
    dateReleased: '2021-04-10',
    // moods: [{ value: 'sad', label: 'sad' }],
    // genres: [
    //     { value: 'pop', label: 'pop' },
    //     { value: 'ballad', label: 'ballad' },
    // ],
    // tags: [{ value: 'theme song', label: 'theme song' }],
};

const sampleForm2: MetatoolSongMetadata = {
    title: '我爱你',
    romTitle: 'Wo Ai Ni',
    artist: 'Crowd Lu',
    durationMinSec: '4:45',
    timeSignature: '4/4',
    language: 'mandarin',
    key: 11,
    mode: 0,
    tempo: 93,
    initialism: 'wan',
    dateReleased: '2008-11-10',
    // moods: [{ value: 'sad', label: 'sad' }],
    // genres: [
    //     { value: 'pop', label: 'pop' },
    //     { value: 'funk', label: 'funk' },
    // ],
    // tags: [{ value: 'guitar', label: 'guitar' }],
};

describe('generateMetaData', () => {
    it('should return metadata in OnSong format', () => {
        expect(generateMetadataText(sampleForm, 2)).toBe(
            'Bu Yi 不遗憾\n' +
                'Ronghao Li\n' +
                'Key: D\n' +
                'Tempo: 66\n' +
                'Duration: 5:29\n' +
                'Time: 4/4\n' +
                'Keywords: byh, mandarin\n\n' +
                'Year Released: 2021',
        );

        expect(generateMetadataText(sampleForm2, 1)).toBe(
            'Wo 我爱你\n' +
                'Crowd Lu\n' +
                'Key: Bm\n' +
                'Tempo: 93\n' +
                'Duration: 4:45\n' +
                'Time: 4/4\n' +
                'Keywords: wan, mandarin\n\n' +
                'Year Released: 2008',
        );

        expect(generateMetadataText(sampleForm2, 99)).toBe(
            'Wo Ai Ni 我爱你\n' +
                'Crowd Lu\n' +
                'Key: Bm\n' +
                'Tempo: 93\n' +
                'Duration: 4:45\n' +
                'Time: 4/4\n' +
                'Keywords: wan, mandarin\n\n' +
                'Year Released: 2008',
        );
    });

    it('should return empty string if the parameters are not present', () => {
        expect(
            generateMetadataText(
                {
                    title: '我爱你',
                    romTitle: '',
                    language: '',
                    timeSignature: '',
                    tempo: 0,
                    durationMinSec: '',
                    dateReleased: '',
                    key: -1,
                    mode: -1,
                    artist: '',
                    initialism: '',
                },
                99,
            ),
        ).toBe(
            '我爱你\n' +
                'Key: \n' +
                'Tempo: \n' +
                'Duration: \n' +
                'Time: \n' +
                'Keywords: \n\n' +
                'Year Released: ',
        );

        expect(
            generateMetadataText({
                title: '我爱你',
                language: 'mandarin',
                romTitle: '',
                timeSignature: '',
                tempo: 0,
                durationMinSec: '',
                dateReleased: '',
                key: -1,
                mode: -1,
                artist: '',
                initialism: '',
            }),
        ).toBe(
            '我爱你\n' +
                'Key: \n' +
                'Tempo: \n' +
                'Duration: \n' +
                'Time: \n' +
                'Keywords: mandarin\n\n' +
                'Year Released: ',
        );

        expect(
            generateMetadataText({
                title: '我爱你',
                initialism: 'wan',
                romTitle: '',
                language: '',
                timeSignature: '',
                tempo: 0,
                durationMinSec: '',
                dateReleased: '',
                key: -1,
                mode: -1,
                artist: '',
            }),
        ).toBe(
            '我爱你\n' +
                'Key: \n' +
                'Tempo: \n' +
                'Duration: \n' +
                'Time: \n' +
                'Keywords: wan\n\n' +
                'Year Released: ',
        );
    });
});
