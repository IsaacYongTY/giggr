import convertKeyModeIntToKey from "../lib/utils/convert-key-mode-int-to-key";

describe("convertKeyModeIntToKey", () => {
    it("should return the key", () => {
        expect(convertKeyModeIntToKey(0, 1)).toBe('C')
        expect(convertKeyModeIntToKey(2,0)).toBe('Dm')
        expect(convertKeyModeIntToKey(5, 1)).toBe('F')
    })

    it("should return undefined if no input is provided", () => {
        expect(convertKeyModeIntToKey()).toBe(undefined)
    })

    it("should return undefined if wrong input is provided", () => {
        expect(convertKeyModeIntToKey(0,2)).toBe(undefined)
        expect(convertKeyModeIntToKey(-1, 1)).toBe(undefined)
    })

    it("should return the correct enharmonic key", () => {
        expect(convertKeyModeIntToKey(6,0)).toBe('F#m')
        expect(convertKeyModeIntToKey(8,0)).toBe('G#m')
        expect(convertKeyModeIntToKey(1,0)).toBe('C#m')
    })
})