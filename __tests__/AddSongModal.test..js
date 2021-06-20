import KeysDropdown from "../components/KeysDropdown";
import React from "react";
import { screen, render, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AddSongModal from "../components/elements/AddSongModal";
import "@testing-library/jest-dom"
import '@testing-library/jest-dom/extend-expect'
import axios from 'axios'

jest.mock('axios')

function renderAddSongModal(props) {
    const utils = render(
        <AddSongModal
            isModalOpen={true}
            setIsModalOpen={jest.fn()}
            type="add"
            database="database1"
            setSongs={jest.fn()}
            musicians={[{name: "test1"}, {name: "test2"}]}
            setMusicians={jest.fn()}

            {...props}
        />
    )
    const isMinorCheckbox = utils.getByLabelText(/minor/i)
    const keysDropdown = utils.getByLabelText(/key/i)
    const durationTextbox = utils.getByRole("textbox", { name: /duration/i })
    return {...utils, isMinorCheckbox, keysDropdown, durationTextbox}
}

describe("<AddSongModal />", () => {
    it("should render the component", () => {
        const setIsModalOpen = jest.fn()
        const setSongs = jest.fn()
        const setMusicians = jest.fn()
        const getLanguages = jest.fn()
        getLanguages.mockResolvedValue({
            response: {
                data: {
                    languages: []
                }
            }
        })
        render(<AddSongModal isModalOpen={true} setIsModalOpen={setIsModalOpen} type="add" database="database1"
                             setSongs={setSongs} musicians={[{name: "test1"}, {name: "test2"}]}
                             setMusicians={setMusicians}/>)

        expect(screen.getByLabelText(/key/i)).toBeInTheDocument()
        expect(screen.getByLabelText(/artist/i)).toBeInTheDocument()
    })

})

describe("KeysDropdown component's behaviours", () => {
    it("should render the component", () => {
        const { keysDropdown, isMinorCheckbox } = renderAddSongModal()

        expect(keysDropdown).toBeInTheDocument()
        expect(isMinorCheckbox).toBeInTheDocument()

    })


    it("should render the component with song's key if exist and in Edit mode", async () => {

        renderAddSongModal({
            song: {key: 0, mode: 1},
            type: "edit"
        })


        screen.debug(undefined, 12000)
        expect(await screen.findByText("C")).toBeInTheDocument()


        cleanup()

        renderAddSongModal({
            type: "edit",
            song: {key: 11, mode: 0}
        })

        expect(screen.getByDisplayValue("Bm")).toBeInTheDocument()

    })

    it("should toggle the dropdown menu and render key options accordingly", () => {
        const { keysDropdown } = renderAddSongModal()

        expect(keysDropdown).toBeInTheDocument()

        userEvent.click(keysDropdown)

        // use arrow down to simulate opening the dropdown menu via clicking
        userEvent.type(keysDropdown,'{arrowdown}')
        userEvent.click(screen.getByText('C'))

        expect(screen.getByDisplayValue('C')).toBeInTheDocument()

        userEvent.type(keysDropdown,'{arrowdown}')
        // screen.debug(undefined, 10000)
        userEvent.click(screen.getByText('Eb'))
        expect(screen.getByDisplayValue('Eb')).toBeInTheDocument()

    })

    it("should toggle the isMinor checkbox", () => {
        let { keysDropdown, isMinorCheckbox } = renderAddSongModal()

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

    it("should change the selected key to relative major when checkbox is toggled", () => {
        let { isMinorCheckbox } = renderAddSongModal({
            song: {
                key: 1,
                mode: 0
            },
            type: 'edit'
        })

        expect(screen.getByDisplayValue('C#m')).toBeInTheDocument()
        userEvent.click(isMinorCheckbox)

        expect(screen.queryByDisplayValue('C#m')).not.toBeInTheDocument()
        expect(screen.getByDisplayValue('E')).toBeInTheDocument()


    })

    it("should change the selected key to relative minor when checkbox is toggled", () => {
        let { isMinorCheckbox } = renderAddSongModal({
            song: {
                key: 6,
                mode: 1
            },
            type: 'edit'
        })

        expect(screen.getByDisplayValue('Gb')).toBeInTheDocument()
        userEvent.click(isMinorCheckbox)

        expect(screen.queryByDisplayValue('Gb')).not.toBeInTheDocument()
        expect(screen.getByDisplayValue('Ebm')).toBeInTheDocument()
    })
})

describe("The Duration input textbox", () => {
    it("should be empty when the modal is opened in Add mode", () => {
        let { durationTextbox } = renderAddSongModal()

        expect(durationTextbox).toBeInTheDocument()
        expect(durationTextbox.value).toBe("")
    })

    it("should show duration in mm:ss format when the modal is opened in Edit mode", () => {
        let { durationTextbox } = renderAddSongModal({
            song: { durationMs: 184000},
            type: "edit"
        })

        expect(durationTextbox).toBeInTheDocument()
        expect(durationTextbox.value).toBe("3:04")
    })


})








// })