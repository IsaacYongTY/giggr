import convertEnharmonic from "../../lib/utils/convert-enharmonic";

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

    it("should return empty string if input is invalid",() => {
        expect(convertEnharmonic("agfg")).toBe("")
        expect(convertEnharmonic("##")).toBe("")
        expect(convertEnharmonic("H")).toBe("")
        expect(convertEnharmonic("Z#")).toBe("")
        expect(convertEnharmonic("JJb")).toBe("")
        expect(convertEnharmonic("Bbb")).toBe("")
    })
})