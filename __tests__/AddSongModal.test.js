import React from "react";
import { screen, render, cleanup, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AddSongModal from "../components/elements/AddSongModal";
import "@testing-library/jest-dom"
import '@testing-library/jest-dom/extend-expect'
import axios from 'axios'
import { loadUserRepertoire, loadUserMusicians, loadUserLanguages } from "../lib/library";

jest.mock('axios')
// jest.mock('../lib/library')
// console.log(loadLanguages)
// loadLanguages.mockResolvedValue([
//     { name: "Mandarin", id: 1 },
//     { name: "English", id: 2 }
// ])

let songData = {
    title: "七天",
    artist: "Crowd Lu",
    romTitle: "Qi Tian",
    key: 2,
    mode: 1,
    tempo: 93,
    durationMinSec: "4:00",
    durationMs: 240000,
    time: "4/4",
    initialism: "qt",
    language: "mandarin",
    yearReleased: 2013
}

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
    const genresDropdown = utils.getByLabelText(/genres/i)
    const moodsDropdown = utils.getByLabelText(/moods/i)
    const tagsDropdown = utils.getByLabelText(/tags/i)


    return {...utils, isMinorCheckbox, keysDropdown, durationTextbox, genresDropdown, moodsDropdown, tagsDropdown}
}

describe("<AddSongModal />", () => {
    it("should render the component", () => {

        const getLanguages = jest.fn()
        getLanguages.mockResolvedValue({
            response: {
                data: {
                    languages: []
                }
            }
        })
        renderAddSongModal()

        expect(screen.getByLabelText(/key/i)).toBeInTheDocument()
        expect(screen.getByLabelText(/artist/i)).toBeInTheDocument()
    })

})

describe("KeysDropdown component's behaviours", () => {
    it("should render the component", () => {
        const { keysDropdown, isMinorCheckbox, genresDropdown, moodsDropdown, tagsDropdown } = renderAddSongModal()

        expect(keysDropdown).toBeInTheDocument()
        expect(isMinorCheckbox).toBeInTheDocument()
        expect(genresDropdown).toBeInTheDocument()
        expect(moodsDropdown).toBeInTheDocument()
        expect(tagsDropdown).toBeInTheDocument()

    })


    it("should render the component with song's key if exist and in Edit mode", async () => {


        renderAddSongModal({
            song: {key: 0, mode: 1},
            type: "edit"
        })

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

    it("should toggle the isMinor checkbox when the default is empty", () => {
        let { keysDropdown, isMinorCheckbox } = renderAddSongModal()

        userEvent.click(keysDropdown)
        expect(screen.getByText('C')).toBeInTheDocument()
        expect(screen.getByText('Bb')).toBeInTheDocument()

        screen.debug()
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

    it("should toggle the isMinor checkbox even when key is selected", () => {
        let { keysDropdown, isMinorCheckbox } = renderAddSongModal({
            type: "edit",
            song: { key: 3, mode: 1}
        })

        expect(screen.getByText('Eb')).toBeInTheDocument()

        userEvent.click(keysDropdown)
        expect(screen.getByText('C')).toBeInTheDocument()
        expect(screen.getByText('Bb')).toBeInTheDocument()

        userEvent.click(isMinorCheckbox)
        expect(isMinorCheckbox).toBeChecked()

        expect(screen.getByText('Cm')).toBeInTheDocument()

        userEvent.click(keysDropdown)
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

describe("The Duration input textbox in Add mode", () => {
    it("should be empty when the modal is opened in Add mode", () => {
        let { durationTextbox } = renderAddSongModal()

        expect(durationTextbox).toBeInTheDocument()
        expect(durationTextbox.value).toBe("")
    })

    it("should be show duration in mm:ss format after getting track info from Spotify in Add mode", async () => {
        let { durationTextbox } = renderAddSongModal()

        const searchBar = screen.getByPlaceholderText( "https://open.spotify.com/track/....")
        const getFromSpotifyButton = screen.getByRole("button", { name: /get from spotify/i})


        expect(searchBar).toBeInTheDocument()
        expect(getFromSpotifyButton).toBeInTheDocument()

        axios.post.mockResolvedValue({
            data: {
                result: songData,
                message: "This is a mock resolved value"
            }
        })


        userEvent.type(searchBar, "https://open.spotify.com/track/54kJUsxhDUMJS3kI2XptLl?si=e840d909c0a643c6")
        userEvent.click(getFromSpotifyButton)

        expect(axios.post).toBeCalledTimes(1)
        expect(axios.post).toBeCalledWith('/api/v1/songs/spotify?trackId=54kJUsxhDUMJS3kI2XptLl')

        await waitFor(() => {

            expect(durationTextbox.value).toBe("4:00")
        })


    })


})

describe("The Duration input textbox in Edit mode", () => {


    it("should show duration in mm:ss format when the modal is opened in Edit mode", () => {
        let { durationTextbox } = renderAddSongModal({
            song: { durationMs: 184000},
            type: "edit"
        })

        expect(durationTextbox).toBeInTheDocument()
        expect(durationTextbox).toHaveValue("3:04")
    })


})


