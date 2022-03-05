import Form from 'lib/types/Form';
import convertDurationMsToMinSec from 'lib/utils/convert-duration-ms-to-min-sec';
import { MetatoolSongMetadata } from 'common/types';

export const deriveMetatoolSongMetadata = (
    data: Form
): MetatoolSongMetadata => ({
    title: data.title || '',
    romTitle: data.romTitle || '',
    artist: data.artist || '',
    language: data.language || '',
    timeSignature: data.timeSignature || '',
    durationMinSec: data.durationMs
        ? convertDurationMsToMinSec(data.durationMs)
        : '',
    tempo: data.tempo || 0,
    dateReleased: data.dateReleased || '',
    key: data.key === undefined ? -1 : data.key, // key can be 0
    mode: data.mode === undefined ? -1 : data.mode, // mode can be 0
    initialism: data.initialism || '',
});
