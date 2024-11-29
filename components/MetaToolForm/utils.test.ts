import { generateMetadataText } from './utils';
import { MetatoolSongMetadata } from 'common/types';

const sampleForm: MetatoolSongMetadata = {
    title: '不遗憾',
    romTitle: 'Bu Yi Han',
    artist: 'Ronghao Li',
    language: 'mandarin',
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
    language: 'mandarin',
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
                'Key: \n' +
                'Tempo: \n' +
                'Duration: \n' +
                'Time: \n' +
                'Keywords: byh, mandarin\n\n' +
                'Year Released: 2021',
        );

        expect(generateMetadataText(sampleForm2, 1)).toBe(
            'Wo 我爱你\n' +
                'Crowd Lu\n' +
                'Key: \n' +
                'Tempo: \n' +
                'Duration: \n' +
                'Time: \n' +
                'Keywords: wan, mandarin\n\n' +
                'Year Released: 2008',
        );

        expect(generateMetadataText(sampleForm2, 99)).toBe(
            'Wo Ai Ni 我爱你\n' +
                'Crowd Lu\n' +
                'Key: \n' +
                'Tempo: \n' +
                'Duration: \n' +
                'Time: \n' +
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
                    dateReleased: '',
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
                dateReleased: '',
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
                dateReleased: '',
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
