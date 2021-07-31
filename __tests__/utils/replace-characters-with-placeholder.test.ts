import replaceCharactersWithPlaceholders from "../../lib/utils/replace-characters-with-placeholders";

describe("replaceCharactersWithPlaceholders", () => {
    it("should take in characters separated by space and convert into placeholder character", () => {
        expect(replaceCharactersWithPlaceholders("所 有 的 字 都 会 被 替 换")).toBe("a a a a a a a a a")
        expect(replaceCharactersWithPlaceholders("所 有 的 字 都 会 被 替 换\n包 括 含 有 下 一 行 的")).toBe("a a a a a a a a a\na a a a a a a a")
        expect(replaceCharactersWithPlaceholders("试 试 看 另 外 一 个")).toBe("a a a a a a a")
    })

    it("should ignore Latin characters", () => {
        expect(replaceCharactersWithPlaceholders("this is a-no-ther test")).toBe("this is a-no-ther test")
        expect(replaceCharactersWithPlaceholders("这 是 中 英 混 合 的 a-no-ther test")).toBe("a a a a a a a a-no-ther test")

    })

    it("should replace Chinese characters with specified Latin characters", () => {
        expect(replaceCharactersWithPlaceholders("所 有 的 字 都 会 被 替 换", "k")).toBe("k k k k k k k k k")


    })

    it("should handle edge cases", () => {
        expect(replaceCharactersWithPlaceholders("")).toBe("")
        expect(() => replaceCharactersWithPlaceholders("PLaceholder character is more than one", "ka")).toThrow(/placeholder text must only be a single character/i)
        expect(() => replaceCharactersWithPlaceholders("Placeholder character is empty string", "")).toThrow(/placeholder text must only be a single character/i)

    })
})