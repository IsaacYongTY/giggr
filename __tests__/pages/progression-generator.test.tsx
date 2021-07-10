import React from "react";
import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import "@testing-library/jest-dom"
import ProgGenerator from "../../pages/utilities/progression"

const renderProg = () => {
    const utils = render(<ProgGenerator />)
    const generateButton = utils.getByRole("button", { name: /generate/i })
    const clearButton = utils.getByRole("button", { name: /clear/i })
    const inputTextbox = utils.getByRole("textbox", { name: /input.*/i })
    const keysDropdown = utils.getByLabelText(/key/i)
    const commonProgDropdown = utils.getByLabelText(/common progression.+/i)
    const textArea = utils.getByLabelText(/result.+/i)
    const fullBarRadio = utils.getByLabelText(/full bar/i)
    const halfBarRadio = utils.getByLabelText(/half bar/i)
    const spacesDropdown = utils.getByLabelText(/spaces/i)
    const copyToClipboardButton = utils.getByRole("button", { name: /copy to clipboard/i })

    return {
        ...utils,
        generateButton,
        clearButton,
        inputTextbox,
        keysDropdown,
        commonProgDropdown,
        textArea,
        fullBarRadio,
        halfBarRadio,
        spacesDropdown,
        copyToClipboardButton
    }
}

let user = { tierId: 4, name: "Isaac"}

jest.mock("next/router", () => require("next-router-mock"))

