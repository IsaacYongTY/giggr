import LeadSheetSpacing from "../../pages/utilities/leadsheetspacing";
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom"

jest.mock("next/router", () => require("next-router-mock"))

function renderLeadSheetSpacing() {
    const utils = render(<LeadSheetSpacing />)
    const inputTextArea = screen.getByLabelText(/input.*/i)
    const resultTextArea = screen.getByLabelText(/result.*/i)
    const processButton = screen.getByRole("button", { name: /process/i})
    const clearAllButton = screen.getByRole("button", { name: /clear all/i})
    return {...utils, inputTextArea, resultTextArea, processButton, clearAllButton}
}

describe("The Lead Sheet Spacing page", () => {
    it("should render correctly", () => {
        renderLeadSheetSpacing()
    })

    describe("The functionality of adding space in characters", () => {
        it("should add spaces between Chinese characters", () => {
            const { processButton, inputTextArea, resultTextArea } = renderLeadSheetSpacing()

            userEvent.type(inputTextArea, "我是一只大大大大鸟")

            userEvent.click(processButton)

            expect(resultTextArea).toHaveValue("我 是 一 只 大 大 大 大 鸟")
        })

        it("should overwrite the content in result when Process button is pressed", () => {
            const { processButton, inputTextArea, resultTextArea } = renderLeadSheetSpacing()

            userEvent.type(inputTextArea, "我是一只大大大大鸟")
            userEvent.click(processButton)

            expect(resultTextArea).toHaveValue("我 是 一 只 大 大 大 大 鸟")

            userEvent.type(inputTextArea, "{selectall}{backspace}")
            userEvent.type(inputTextArea, "想要跳啊跳\n 却跳也 跳   不远")
            userEvent.click(processButton)

            expect(resultTextArea).toHaveValue("想 要 跳 啊 跳\n却 跳 也 跳 不 远")
        })

        it("should add spaces to long paragraph and ignore English words", () => {
            const { processButton, inputTextArea, resultTextArea } = renderLeadSheetSpacing()

            userEvent.type(inputTextArea, "寂寞夜晚上 过度的想像\n" +
                "一股脑告白恐慌\n" +
                "电话握手上 害怕在抵抗\n" +
                "拨不出一夜惆怅\n" +
                "\n" +
                "左思量 右想像\n" +
                "烦 恼到头难了当\n" +
                "又是茫然紧张 所言难畅\n" +
                "\n" +
                "我该去 tell you 告诉你   真的爱你\n" +
                "升华彼此间   一段感情\n" +
                "告白成 功是命中注定\n" +
                "\n" +
                "不敢去面对你 只怕我情意你不领\n" +
                "尴尬彼此间一段友情\n" +
                "所希望被破灭 被你否定")

            userEvent.click(processButton)

            expect(resultTextArea).toHaveValue("寂 寞 夜 晚 上 过 度 的 想 像\n" +
                "一 股 脑 告 白 恐 慌\n" +
                "电 话 握 手 上 害 怕 在 抵 抗\n" +
                "拨 不 出 一 夜 惆 怅\n" +
                "\n" +
                "左 思 量 右 想 像\n" +
                "烦 恼 到 头 难 了 当\n" +
                "又 是 茫 然 紧 张 所 言 难 畅\n" +
                "\n" +
                "我 该 去 tell you 告 诉 你 真 的 爱 你\n" +
                "升 华 彼 此 间 一 段 感 情\n" +
                "告 白 成 功 是 命 中 注 定\n" +
                "\n" +
                "不 敢 去 面 对 你 只 怕 我 情 意 你 不 领\n" +
                "尴 尬 彼 此 间 一 段 友 情\n" +
                "所 希 望 被 破 灭 被 你 否 定")

        })
    })

    describe("Clear All button", () => {
        it("should clear the content inside input and result textarea", () => {
            const { clearAllButton, inputTextArea, resultTextArea } = renderLeadSheetSpacing()

            userEvent.type(inputTextArea, "testing in input textarea")
            userEvent.type(resultTextArea, "testing in output textarea")
            userEvent.click(clearAllButton)

            expect(inputTextArea).toHaveValue("")
            expect(resultTextArea).toHaveValue("")
        })
    })
})