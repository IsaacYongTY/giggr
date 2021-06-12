import { getSpotifyTrackId, convertKeyModeIntToKey, convertEnharmonic } from "../lib/library";

describe("getSpotifyTrackId", () => {
    it("should return the ID if link is passed", () => {
        expect(getSpotifyTrackId("https://open.spotify.com/track/0eDCVsJKGbQphGjRYa03vE?si=a9629713e16241db")).toBe("0eDCVsJKGbQphGjRYa03vE")
        expect(getSpotifyTrackId("https://open.spotify.com/track/66cBlqEs1viJJCE74CDfGB")).toBe("66cBlqEs1viJJCE74CDfGB")

    })

    it("should return undefined if invalid value is passed in", () => {
        expect(getSpotifyTrackId('')).toBe("")
        expect(getSpotifyTrackId('123456')).toBe("")
        expect(getSpotifyTrackId("66cBlqEs1viJJCE74CDfGB")).toBe("")
    })
})

describe("convertKeyModeIntToKey", () => {
    it("should return the key", () => {
        expect(convertKeyModeIntToKey(0, 1)).toBe('C')
        expect(convertKeyModeIntToKey(2,0)).toBe('Dm')
        expect(convertKeyModeIntToKey(5)).toBe('F')
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


describe("convertEnharmonic", () => {
    it("should return the same value if there's no enharmonic equivalent", () => {
        expect(convertEnharmonic('C')).toBe('C')
        expect(convertEnharmonic('D')).toBe('D')
        expect(convertEnharmonic('E')).toBe('E')
        expect(convertEnharmonic('F')).toBe('F')
        expect(convertEnharmonic('G')).toBe('G')
        expect(convertEnharmonic('A')).toBe('A')
        expect(convertEnharmonic('B')).toBe('B')
    })

    it("should return the enharmonic of sharp keys",() => {
        expect(convertEnharmonic("C#")).toBe("Db")
        expect(convertEnharmonic("D#")).toBe("Eb")
        expect(convertEnharmonic("F#")).toBe("Gb")
        expect(convertEnharmonic("G#")).toBe("Ab")
        expect(convertEnharmonic("A#")).toBe("Bb")
    })

    it("should return the enharmonic of flat keys",() => {
        expect(convertEnharmonic("Db")).toBe("C#")
        expect(convertEnharmonic("Eb")).toBe("D#")
        expect(convertEnharmonic("Gb")).toBe("F#")
        expect(convertEnharmonic("Ab")).toBe("G#")
        expect(convertEnharmonic("Bb")).toBe("A#")
        expect(convertEnharmonic("Gbm")).toBe("F#m")
        expect(convertEnharmonic("Abm")).toBe("G#m")
    })

    it("should return undefined if input is invalid",() => {
        expect(convertEnharmonic("agfg")).toBe(undefined)
        expect(convertEnharmonic("##")).toBe(undefined)
        expect(convertEnharmonic("H")).toBe(undefined)
        expect(convertEnharmonic("Z#")).toBe(undefined)
        expect(convertEnharmonic("JJb")).toBe(undefined)
        expect(convertEnharmonic("Bbb")).toBe(undefined)
    })
})