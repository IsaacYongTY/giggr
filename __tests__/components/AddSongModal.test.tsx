import React from "react";
import { screen, render, cleanup, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AddSongModal from "../../components/repertoire/AddSongModal";
import "@testing-library/jest-dom"
import '@testing-library/jest-dom/extend-expect'
import axios from 'axios'
import Song from "../../lib/types/song";

jest.mock('axios')

const mockAxios = axios as jest.Mocked<typeof axios>

let songData : Song= {
    id:5,
    title: "七天",
    artist: {
        id: 1,
        name: "Crowd Lu",
        romName: "",
        spotifyName: ""
    },
    artistId: 1,
    romTitle: "Qi Tian",
    key: 2,
    mode: 1,
    tempo: 93,
    durationMs: 240000,
    timeSignature: "4/4",
    initialism: "qt",
    language: {
        id: 1,
        name: "mandarin",
    },
    languageId: 1,
    dateReleased: "2013-01-01",
    spotifyLink: "",
    youtubeLink: "",
    otherLink: "",

    acousticness: 0,
    valence: 0,
    instrumentalness: 0,
    danceability: 0,
    energy: 0,

    verified: false,
    composers: [],
    songwriters: [],
    arrangers: [],
    genres: [],
    moods: [],
    tags: []
}

let mockUser = { tierId: 2, name: "Isaac", tokenString: "faketokenstring" }
let mockAdmin = { tierId: 4, name: "Admin", tokenString: "faketokenstring" }


function renderAddSongModal(props = {}) {
    const utils = render(
        <AddSongModal
            isModalOpen={true}
            setIsModalOpen={jest.fn()}
            type="add"
            database="database1"
            setSongs={jest.fn()}
            musicians={[{name: "test1", romName: "", spotifyName: ""}, {name: "test2", romName: "", spotifyName: ""}]}
            setMusicians={jest.fn()}
            user={mockUser}
            data={{
                songs: [],
                genres: [],
                musicians:[],
                tags: [],
                moods: [],
                languages: []
            }}

            {...props}
        />
    )
    const isMinorCheckbox = utils.getByRole("checkbox", { name: /minor/i })
    const keysDropdown = utils.getByLabelText(/key/i)
    const durationTextbox = utils.getByRole("textbox", { name: /duration/i })
    const genresDropdown = utils.getByLabelText(/genres/i)
    const moodsDropdown = utils.getByLabelText(/moods/i)
    const tagsDropdown = utils.getByLabelText(/tags/i)
    const generateMetaDataTab = utils.getByText(/generate metadata.*/i)



    return {...utils, isMinorCheckbox, keysDropdown, durationTextbox, genresDropdown,
        moodsDropdown, tagsDropdown, generateMetaDataTab
    }
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
            expect(durationTextbox).toHaveValue("")
        })

        it("should be show duration in mm:ss format after getting track info from Spotify in Add mode", async () => {
            let { durationTextbox } = renderAddSongModal()

            const searchBar = screen.getByPlaceholderText( "https://open.spotify.com/track/....")
            const getFromSpotifyButton = screen.getByRole("button", { name: /get from spotify/i})


            expect(searchBar).toBeInTheDocument()
            expect(getFromSpotifyButton).toBeInTheDocument()

            mockAxios.post.mockResolvedValue({
                data: {
                    result: {
                        title: "七天",
                        artist: "Crowd Lu",
                        romTitle: "Qi Tian",
                        key: 2,
                        mode: 1,
                        tempo: 93,
                        durationMs: 240000,
                        timeSignature: "4/4",
                        initialism: "qt",
                        language: "mandarin",
                        dateReleased: "2013-01-01"
                    },
                    message: "This is a mock resolved value"
                }
            })


            userEvent.type(searchBar, "https://open.spotify.com/track/54kJUsxhDUMJS3kI2XptLl?si=e840d909c0a643c6")
            userEvent.click(getFromSpotifyButton)



            await waitFor(() => {
                expect(axios.post).toBeCalledTimes(1)
                expect(axios.post).toBeCalledWith('/api/v1/songs/spotify?trackId=54kJUsxhDUMJS3kI2XptLl', {}, {headers: {"x-auth-token": "Bearer faketokenstring"}, withCredentials: true})
                expect(durationTextbox).toHaveValue("4:00")
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

    describe("The behaviour of form if Get From Spotify button is clicked", () => {
        it("should render the key of the song in KeysDropdown", async () => {
            const { keysDropdown } = renderAddSongModal({
                type: "add"

            })

            const getFromSpotifyButton = screen.getByRole("button", { name: /get from spotify/i })
            const spotifySearchBar = screen.getByPlaceholderText(/^https:\/\/open.spotify.com.+/i)

            const validSpotifyUrl = "https://open.spotify.com/track/54kJUsxhDUMJS3kI2XptLl"

            mockAxios.post.mockResolvedValue({
                data: {
                    result: {
                        title: "七天",
                        artist: "Crowd Lu",
                        romTitle: "Qi Tian",
                        key: 2,
                        mode: 1,
                        tempo: 93,
                        durationMs: 240000,
                        timeSignature: "4/4",
                        initialism: "qt",
                        language: "mandarin",
                        dateReleased: "2013-01-01"
                    },
                }
            })

            userEvent.type(spotifySearchBar, validSpotifyUrl)
            userEvent.click(getFromSpotifyButton)


            expect(await screen.findByText("D")).toBeInTheDocument()


        })
    })

    describe("The view of Add Song Modal in Add Mode", () => {
        it.todo("should be empty every time it's opened after submitting once")
    })

    describe("The behaviour of Generate Metadata button",  () => {

        it("should display the metadata head", async () => {
            let {generateMetaDataTab} = renderAddSongModal({
                type: "edit",

                song: {
                    title: "我爱你",
                    artist: {
                        id: 1,
                        name: "Crowd Lu",
                        romName: "",
                        spotifyName: ""
                    },
                    romTitle: "Wo Ai Ni",
                    key: 11,
                    mode: 0,
                    tempo: 93,
                    durationMs: 285000,
                    timeSignature: "4/4",
                    initialism: "wan",
                    language: {
                        id: 1,
                        name: "mandarin",
                    },
                    dateReleased: "2008-01-01"
                }
            })
            // const searchBar = screen.getByPlaceholderText(/^https:\/\/open.spotify.com.*/)
            // const getFromSpotifyButton = screen.getByRole("button", { name: /get from spotify.*/i })
            //
            // mockAxios.post.mockResolvedValue({
            //     data: {
            //         result: songData
            //     }
            // })
            // userEvent.type(searchBar, "https://open.spotify.com/track/6CKLOHuoNU6hfAxlQVzRlL?si=df60f78eef2240e3")
            // userEvent.click(getFromSpotifyButton)
            //

            userEvent.click(generateMetaDataTab)

            expect(screen.getByText(/Wo Ai 我爱你/i)).toBeInTheDocument()
            expect(screen.getByText(/Crowd Lu/i)).toBeInTheDocument()
            expect(screen.getByText(/Key: Bm/i)).toBeInTheDocument()
            expect(screen.getByText(/Tempo: 93/i)).toBeInTheDocument()
            expect(screen.getByText(/Duration: 4:45/i)).toBeInTheDocument()
            expect(screen.getByText(/Time: 4\/4/i)).toBeInTheDocument()
            expect(screen.getByText(/Keywords: wan, mandarin/i)).toBeInTheDocument()
            expect(screen.getByText(/Year Released: 2008/i)).toBeInTheDocument()

        })

    })
})




