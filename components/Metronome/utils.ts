export const calculateBpmFromTimeLapsedAndBeats = (
    timeLapsedInMs: number,
    beat: number,
): number => {
    if (!beat || !timeLapsedInMs) return 0;
    const timeLapsedInSec = timeLapsedInMs / 1000;
    const bps = beat / timeLapsedInSec;

    return parseFloat((bps * 60).toFixed(1));
};
