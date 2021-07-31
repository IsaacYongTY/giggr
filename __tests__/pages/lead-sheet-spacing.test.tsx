import LeadSheetSpacing from "../../pages/utilities/leadsheetspacing";
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom"
import { hyphenateSync} from "hyphen/en-gb";

jest.mock("next/router", () => require("next-router-mock"))
jest.mock("hyphen/en-gb", () => (
    {
        hyphenateSync: jest.fn((input) => input)
    }
))

function renderLeadSheetSpacing() {
    const utils = render(<LeadSheetSpacing user={{id: 1, firstName: "Isaac", isAdmin: false}} />)
    const inputTextArea = screen.getByLabelText(/input.*/i)
    const resultTextArea = screen.getByLabelText(/result.*/i)
    const processButton = screen.getByRole("button", { name: /process/i})
    const clearAllButton = screen.getByRole("button", { name: /clear all/i})
    const clearResultButton = screen.getByRole("button", { name: /clear result/i})
    const addHyphenCheckbox = screen.getByRole("checkbox", { name: /add hyphen between syllables.*/i})
    const removeStringsCheckbox = screen.getByRole("checkbox", { name: /remove selected strings.*/i})
    const addStringTextbox = screen.getByRole("textbox", { name: /add string to remove.*/i})
    const addStringButton = screen.getByRole("button", { name: /add/i})
    const togglePlaceholderButton = screen.getByRole("button", { name: /toggle placeholder/i})
    return {...utils, inputTextArea, resultTextArea, processButton, clearAllButton, clearResultButton,
        addHyphenCheckbox, removeStringsCheckbox, addStringTextbox, addStringButton, togglePlaceholderButton}
}

