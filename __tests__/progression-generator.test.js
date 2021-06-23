import React from "react";
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import "@testing-library/jest-dom"
import ProgGenerator from "../pages/utilities/progression"

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
        spacesTextbox: spacesDropdown
    }
}

let user = { tierId: 4, name: "Isaac"}

jest.mock("next/router", () => require("next-router-mock"))

describe("The progression generator page", () => {
    describe("The elements on page", () => {
        it("should render elements on the page", () => {
            let { generateButton, inputTextbox } = renderProg()
            expect(generateButton).toBeInTheDocument()
            expect(inputTextbox).toBeInTheDocument()
        })
    })

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

            expect(commonProgDropdown).toBeInTheDocument()
            userEvent.click(commonProgDropdown)

            expect(screen.getByText(/^(canon).+/i)).toBeInTheDocument()
            userEvent.click(screen.getByText(/typical ballad progression.+/i))

            expect(screen.getByText(/typical ballad progression.+/i)).toBeInTheDocument()
            expect(inputTextbox).toHaveValue("45362511")

        })

    })

    describe("The input textbox", () => {
        it("should render correctly", () => {

            let { inputTextbox } = renderProg()
            expect(inputTextbox).toBeInTheDocument()

        })

        it.todo("should not accept inputs if they're not 1-7, m, M, b, and #")
    })

    describe("The radio buttons for full bar and half bar", () => {
        it("should render correctly", () => {
            let { fullBarRadio, halfBarRadio } = renderProg()
            expect(fullBarRadio).toBeInTheDocument()
            expect(halfBarRadio).toBeInTheDocument()
        })

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
            let defaultSpacing = 12
            let { spacesTextbox } = renderProg()
            expect(spacesTextbox).toBeInTheDocument()
            expect(screen.getByText(defaultSpacing)).toBeInTheDocument()
        })

        it("should change value when number is input",() => {
            let { spacesTextbox } = renderProg()
            userEvent.click(spacesTextbox)
            expect(screen.getByText("8")).toBeInTheDocument()
            expect(screen.getByText("14")).toBeInTheDocument()

            userEvent.click(screen.getByText("10"))
            expect(screen.getByText("10")).toBeInTheDocument()
        })
    })

    describe("The result textarea", () => {
        it.todo("should render correctly")
        it.todo("should be empty at the beginning")
        it.todo("should render correct result according to key, progression and spacing given")
        it.todo("should return an error message if any one of key, progression and spacing is missing")
    })

    describe("The Copy to Clipboard button", () => {
        it.todo("should render correctly")
        it.todo("should copy the textarea content to clipboard")
        it.todo("should show alert when copy to clipboard is executed")
    })
    describe("The clear button", () => {
        it("should render correctly", () => {
            let { clearButton } = renderProg()
            expect(clearButton).toBeInTheDocument()
        })
        it.todo("should clear the content inside textarea")
    })

})