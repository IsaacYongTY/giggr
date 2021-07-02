import convertKeyToKeyModeInt from "../../lib/utils/convert-key-to-key-mode-int";

describe("convertKeyToKeyModeInt", () => {
    it("should convert key to [key, mode]", () => {
        expect(convertKeyToKeyModeInt("C")).toStrictEqual([0,1])
        expect(convertKeyToKeyModeInt("Cm")).toStrictEqual([0,0])
        expect(convertKeyToKeyModeInt("Bm")).toStrictEqual([11,0])
        expect(convertKeyToKeyModeInt("A")).toStrictEqual([9,1])
    })

    it("should convert key to [key,mode] with correct enharmonic equivalent", () => {
        expect(convertKeyToKeyModeInt("C#m")).toStrictEqual([1,0])
        expect(convertKeyToKeyModeInt("G#m")).toStrictEqual([8,0])
        expect(convertKeyToKeyModeInt("F#m")).toStrictEqual([6,0])
    })

    it("should convert key to [key,mode] with correct enharmonic equivalent with wrong input enharmonic", () => {
        expect(convertKeyToKeyModeInt("Dbm")).toStrictEqual([1,0])
        expect(convertKeyToKeyModeInt("Abm")).toStrictEqual([8,0])
        expect(convertKeyToKeyModeInt("Gbm")).toStrictEqual([6,0])
    })

    it("should return [-1,-1] if the input is invalid",() => {
        expect(convertKeyToKeyModeInt("Hm")).toStrictEqual([-1,-1])
        expect(convertKeyToKeyModeInt("123")).toStrictEqual([-1,-1])
        expect(convertKeyToKeyModeInt("AM")).toStrictEqual([-1,-1])
        expect(convertKeyToKeyModeInt("1m")).toStrictEqual([-1,-1])
        expect(convertKeyToKeyModeInt("1")).toStrictEqual([-1,-1])
    })

    it("should return [-1,-1] if the input is undefined", () => {
        expect(convertKeyToKeyModeInt("")).toStrictEqual([-1,-1])
        // expect(convertKeyToKeyModeInt(undefined)).toStrictEqual([-1,-1])
        // expect(convertKeyToKeyModeInt(null)).toStrictEqual([-1,-1])
    })
})