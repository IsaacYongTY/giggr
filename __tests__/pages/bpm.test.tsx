import React from "react"
import userEvent from "@testing-library/user-event";
import {render, screen, waitFor} from "@testing-library/react"
import "@testing-library/jest-dom"
import BpmPage from "../../pages/utilities/bpm";
const defaultTempo = 69

jest.mock("next/router", () => require("next-router-mock"))

function renderBpmPage() {
    const defaultProps = {
        user: {
            id: 1,
            firstName: "Isaac",
            tierId: 4
        }
    }
    const utils = render(<BpmPage {...defaultProps} />)
    const bpmDisplay = utils.getByText(defaultTempo)
    const tapButton = utils.getByRole("button", { name: /tap tempo/i})
    const setTempoButton = utils.getByRole("button", { name: /set tempo/i})
    const tempoInput = utils.getByLabelText(/input.*/i)
    const toggleDecimalButton = utils.getByRole("button", { name: /toggle decimal/i})
    const resetButton = utils.getByRole("button", { name: /reset/i})
    const countInput = utils.getByRole("spinbutton", {name: /count.*/i})

    return {...utils, tapButton, setTempoButton, tempoInput, toggleDecimalButton, bpmDisplay, countInput, resetButton}
}

describe("The bpm page", () => {

    let errorMessage = /please enter tempo of range 40 - 200/i

    beforeEach(() => {
        jest.useFakeTimers()
    })

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


        const { countInput, tapButton } = renderBpmPage()

        userEvent.click(tapButton)
        jest.advanceTimersByTime(1000)
        userEvent.click(tapButton)
        jest.advanceTimersByTime(1000)

        // expect(screen.getByText(defaultTempo)).toBeInTheDocument()
        expect(countInput).toHaveValue(2)


    })

    it("should display tempo value 3rd tap onwards", () => {

        const { countInput, tapButton } = renderBpmPage()

        userEvent.click(tapButton)
        jest.advanceTimersByTime(1000)
        userEvent.click(tapButton)


        expect(countInput).toHaveValue(2)
        jest.advanceTimersByTime(1000)
        userEvent.click(tapButton)


        expect(screen.getByText("60")).toBeInTheDocument()

    })

    describe("The reset button", () => {
        it("should hide error message if there is one", () => {
            const { setTempoButton, resetButton } = renderBpmPage()

            userEvent.click(setTempoButton)

            userEvent.click(resetButton)
            expect(screen.queryByText(errorMessage)).not.toBeInTheDocument()
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
    })


    it("should display correct tempo after Tap button is tapped more than 2 times", () => {

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

    describe("The behaviour of Tap to play", () => {
        it("should render text correctly", () => {
             renderBpmPage()
            userEvent.click(screen.getByRole("button", { name: /tap to play/i }))
            expect(screen.getByText(/tap to stop/i)).toBeInTheDocument()

            userEvent.click(screen.getByText(/tap to stop/i))
            expect(screen.getByText(/tap to play/i)).toBeInTheDocument()
        })

        it.todo("should play sound at interval when Play button is pressed")
    })

    describe("The behaviour of Set Tempo Button", () => {

        it("should render correctly", () => {
            const { tempoInput } = renderBpmPage()

            expect(tempoInput).toHaveValue("")
        })

        it("should set the tempo to Tempo Display", () => {
            const { setTempoButton, tempoInput } = renderBpmPage()

            userEvent.type(tempoInput, "120")
            expect(tempoInput).toHaveValue("120")

            userEvent.click(setTempoButton)
            expect(tempoInput).toHaveValue("")
            expect(screen.queryByText(defaultTempo)).not.toBeInTheDocument()
            expect(screen.getByText("120")).toBeInTheDocument()
        })

        it("should show error message if input is empty", () => {
            const { setTempoButton } = renderBpmPage()


            expect(screen.queryByText(errorMessage)).not.toBeInTheDocument()
            userEvent.click(setTempoButton)
            expect(screen.getByText(errorMessage)).toBeInTheDocument()
            expect(screen.getByText(defaultTempo)).toBeInTheDocument()

        })

        it("should clear error message if input is valid", () => {
            const { setTempoButton, tempoInput } = renderBpmPage()

            userEvent.click(setTempoButton)

            userEvent.type(tempoInput, "120")
            userEvent.click(setTempoButton)

            expect(screen.getByText("120")).toBeInTheDocument()
            expect(screen.queryByText(errorMessage)).not.toBeInTheDocument()

        })

        it("should set user tempo when 'Enter' key is pressed", () => {
            const { tempoInput } = renderBpmPage()

            userEvent.keyboard("{enter}")
            expect(screen.getByText(errorMessage)).toBeInTheDocument()

            userEvent.type(tempoInput, "120")
            userEvent.keyboard("{enter}")

            expect(screen.getByText("120")).toBeInTheDocument()
        })


        it("should stay with the previous value for the first two beats when tempo is set manually", () => {
            const { tapButton, tempoInput, setTempoButton } = renderBpmPage()
            userEvent.type(tempoInput, "79")
            userEvent.click(setTempoButton)

            expect(screen.getByText("79")).toBeInTheDocument()
            jest.advanceTimersByTime(2500)

            userEvent.click(tapButton)
            expect(screen.getByText("79")).toBeInTheDocument()

        })
    })

    describe("The behaviour of the metronome upon resetting after idle time", () => {
        it("should stay with the previous value for the first two beats when idle time is more than 2s", () => {
            const { tapButton, countInput,  tempoInput, setTempoButton } = renderBpmPage()

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

            jest.advanceTimersByTime(2500)

            userEvent.keyboard("{space}")
            jest.advanceTimersByTime(1000)
            expect(countInput).toHaveValue(1)
            expect(screen.getByText("120")).toBeInTheDocument()

            userEvent.keyboard("{space}")
            jest.advanceTimersByTime(1000)
            expect(screen.getByText("120")).toBeInTheDocument()

            userEvent.keyboard("{space}")
            jest.advanceTimersByTime(1000)
            expect(screen.getByText("60")).toBeInTheDocument()

        })
    })

})