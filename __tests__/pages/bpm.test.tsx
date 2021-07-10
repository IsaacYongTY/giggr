import React from "react"
import userEvent from "@testing-library/user-event";
import {render, screen, waitFor} from "@testing-library/react"
import "@testing-library/jest-dom"
import BpmPage from "../../pages/utilities/bpm";

const defaultTempo = 69
jest.mock("next/router", () => require("next-router-mock"))

function renderBpmPage() {
    const utils = render(<BpmPage />)
    const bpmDisplay = utils.getByText(defaultTempo)
    const tapButton = utils.getByRole("button", { name: /tap/i})
    const toggleDecimalButton = utils.getByRole("button", { name: /toggle decimal/i})
    const resetButton = utils.getByRole("button", { name: /reset/i})
    const countInput = utils.getByRole("spinbutton", {name: /count.*/i})

    return {...utils, tapButton, toggleDecimalButton, bpmDisplay, countInput, resetButton}
}
describe("The bpm page", () => {

    it("should render correctly", () => {
        const { countInput } = renderBpmPage()
        expect(countInput).toBeDisabled()
    })

    it("should increase the count according to the amount of times Tap button tapped", () => {
        const { countInput, tapButton } = renderBpmPage()
        expect(countInput).toHaveValue(0)

        userEvent.click(tapButton)
        userEvent.click(tapButton)

        expect(countInput).toHaveValue(2)
    })

    it("should increase the count according to the amount of times Space is tapped", () => {
        const { countInput, tapButton } = renderBpmPage()
        expect(countInput).toHaveValue(0)

        userEvent.keyboard("{space}")
        userEvent.keyboard("{space}")
        userEvent.keyboard("{space}")

        expect(countInput).toHaveValue(3)
    })

    it("should not change the count if keys other than Space is tapped", () => {
        const { countInput, tapButton } = renderBpmPage()
        expect(countInput).toHaveValue(0)

        userEvent.keyboard("k")
        userEvent.keyboard("{enter}")
        userEvent.keyboard("{esc}")

        expect(countInput).toHaveValue(0)
    })

    it("should not change for the first 2 tap", async() => {
        jest.useFakeTimers()

        const { countInput, tapButton } = renderBpmPage()
        const numberOfTaps = 2
        const tapInterval = 1000

        userEvent.click(tapButton)
        jest.advanceTimersByTime(1000)
        userEvent.click(tapButton)
        jest.advanceTimersByTime(1000)

        // expect(screen.getByText(defaultTempo)).toBeInTheDocument()
        expect(countInput).toHaveValue(2)


    })

    it("should display tempo value 3rd tap onwards", () => {
        jest.useFakeTimers()

        const { countInput, tapButton } = renderBpmPage()

        userEvent.click(tapButton)
        jest.advanceTimersByTime(1000)
        userEvent.click(tapButton)


        expect(countInput).toHaveValue(2)
        jest.advanceTimersByTime(1000)
        userEvent.click(tapButton)


        expect(screen.getByText("60")).toBeInTheDocument()

    })

    it("should reset tempo to default value and count to 0", () => {

        const { countInput, tapButton, resetButton } = renderBpmPage()

        userEvent.click(tapButton)
        userEvent.click(tapButton)
        userEvent.click(tapButton)
        userEvent.click(tapButton)

        expect(countInput).toHaveValue(4)


        userEvent.click(resetButton)

        expect(countInput).toHaveValue(0)
        expect(screen.getByText(defaultTempo)).toBeInTheDocument()

    })

    it("should display correct tempo after Tap button is tapped more than 2 times", () => {
        jest.useFakeTimers()

        const { countInput, tapButton } = renderBpmPage()

        userEvent.click(tapButton)
        jest.advanceTimersByTime(500)
        userEvent.click(tapButton)
        jest.advanceTimersByTime(500)
        userEvent.click(tapButton)
        jest.advanceTimersByTime(500)
        userEvent.click(tapButton)
        jest.advanceTimersByTime(500)

        expect(countInput).toHaveValue(4)
        expect(screen.getByText("120")).toBeInTheDocument()


    })

    it("should display correct tempo after Space bar is pressed more than 2 times", () => {
        jest.useFakeTimers()

        const { countInput, tapButton } = renderBpmPage()

        userEvent.keyboard("{space}")
        jest.advanceTimersByTime(500)
        userEvent.keyboard("{space}")
        jest.advanceTimersByTime(500)
        userEvent.keyboard("{space}")
        jest.advanceTimersByTime(500)
        userEvent.keyboard("{space}")
        jest.advanceTimersByTime(500)

        expect(countInput).toHaveValue(4)
        expect(screen.getByText("120")).toBeInTheDocument()


    })

    it("should reset the count to 0 and default tempo on Tap after idling for 2 seconds", () => {
        jest.useFakeTimers()

        const { countInput, tapButton } = renderBpmPage()

        userEvent.keyboard("{space}")
        jest.advanceTimersByTime(500)
        userEvent.keyboard("{space}")
        jest.advanceTimersByTime(500)
        userEvent.keyboard("{space}")
        jest.advanceTimersByTime(500)
        userEvent.keyboard("{space}")
        jest.advanceTimersByTime(500)

        expect(countInput).toHaveValue(4)
        expect(screen.getByText("120")).toBeInTheDocument()

        jest.advanceTimersByTime(2000)

        userEvent.keyboard("{space}")
        expect(countInput).toHaveValue(0)
        expect(screen.getByText(defaultTempo)).toBeInTheDocument()


    })

    describe("The behaviour of Toggle Decimal button", () => {
        it("should default as without decimal", () => {
            let { tapButton } = renderBpmPage()

            userEvent.click(tapButton)
            jest.advanceTimersByTime(500)
            userEvent.click(tapButton)
            jest.advanceTimersByTime(495)
            userEvent.click(tapButton)
            jest.advanceTimersByTime(500)
            userEvent.click(tapButton)
            jest.advanceTimersByTime(495)
//120.4
            expect(screen.getByText("120")).toBeInTheDocument()

        })

        it("should toggle between decimal and round number when clicked", () => {
            let { tapButton, toggleDecimalButton } = renderBpmPage()

            userEvent.click(tapButton)
            jest.advanceTimersByTime(500)
            userEvent.click(tapButton)
            jest.advanceTimersByTime(495)
            userEvent.click(tapButton)
            jest.advanceTimersByTime(500)
            userEvent.click(tapButton)
            jest.advanceTimersByTime(495)

            userEvent.click(toggleDecimalButton)
            expect(screen.getByText("120.4")).toBeInTheDocument()

            userEvent.click(toggleDecimalButton)
            expect(screen.getByText("120")).toBeInTheDocument()
        })
    })

})