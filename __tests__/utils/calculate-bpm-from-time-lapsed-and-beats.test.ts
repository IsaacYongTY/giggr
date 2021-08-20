import calculateBpmFromTimeLapsedAndBeats from '../../lib/utils/calculate-bpm-from-time-lapsed-and-beats';

describe('calculateBpm', () => {
    it('should return the bpm based on time lapsed and count given', () => {
        expect(calculateBpmFromTimeLapsedAndBeats(5000, 5)).toBe(60);
        expect(calculateBpmFromTimeLapsedAndBeats(1000, 2)).toBe(120);
        expect(calculateBpmFromTimeLapsedAndBeats(1000, 1.2083)).toBe(72.5);
        expect(calculateBpmFromTimeLapsedAndBeats(5000, 7.916)).toBe(95);
        expect(calculateBpmFromTimeLapsedAndBeats(7500, 10)).toBe(80);
    });

    it('should return the bpm as zero if there is no count', () => {
        expect(calculateBpmFromTimeLapsedAndBeats(0, 0)).toBe(0);
        expect(calculateBpmFromTimeLapsedAndBeats(0, 10)).toBe(0);
        expect(calculateBpmFromTimeLapsedAndBeats(1000, 0)).toBe(0);
    });
});
