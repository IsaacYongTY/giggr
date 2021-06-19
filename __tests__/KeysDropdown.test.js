import KeysDropdown from "../components/KeysDropdown";
import React, {useState} from "react";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AddSongModal from "../components/elements/AddSongModal";
import "@testing-library/jest-dom"
import '@testing-library/jest-dom/extend-expect'
import axios from 'axios'

jest.mock('axios')

axios.get.mockResolvedValue({
    response: {
        data: {
            languages: []
        }
    }
})

describe("The behaviour of key dropdowns <KeysDropdown />", () => {

    function renderKeysDropdown(props) {

        const setFormValue = jest.fn()
        const utils = render(<KeysDropdown formValue={{}} setFormValue={setFormValue} {...props} />)
        const isMinorCheckbox = utils.getByRole("checkbox")
        const keysDropdown = utils.getByRole("textbox")
        return {...utils, isMinorCheckbox, keysDropdown}
    }


    it("should render the component", () => {
        const { keysDropdown, isMinorCheckbox } = renderKeysDropdown()

        expect(keysDropdown).toBeInTheDocument()
        expect(isMinorCheckbox).toBeInTheDocument()

    })

    // it("should render the component with song's key if exist", () => {
    //
    //     let { rerender } = renderKeysDropdown({
    //         formValue: {
    //             key: 0,
    //             mode: 1
    //         }
    //     })
    //
    //     expect(screen.getByDisplayValue("C")).toBeInTheDocument()
    //
    //    rerender(
    //        <KeysDropdown
    //            formValue={{
    //                 key: 11,
    //                 mode: 0
    //             }}
    //            setFormValue={jest.fn()}
    //        />
    //    )
    //
    //     expect(screen.getByDisplayValue("Bm")).toBeInTheDocument()
    //
    // })
    //
    // it("should toggle the dropdown menu and render key options accordingly", () => {
    //     const { keysDropdown } = renderKeysDropdown()
    //
    //     expect(keysDropdown).toBeInTheDocument()
    //
    //     userEvent.click(keysDropdown)
    //
    //     // use arrow down to simulate opening the dropdown menu via clicking
    //     userEvent.type(keysDropdown,'{arrowdown}')
    //     userEvent.click(screen.getByText('C'))
    //
    //     expect(screen.getByDisplayValue('C')).toBeInTheDocument()
    //
    //     userEvent.type(keysDropdown,'{arrowdown}')
    //     // screen.debug(undefined, 10000)
    //     userEvent.click(screen.getByText('Eb'))
    //     expect(screen.getByDisplayValue('Eb')).toBeInTheDocument()
    //
    // })

    // it("should toggle the isMinor checkbox", () => {
    //     const isMinorCheckbox = screen.getByRole("checkbox")
    //     const keysDropdown = screen.getByRole("textbox")
    //
    //     userEvent.click(keysDropdown)
    //     expect(screen.getByText('C')).toBeInTheDocument()
    //     expect(screen.getByText('Bb')).toBeInTheDocument()
    //
    //     userEvent.click(isMinorCheckbox)
    //     expect(isMinorCheckbox).toBeChecked()
    //
    //     userEvent.click(keysDropdown)
    //     expect(screen.getByText('Cm')).toBeInTheDocument()
    //     expect(screen.getByText('Gm')).toBeInTheDocument()
    //     expect(screen.getByText('Am')).toBeInTheDocument()
    //     //use query only if the element cannot be found
    //     expect(screen.queryByText('C')).not.toBeInTheDocument()
    //     expect(screen.queryByText('G')).not.toBeInTheDocument()
    //
    //     userEvent.click(isMinorCheckbox)
    //     userEvent.click(keysDropdown)
    //
    //     expect(isMinorCheckbox).not.toBeChecked()
    //     expect(screen.getByText('A')).toBeInTheDocument()
    //     expect(screen.getByText('D')).toBeInTheDocument()
    //     expect(screen.queryByText('Cm')).not.toBeInTheDocument()
    //     expect(screen.queryByText('Gm')).not.toBeInTheDocument()
    // })
})