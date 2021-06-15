import convertDurationMsToMinSec from "../lib/utils/convert-duration-ms-to-min-sec";

describe("convertDurationMsToMinSec", () => {
    it("should convert milliseconds to mm:ss format", () => {
        expect(convertDurationMsToMinSec(300000)).toBe("5:00")
        expect(convertDurationMsToMinSec(59000)).toBe("0:59")
        expect(convertDurationMsToMinSec(61000)).toBe("1:01")
        expect(convertDurationMsToMinSec(0)).toBe("0:00")
        expect(convertDurationMsToMinSec(1000)).toBe("0:01")
        expect(convertDurationMsToMinSec(100)).toBe("0:00")
        expect(convertDurationMsToMinSec(500)).toBe("0:01")
    })

    it("should return undefined if value provided is negative", () => {
        expect(convertDurationMsToMinSec(-300000)).toBe(undefined)
        expect(convertDurationMsToMinSec(-1)).toBe(undefined)
    })
})