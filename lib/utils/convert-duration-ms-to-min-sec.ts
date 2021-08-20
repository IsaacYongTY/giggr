export default function convertDurationMsToMinSec(durationMs: number): string {
    if (durationMs < 0) return '';

    const timeInSec = Math.round(durationMs / 1000);
    const min = Math.floor(timeInSec / 60);
    const sec = Math.round(timeInSec - min * 60);

    const resultSec = sec < 10 ? `0${sec}` : sec;

    return `${min}:${resultSec}`;
}
