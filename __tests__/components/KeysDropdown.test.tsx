import KeysDropdown from "../../components/repertoire/KeysDropdown";
import React, {Dispatch, SetStateAction} from "react";
import { screen, render, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom"
import '@testing-library/jest-dom/extend-expect'
import Form from "../../lib/types/Form";

interface Props {
    form: Form,
    setForm: Dispatch<SetStateAction<Form>>
}

describe("The behaviour of key dropdowns <KeysDropdown />", () => {
    it.todo("problem with this")
    function renderKeysDropdown(props = {}) {


        const defaultProps : Props = {
            form: {},
            setForm: jest.fn()
        }

        const utils = render(<KeysDropdown {...defaultProps} {...props} />)
        const isMinorCheckbox = utils.getByRole("checkbox")
        const keysDropdown = utils.getByLabelText(/key/i)
        return {...utils, isMinorCheckbox, keysDropdown}
    }


    it("should render the component", () => {
        const { keysDropdown, isMinorCheckbox } = renderKeysDropdown()

        expect(keysDropdown).toBeInTheDocument()
        expect(isMinorCheckbox).toBeInTheDocument()

    })

    it("should render the component with song's key if exist", async () => {

        renderKeysDropdown({
            form: {
                key: 0,
                mode: 1
            },
            setForm: jest.fn()
        })

        expect(screen.getByDisplayValue("C")).toBeInTheDocument()

        cleanup()

        renderKeysDropdown({
            form: {
                key: 11,
                mode: 0
            },
            setForm: jest.fn()
        })

        expect(screen.getByDisplayValue("Bm")).toBeInTheDocument()

    })

    it("should toggle the dropdown menu and render key options accordingly", () => {
        const { keysDropdown, rerender } = renderKeysDropdown()

        expect(keysDropdown).toBeInTheDocument()

        userEvent.click(keysDropdown)

        userEvent.click(screen.getByText('C'))

        rerender(<KeysDropdown
            form={{
                key: 0,
                mode: 1,
            }}
            setForm={jest.fn()}
        />)

        expect(screen.getByText('C')).toBeInTheDocument()

        userEvent.click(keysDropdown)
        userEvent.click(screen.getByText('Eb'))

        rerender(<KeysDropdown
            form={{
                key: 3,
                mode: 1,
            }}
            setForm={jest.fn()}
        />)

        expect(screen.getByText('Eb')).toBeInTheDocument()

    })

    it("should toggle the isMinor checkbox", () => {
        const { isMinorCheckbox, keysDropdown } = renderKeysDropdown()

        userEvent.click(keysDropdown)
        expect(screen.getByText('C')).toBeInTheDocument()
        expect(screen.getByText('Bb')).toBeInTheDocument()

        userEvent.click(isMinorCheckbox)
        expect(isMinorCheckbox).toBeChecked()

        userEvent.click(keysDropdown)
        expect(screen.getByText('Cm')).toBeInTheDocument()
        expect(screen.getByText('Gm')).toBeInTheDocument()
        expect(screen.getByText('Am')).toBeInTheDocument()
        //use query only if the element cannot be found
        expect(screen.queryByText('C')).not.toBeInTheDocument()
        expect(screen.queryByText('G')).not.toBeInTheDocument()

        userEvent.click(isMinorCheckbox)
        userEvent.click(keysDropdown)

        expect(isMinorCheckbox).not.toBeChecked()
        expect(screen.getByText('A')).toBeInTheDocument()
        expect(screen.getByText('D')).toBeInTheDocument()
        expect(screen.queryByText('Cm')).not.toBeInTheDocument()
        expect(screen.queryByText('Gm')).not.toBeInTheDocument()
    })
})