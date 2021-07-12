import addSpaceBetweenChineseWords from "../../lib/utils/add-space-between-chinese-words";

describe("addSpaceBetweenChineseWords", () => {
    it("should add a space between all Chinese words", () => {
        expect(addSpaceBetweenChineseWords("是不是还那么爱迟到")).toBe("是 不 是 还 那 么 爱 迟 到")
        expect(addSpaceBetweenChineseWords("寂寞夜晚上过度的想象")).toBe("寂 寞 夜 晚 上 过 度 的 想 象")
        expect(addSpaceBetweenChineseWords("电话握受伤 害怕在抵抗")).toBe("电 话 握 受 伤 害 怕 在 抵 抗")
        expect(addSpaceBetweenChineseWords("告白成功 是命中  注定")).toBe("告 白 成 功 是 命 中 注 定")
        expect(addSpaceBetweenChineseWords("只怕我情谊你不领！")).toBe("只 怕 我 情 谊 你 不 领 ！")
        expect(addSpaceBetweenChineseWords("123 上山打老虎")).toBe("1 2 3 上 山 打 老 虎")

    })

    it("should retain new line characters and the space around it", () => {
        expect(addSpaceBetweenChineseWords("左思量 右想象\n烦恼到头难  料当")).toBe("左 思 量 右 想 象\n烦 恼 到 头 难 料 当")
        expect(addSpaceBetweenChineseWords("我该去告诉你\n告诉你真的爱你\n升华彼此间一 段  感情")).toBe("我 该 去 告 诉 你\n告 诉 你 真 的 爱 你\n升 华 彼 此 间 一 段 感 情")
    })

    it("should return the string unmodified if a word contains A-z characters without space with Chinese characters", () => {
        expect(addSpaceBetweenChineseWords("不敢去面a对你")).toBe("不敢去面a对你")
        expect(addSpaceBetweenChineseWords("maybe你错了")).toBe("maybe你错了")
        expect(addSpaceBetweenChineseWords("maybe我已经睡着 了吗 just maybe")).toBe("maybe我已经睡着 了 吗 just maybe")
    })

    it("should ignore a complete alphanumeric words", () => {
        expect(addSpaceBetweenChineseWords("你是我的 baby")).toBe("你 是 我 的 baby")
        expect(addSpaceBetweenChineseWords("哦 眉笔 baby baby baby")).toBe("哦 眉 笔 baby baby baby")
        expect(addSpaceBetweenChineseWords("Tommy used to work on the dock")).toBe("Tommy used to work on the dock")
    })

    it("should remove tab characters", () => {
        expect(addSpaceBetweenChineseWords("同样的     天空  下 还是同样     一天")).toBe("同 样 的 天 空 下 还 是 同 样 一 天")
        expect(addSpaceBetweenChineseWords("同样的天空下　还是同样一天")).toBe("同 样 的 天 空 下 还 是 同 样 一 天")
    })

    it("should remove trailing white spaces of input", () => {
        expect(addSpaceBetweenChineseWords("     告白成功是命中注定     ")).toBe("告 白 成 功 是 命 中 注 定")
    })
})