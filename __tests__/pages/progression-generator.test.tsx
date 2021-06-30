import React from "react";
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import "@testing-library/jest-dom"
import ProgGenerator from "../../pages/utilities/progression"

const renderProg = (props) => {
    const utils = render(<ProgGenerator />)
    const generateButton = utils.getByRole("button", { name: /generate/i })
    const clearButton = utils.getByRole("button", { name: /clear/i })
    const inputTextbox = utils.getByRole("textbox", { name: /input/i })
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
        it.todo("should render correct result according to key, progression and spacing given")
        it.todo("should return an error message if any one of key, progression and spacing is missing")
    })

    describe("The Copy to Clipboard button", () => {
        it.todo("should copy the textarea content to clipboard")
        it.todo("should show alert when copy to clipboard is executed")
    })

    describe("The clear button", () => {

        it("should clear the content inside textarea", () => {
            let { clearButton, textArea } = renderProg()
            userEvent.type(textArea, "random things to be cleared")
            userEvent.click(clearButton)
            expect(textArea).toHaveValue("")
        })
    })

})