export default function calculateBpmFromTimeLapsedAndBeat(
    timeLapsedInMs: number,
    beat: number
): number {
    if (!beat || !timeLapsedInMs) return 0;
    let timeLapsedInSec = timeLapsedInMs / 1000;
    let bps = beat / timeLapsedInSec;

    return parseFloat((bps * 60).toFixed(1));
}
