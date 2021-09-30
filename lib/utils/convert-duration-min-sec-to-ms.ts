export default function convertDurationMinSecToMs(
    durationMinSec: string
): number {
    if (!durationMinSec.includes(':')) return -1;
    if (durationMinSec.split(':')[1].length !== 2) return -1;

    const [min, sec] = durationMinSec
        .split(':')
        .map((element) => parseInt(element));

    if (sec >= 60) return -1;

    return (min * 60 + sec) * 1000;
}