describe("The progression generator page", () => {
    describe("The key dropdown menu",() => {
        it("should render correctly", () => {
            let { keysDropdown } = renderProg()

            expect(keysDropdown).toBeInTheDocument()
            expect(screen.getByText("C")).toBeInTheDocument()
        })
    })

    describe("The common progression dropdown", () => {

        it("should toggle on the dropdown menu", () => {
            let { commonProgDropdown, inputTextbox } = renderProg()

            userEvent.click(commonProgDropdown)

            expect(screen.getByText(/^(canon).+/i)).toBeInTheDocument()
            userEvent.click(screen.getByText(/typical ballad progression.+/i))

            expect(screen.getByText(/typical ballad progression.+/i)).toBeInTheDocument()
            expect(inputTextbox).toHaveValue("45362511")

        })

    })

    describe("The input textbox", () => {

        it("should display the input value", async () => {
            let { inputTextbox } = renderProg()
            userEvent.type(inputTextbox, "4321{backspace}2")
            expect(inputTextbox).toHaveValue("4322")
        })

        it.todo("should not accept inputs if they're not 1-7, m, M, b, and #")
    })

    describe("The radio buttons for full bar and half bar", () => {

        it("should be selected one at a time if they're clicked", () => {
            let { fullBarRadio, halfBarRadio } = renderProg()
            userEvent.click(fullBarRadio)
            expect(fullBarRadio).toBeChecked()
            expect(halfBarRadio).not.toBeChecked()

            userEvent.click(halfBarRadio)
            expect(halfBarRadio).toBeChecked()
            expect(fullBarRadio).not.toBeChecked()
        })
    })

    describe("The spacing textbox", () => {
        it("should render correctly", () => {
            renderProg()
            let defaultSpacing = 12
            expect(screen.getByText(defaultSpacing)).toBeInTheDocument()
        })

        it("should change value when number is input",() => {
            let { spacesDropdown } = renderProg()
            userEvent.click(spacesDropdown)
            expect(screen.getByText("8")).toBeInTheDocument()
            expect(screen.getByText("14")).toBeInTheDocument()

            userEvent.click(screen.getByText("10"))
            expect(screen.getByText("10")).toBeInTheDocument()
        })

        it("should change value when radio is selected", () => {
            let { halfBarRadio, fullBarRadio } = renderProg()

            userEvent.click(halfBarRadio)
            expect(screen.getByText("14")).toBeInTheDocument()

            userEvent.click(fullBarRadio)
            expect(screen.getByText("12")).toBeInTheDocument()
        })
    })

    describe("The result textarea", () => {
        it("should render correctly", () => {
            let { textArea } = renderProg()
            expect(textArea).toBeInTheDocument()
        })

        it("should be empty at the beginning",() => {
            let { textArea } = renderProg()
            expect(textArea).toHaveValue("")
        })

        it("should render text when user types in it", () => {
            let { clearButton, textArea } = renderProg()
            userEvent.type(textArea, "random things user typed")
            expect(textArea).toHaveValue("random things user typed")

        })

        it("should render correct result according to key, progression and spacing given", () => {
            let { generateButton, keysDropdown, inputTextbox, spacesDropdown, textArea } = renderProg()

            userEvent.click(keysDropdown)
            userEvent.click(screen.getByText('Eb'))

            userEvent.click(inputTextbox)
            userEvent.type(inputTextbox, "4536")
            expect(inputTextbox).toHaveValue("4536")

            userEvent.click(spacesDropdown)
            userEvent.click(screen.getByText("14"))

            userEvent.click(generateButton)

            expect(textArea).toHaveValue("| [Ab]             | [Bb]             | [Gm]             | [Cm]             |\n\n")
        })

        it("should return an error message if progression is missing", () => {
            let { generateButton, textArea } = renderProg()
            let errorMessage = /please input progression.*/i

            expect(screen.queryByText(errorMessage)).not.toBeInTheDocument()

            userEvent.click(generateButton)

            expect(screen.getByText(errorMessage)).toBeInTheDocument()
            expect(textArea).toHaveValue("")
        })

        it("should hide error message once a valid input is provided when Generate button is clicked", () => {
            let { generateButton, inputTextbox } = renderProg()
            let errorMessage = /^.*please input progression.*/i

            userEvent.click(generateButton)

            expect(screen.getByText(errorMessage)).toBeInTheDocument()

            userEvent.type(inputTextbox, "1")
            userEvent.click(generateButton)

            expect(screen.queryByText(errorMessage)).not.toBeInTheDocument()
        })

        describe("the behaviour of error handling if input is invalid", () => {

            it("should show error message if input textbox contains invalid characters '0' ", () => {
                const { generateButton, inputTextbox } = renderProg()
                const errorMessage = /^.*Input is invalid. Valid characters are 1-7, b, #, m, and M/i
                userEvent.type(inputTextbox, "15mb70")
                userEvent.click(generateButton)

                expect(screen.getByText(errorMessage)).toBeInTheDocument()

            })

            it("should show error message if input textbox contains invalid characters 'x", () => {
                const { generateButton, inputTextbox } = renderProg()
                const errorMessage = /^.*Input is invalid. Valid characters are 1-7, b, #, m, and M/i
                userEvent.type(inputTextbox, "1x7")
                userEvent.click(generateButton)

                expect(screen.getByText(errorMessage)).toBeInTheDocument()
            })

            it("should show error message if input textbox contains mM or Mm", () => {
                const { generateButton, inputTextbox } = renderProg()
                const errorMessage = /^.*Input is invalid. Valid characters are 1-7, b, #, m, and M/i
                userEvent.type(inputTextbox, "2mM")
                userEvent.click(generateButton)

                expect(screen.getByText(errorMessage)).toBeInTheDocument()

            })

            it("should show error message if input ends with b or #", () => {
                const { generateButton, inputTextbox } = renderProg()
                const errorMessage = /^.*"b" and "#" must come before a number/i
                userEvent.type(inputTextbox, "312b")
                userEvent.click(generateButton)

                expect(screen.getByText(errorMessage)).toBeInTheDocument()
            })

            it("should show error message if input starts with m or M", () => {
                const { generateButton, inputTextbox } = renderProg()
                const errorMessage = /^.*"m" and "M" must come after a number/
                userEvent.type(inputTextbox, "m34M")
                userEvent.click(generateButton)

                expect(screen.getByText(errorMessage)).toBeInTheDocument()
            })
        })
    })

    describe("The Copy to Clipboard button", () => {

        it("should copy the textarea content to clipboard", () => {
            document.execCommand = jest.fn()
            let { copyToClipboardButton } = renderProg()

            userEvent.click(copyToClipboardButton)
            expect(document.execCommand).toBeCalledWith("copy")
        })

        it("should show alert when copy to clipboard is executed", async () => {
            jest.useFakeTimers()
            let { copyToClipboardButton } = renderProg()

            userEvent.click(copyToClipboardButton)

            expect(await screen.findByText(/copied to clipboard.*/i)).toBeInTheDocument()

            await waitFor(() => {
                expect(screen.queryByText(/copied to clipboard.+/i)).not.toBeInTheDocument()
            }, {
                timeout: 4000
            })
        })
    })

    describe("The clear button", () => {

        it("should clear the content inside textarea", () => {
            const { clearButton, textArea, inputTextbox } = renderProg()
            userEvent.type(textArea, "random things to be cleared")
            userEvent.type(inputTextbox, "12345")
            userEvent.click(clearButton)

            expect(textArea).toHaveValue("")
            expect(inputTextbox).toHaveValue("12345")
        })

        it("should remove error message if it is present", () => {
            const { clearButton, generateButton, inputTextbox } = renderProg()
            const errorMessage = /^.*Input is invalid. Valid characters are 1-7, b, #, m, and M/i
            userEvent.type(inputTextbox, "invalid input")
            userEvent.click(generateButton)

            expect(screen.getByText(errorMessage)).toBeInTheDocument()

            userEvent.click(clearButton)

            expect(screen.queryByText(errorMessage)).not.toBeInTheDocument()
        })

    })

})