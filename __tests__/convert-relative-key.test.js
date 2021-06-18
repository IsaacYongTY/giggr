import convertRelativeKey from "../lib/utils/convert-relative-key";

describe("convertRelativeKey", () => {
    it("should convert major to minor key", () => {
        expect(convertRelativeKey("C")).toBe("Am")
        expect(convertRelativeKey("Db")).toBe("Bbm")
        expect(convertRelativeKey("D")).toBe("Bm")
        expect(convertRelativeKey("Eb")).toBe("Cm")
        expect(convertRelativeKey("E")).toBe("C#m")
        expect(convertRelativeKey("F")).toBe("Dm")
        expect(convertRelativeKey("Gb")).toBe("Ebm")
        expect(convertRelativeKey("G")).toBe("Em")
        expect(convertRelativeKey("Ab")).toBe("Fm")
        expect(convertRelativeKey("A")).toBe("F#m")
        expect(convertRelativeKey("Bb")).toBe("Gm")
        expect(convertRelativeKey("B")).toBe("G#m")
    })

    it("should convert minor to major key", () => {
        expect(convertRelativeKey("Am")).toBe("C")
        expect(convertRelativeKey("Bbm")).toBe("Db")
        expect(convertRelativeKey("Bm")).toBe("D")
        expect(convertRelativeKey("Cm")).toBe("Eb")
        expect(convertRelativeKey("C#m")).toBe("E")
        expect(convertRelativeKey("Dm")).toBe("F")
        expect(convertRelativeKey("Ebm")).toBe("Gb")
        expect(convertRelativeKey("Em")).toBe("G")
        expect(convertRelativeKey("Fm")).toBe("Ab")
        expect(convertRelativeKey("F#m")).toBe("A")
        expect(convertRelativeKey("Gm")).toBe("Bb")
        expect(convertRelativeKey("G#m")).toBe("B")
    })

    it("should return empty string if it's invalid", () => {
        expect(convertRelativeKey("1234")).toBe("")
        expect(convertRelativeKey("AM")).toBe("")
        expect(convertRelativeKey("Hm")).toBe("")
    })
})