import containsChinese from 'contains-chinese';
import chineseToPinyin from 'chinese-to-pinyin';

export interface TrackData {
    title: string;
    artist: string;
    spotifyLink: string;
    verified: boolean;
    tempo: number;
    language: string;
    timeSignature: string;
    mode: number;
    initialism: string;
    danceability: number;
    energy: number;
    instrumentalness: number;
    acousticness: number;
    valence: number;
    dateReleased: string;
    durationMs: number;
    key: number;
    romTitle: string;
}

export const convertTime = (spotifyTime: string | number) => `${spotifyTime}/4`;

function removeBracketsAndSuffixes(input: string) {
    const invalidCharactersRegex = /[(（\-[{《]/g;
    const removeIndex = input.search(invalidCharactersRegex);

    if (removeIndex === -1) return input;
    return input.slice(0, removeIndex).trim();
}

export function getInitialism(input: string) {
    return removeBracketsAndSuffixes(input)
        .split(' ')
        .reduce((acc, word) => acc + word[0].toLowerCase(), '');
}

export const capitalizeString = (romTitle: string) =>
    romTitle
        .split(' ')
        .map((word) => word[0].toUpperCase() + word.slice(1))
        .join(' ');

export function getRomTitle(title: string) {
    title = removeBracketsAndSuffixes(title);
    const romTitle = chineseToPinyin(title, { removeTone: true });
    return capitalizeString(romTitle).replace(/,/g, ' ');
}

export function roundTempo(spotifyTempo: number) {
    return Math.round(spotifyTempo);
}

export function addMandarinTrackInfo(trackData: TrackData) {
    trackData.romTitle = getRomTitle(trackData.title);
    trackData.language = 'mandarin';
    trackData.initialism = getInitialism(trackData.romTitle);

    return trackData;
}

export function addEnglishTrackInfo(trackData: TrackData) {
    trackData.language = 'english';
    trackData.initialism = getInitialism(trackData.title);

    return trackData;
}

export async function getAudioFeatures(
    data: SpotifyApi.AudioFeaturesResponse,
    trackInfo: SpotifyApi.SingleTrackResponse,
) {
    try {
        console.log(data);
        const {
            key,
            mode,
            tempo,
            time_signature,
            duration_ms,
            energy,
            danceability,
            valence,
            acousticness,
            instrumentalness,
        } = data;

        const {
            artists,
            name,
            album,
            external_urls: { spotify },
        } = trackInfo;

        let processedTrackData = {
            title: name,
            artist: artists[0].name,
            key,
            mode,
            tempo: roundTempo(tempo),
            spotifyLink: spotify,
            durationMs: duration_ms,
            timeSignature: convertTime(time_signature),
            energy,
            danceability,
            valence,
            acousticness,
            instrumentalness,
            verified: false,
            dateReleased: album.release_date,
            romTitle: '',
            language: '',
            initialism: '',
        };

        const isChinese: boolean = containsChinese(processedTrackData.title);

        processedTrackData = isChinese
            ? addMandarinTrackInfo(processedTrackData)
            : addEnglishTrackInfo(processedTrackData);

        console.log(processedTrackData);
        return processedTrackData;
    } catch (error) {
        console.log(error);
        return error;
    }
}
