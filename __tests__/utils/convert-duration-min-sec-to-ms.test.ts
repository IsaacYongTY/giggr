import convertDurationMinSecToMs from '../../lib/utils/convert-duration-min-sec-to-ms';

describe("convertMinSecToMs", () => {
    it("should convert mm:ss format to ms", () => {
        expect(convertDurationMinSecToMs("3:44")).toEqual(224000)
        expect(convertDurationMinSecToMs("0:00")).toEqual(0)
        expect(convertDurationMinSecToMs("5:01")).toEqual(301000)
        expect(convertDurationMinSecToMs("100:03")).toEqual(6003000)

    })

    it("should return undefined if wrong format is provided", () => {
        expect(convertDurationMinSecToMs("3:60")).toEqual(-1)
        expect(convertDurationMinSecToMs("100:60")).toEqual(-1)
        expect(convertDurationMinSecToMs("300")).toEqual(-1)
        expect(convertDurationMinSecToMs("3:7")).toEqual(-1)
    })
})