describe("The Lead Sheet Spacing page", () => {

    afterEach(() => {
        jest.clearAllMocks()
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
            userEvent.type(inputTextArea, "想要跳啊跳\n 却跳也 跳   不高")
            userEvent.click(processButton)

            expect(resultTextArea).toHaveValue("想 要 跳 啊 跳\n却 跳 也 跳 不 高")
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

        it("should remove specified characters from the result if checkbox is checked", () => {
            const { addStringButton, addStringTextbox, processButton, inputTextArea, resultTextArea } = renderLeadSheetSpacing()
            userEvent.type(addStringTextbox, "#")
            userEvent.click(addStringButton)

            userEvent.type(addStringTextbox, "*")
            userEvent.click(addStringButton)

            userEvent.type(inputTextArea, "#Verse *Chorus")
            userEvent.click(processButton)
            expect(resultTextArea).toHaveValue("Verse Chorus")
        })

        it("should remove specified strings from the result if Remove Strings checkbox is checked", () => {
            const { addStringButton, addStringTextbox, processButton, inputTextArea, resultTextArea } = renderLeadSheetSpacing()
            userEvent.type(addStringTextbox, "需要被移除 的字符串")
            userEvent.click(addStringButton)

            userEvent.type(inputTextArea, "Verse\nfirst line of lyrics\n需要被移除 的字符串\nChorus\nThis is the Chorus")
            userEvent.click(processButton)
            expect(resultTextArea).toHaveValue("Verse\nfirst line of lyrics\n\nChorus\nThis is the Chorus")
        })



        it("should return the same strings if Remove Strings checkbox is not checked", () => {
            const { addStringButton, addStringTextbox, removeStringsCheckbox, processButton, inputTextArea, resultTextArea } = renderLeadSheetSpacing()
            userEvent.type(addStringTextbox, "#")
            userEvent.click(addStringButton)

            userEvent.type(addStringTextbox, "*")
            userEvent.click(addStringButton)

            userEvent.type(inputTextArea, "#not *changed")
            userEvent.click(removeStringsCheckbox)

            userEvent.click(processButton)

            expect(resultTextArea).toHaveValue("#not *changed")
        })

        it("should trim all trailing white spaces for every lines", () => {
            const { processButton, inputTextArea, resultTextArea } = renderLeadSheetSpacing()

            userEvent.type(inputTextArea, "   Verse\n    first line of lyrics \n\n Chorus  \n This is the Chorus")
            userEvent.click(processButton)

            expect(resultTextArea).toHaveValue("Verse\nfirst line of lyrics\n\nChorus\nThis is the Chorus")
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

    describe("Clear Result button", () => {
        it("should clear the content inside result textarea", () => {
            const { clearResultButton, inputTextArea, resultTextArea } = renderLeadSheetSpacing()

            userEvent.type(inputTextArea, "testing in input textarea")
            userEvent.type(resultTextArea, "testing in output textarea")
            userEvent.click(clearResultButton)

            expect(inputTextArea).toHaveValue("testing in input textarea")
            expect(resultTextArea).toHaveValue("")
        })
    })
    describe("Add Hyphen Between Syllables checkbox", () => {

        it("should be checked by default", () => {
            const { addHyphenCheckbox } = renderLeadSheetSpacing()

            expect(addHyphenCheckbox).toBeChecked()
        })

        it("should be able to toggle", () => {
            const { addHyphenCheckbox } = renderLeadSheetSpacing()

            userEvent.click(addHyphenCheckbox)
            expect(addHyphenCheckbox).not.toBeChecked()

            userEvent.click(addHyphenCheckbox)
            expect(addHyphenCheckbox).toBeChecked()
        })

        it("hyphenate function should be called if the checkbox is checked", () => {

            const { processButton } = renderLeadSheetSpacing()
            userEvent.click(processButton)

            expect(hyphenateSync).toBeCalledTimes(1)
        })

        it("hyphenate function should not be called if the checkbox is not checked", () => {

            const { addHyphenCheckbox, processButton } = renderLeadSheetSpacing()
            userEvent.click(addHyphenCheckbox)
            expect(addHyphenCheckbox).not.toBeChecked()

            userEvent.click(processButton)
            expect(hyphenateSync).not.toBeCalled()
        })
    })


    describe("The behaviour of add string to remove textbox", () => {

        beforeEach(() => {
            localStorage.clear()
        })

        it("should add and display added string on the page", () => {
            const {addStringTextbox, addStringButton } = renderLeadSheetSpacing()

            userEvent.type(addStringTextbox, "#")
            expect(addStringTextbox).toHaveValue("#")

            userEvent.click(addStringButton)
            expect(addStringTextbox).toHaveValue("")

            expect(screen.getByText("#")).toBeInTheDocument()
            expect(screen.getByText("clear")).toBeInTheDocument()
        })

        it("should be empty after the add button is clicked", () => {
            const { addStringTextbox, addStringButton } = renderLeadSheetSpacing()

            userEvent.type(addStringTextbox, "#")

            userEvent.click(addStringButton)
            expect(addStringTextbox).toHaveValue("")
        })

        it("should not add string if it already existed", () => {
            const { addStringTextbox, addStringButton } = renderLeadSheetSpacing()

            userEvent.type(addStringTextbox, "#")
            userEvent.click(addStringButton)

            userEvent.type(addStringTextbox, "#")
            userEvent.click(addStringButton)

            expect(screen.getByText("#")).toBeInTheDocument()
        })

        it("should be able to add multiple strings", () => {
            const { addStringTextbox, addStringButton } = renderLeadSheetSpacing()

            userEvent.type(addStringTextbox, "#")
            userEvent.click(addStringButton)

            userEvent.type(addStringTextbox, "*")
            userEvent.click(addStringButton)

            userEvent.type(addStringTextbox, "＃")
            userEvent.click(addStringButton)

            expect(screen.getByText("#")).toBeInTheDocument()
            expect(screen.getByText("*")).toBeInTheDocument()
            expect(screen.getByText("＃")).toBeInTheDocument()

            const deleteButtonArray = screen.getAllByText("clear")
            expect(deleteButtonArray).toHaveLength(3)


        })

        it("should delete the string if delete button for the string is clicked", () => {
            const { addStringTextbox, addStringButton } = renderLeadSheetSpacing()

            userEvent.type(addStringTextbox, "#")
            userEvent.click(addStringButton)

            userEvent.type(addStringTextbox, "*")
            userEvent.click(addStringButton)

            userEvent.type(addStringTextbox, "＃")
            userEvent.click(addStringButton)

            const deleteButtonArray = screen.getAllByText("clear")
            userEvent.click(deleteButtonArray[1])

            expect(screen.queryByText("*")).not.toBeInTheDocument()


        })
    })


    describe("Toggle the removal of characters", () => {
        it("should be checked by default", () => {
            const { removeStringsCheckbox } = renderLeadSheetSpacing()
            expect(removeStringsCheckbox).toBeChecked()
        })

        it("should be able to toggle", () => {
            const { removeStringsCheckbox } = renderLeadSheetSpacing()

            userEvent.click(removeStringsCheckbox)
            expect(removeStringsCheckbox).not.toBeChecked()

            userEvent.click(removeStringsCheckbox)
            expect(removeStringsCheckbox).toBeChecked()
        })




    })

    describe("Toggle placeholder Button", () => {
        it("should toggle the text result to placeholder char", () => {

            const { processButton, inputTextArea, resultTextArea, togglePlaceholderButton } = renderLeadSheetSpacing()

            userEvent.type(inputTextArea, "寂寞夜晚上 过度的想像\n")


            userEvent.click(processButton)

            expect(resultTextArea).toHaveValue("寂 寞 夜 晚 上 过 度 的 想 像\n")

            userEvent.click(togglePlaceholderButton)

            expect(resultTextArea).toHaveValue("a a a a a a a a a a\n")

            userEvent.type(inputTextArea, "{selectall}{backspace}this is a second test")
            userEvent.click(processButton)

            expect(resultTextArea).toHaveValue("a a a a a")

        })

        it("should toggle the text result to placeholder char", () => {

            const { processButton, inputTextArea, resultTextArea, togglePlaceholderButton } = renderLeadSheetSpacing()

            userEvent.type(inputTextArea, "寂寞夜晚上 过度的想像\n")

            userEvent.click(processButton)

            expect(resultTextArea).toHaveValue("寂 寞 夜 晚 上 过 度 的 想 像\n")

            userEvent.click(togglePlaceholderButton)

            expect(resultTextArea).toHaveValue("a a a a a a a a a a\n")





        })
    })
})