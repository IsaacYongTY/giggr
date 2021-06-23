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
    return { ...utils, generateButton, clearButton, inputTextbox, keysDropdown, commonProgDropdown, textArea, fullBarRadio, halfBarRadio }
}

let user = { tierId: 4, name: "Isaac"}

jest.mock("next/router", () => require("next-router-mock"))

describe("The progression generator page", () => {
    describe("The elements on page", () => {
        it("should render elements on the page", () => {
            let { generateButton, clearButton, inputTextbox } = renderProg()

            expect(generateButton).toBeInTheDocument()
            expect(clearButton).toBeInTheDocument()
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

})