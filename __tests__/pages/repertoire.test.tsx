import React from "react"
import {render, screen, waitFor} from "@testing-library/react"
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom"
import RepertoirePage from "../../pages/repertoire"
import axios from "../../config/axios";

import { loadUserData } from "../../lib/library";
import useSWR, { cache, SWRConfig } from "swr";
const mockAxios = axios as jest.Mocked<typeof axios>

jest.mock("next/router", () => require("next-router-mock"))
jest.mock("axios")
jest.mock("form-data")
// jest.mock('nookies')
jest.mock('../../lib/library', () => ({
    loadUserData: jest.fn(() => Promise.resolve( {

        songs: [
            { title: "Song 1"},
            { title: "Song 2"},
            { title: "Song 3"},
            { title: "Song 4"},
            { title: "Song 5"},
        ],
        musicians: [],
        genres: [],
        tags: [],
        moods: [],
        languages: []

    }))

}))



function renderRepertoirePage(props =  {}) {
    const defaultProps = {
        user: {id: 1}
    }

    let utils = render(
        <SWRConfig value={{ dedupingInterval: 0, fetcher: (url: string) => axios(url).then(res => res.data)}}>
            <RepertoirePage {...defaultProps} {...props}/>
        </SWRConfig>
    )

    const uploadCsvButton = utils.getByRole("button", { "name": /upload csv/i })

    return {...utils, uploadCsvButton}
}
describe("The Repertoire Page", () => {

    // describe("The CSV Upload function", () => {
    //
    //     it("should open and close the Upload CSV modal", () => {
    //         const { uploadCsvButton } = renderRepertoirePage()
    //         userEvent.click(uploadCsvButton)
    //         expect(screen.getByRole("button", { name: /submit/i})).toBeInTheDocument()
    //         expect(screen.getByText( /click to upload csv/i)).toBeInTheDocument()
    //
    //         const closeIcon = screen.getByText( /close/i)
    //         userEvent.click(closeIcon)
    //         expect(screen.queryByRole("button", { name: /submit/i})).not.toBeInTheDocument()
    //         expect(screen.queryByText( /click to upload csv/i)).not.toBeInTheDocument()
    //
    //     })
    //
    //     describe("The behaviour of the Upload CSV Modal", () => {
    //         const errorMessage = /.*please select a \.csv file before submitting.*/i
    //         const successMessage = /csv uploaded successfully.*/i
    //
    //         interface IBlob extends Blob {
    //             lastModifiedDate?: string,
    //             name?: string
    //         }
    //
    //         it("should show error message if no file is selected", () => {
    //             const { uploadCsvButton } = renderRepertoirePage()
    //
    //
    //             userEvent.click(uploadCsvButton)
    //             const submitButton = screen.getByRole("button", { name: /submit/i})
    //             const closeIcon = screen.getByText( /close/i)
    //
    //             expect(screen.queryByText(errorMessage)).not.toBeInTheDocument()
    //
    //             userEvent.click(submitButton)
    //             expect(screen.getByText(errorMessage)).toBeInTheDocument()
    //
    //             userEvent.click(closeIcon)
    //             userEvent.click(uploadCsvButton)
    //
    //             expect(screen.queryByText(errorMessage)).not.toBeInTheDocument()
    //
    //         })
    //
    //         it("should show the filename if file is selected", async () => {
    //
    //             const { uploadCsvButton } = renderRepertoirePage()
    //
    //             userEvent.click(uploadCsvButton)
    //             const submitButton = screen.getByRole("button", { name: /submit/i})
    //             const uploadArea = screen.getByLabelText(/click to upload csv/i) as HTMLInputElement
    //
    //             let blob : IBlob = new Blob([""], { type: 'text/csv' });
    //             blob["lastModifiedDate"] = "";
    //             blob["name"] = "test.csv";
    //
    //             let csvFile = blob as File;
    //
    //             mockAxios.post.mockResolvedValue({})
    //             userEvent.click(uploadCsvButton)
    //
    //
    //             userEvent.upload(uploadArea, csvFile)
    //
    //             if(uploadArea?.files) {
    //                 expect(uploadArea.files[0]).toStrictEqual(csvFile)
    //             }
    //
    //             expect(screen.getByText("test.csv")).toBeInTheDocument()
    //
    //             userEvent.click(submitButton)
    //
    //             expect(await screen.findByText(successMessage)).toBeInTheDocument()
    //             expect(screen.queryByText("test.csv")).not.toBeInTheDocument()
    //
    //             const closeIcon = screen.getByText( /close/i)
    //             userEvent.click(closeIcon)
    //             userEvent.click(uploadCsvButton)
    //
    //             expect(screen.queryByText("test.csv")).not.toBeInTheDocument()
    //
    //
    //
    //         })
    //
    //         it("should remove files and messages if modal is close without submitting", async () => {
    //
    //             const { uploadCsvButton } = renderRepertoirePage()
    //
    //
    //             userEvent.click(uploadCsvButton)
    //
    //             const uploadArea = screen.getByLabelText(/click to upload csv/i) as HTMLInputElement
    //
    //             let blob : IBlob = new Blob([""], { type: 'text/csv' });
    //             blob["lastModifiedDate"] = "";
    //             blob["name"] = "test.csv";
    //
    //             let csvFile = blob as File;
    //
    //             mockAxios.post.mockResolvedValue({})
    //             userEvent.click(uploadCsvButton)
    //
    //             userEvent.upload(uploadArea, csvFile)
    //
    //             if(uploadArea?.files) {
    //                 expect(uploadArea.files[0]).toStrictEqual(csvFile)
    //             }
    //
    //             const closeIcon = screen.getByText( /close/i)
    //             userEvent.click(closeIcon)
    //             userEvent.click(uploadCsvButton)
    //
    //             expect(screen.queryByText("test.csv")).not.toBeInTheDocument()
    //             expect(screen.queryByText(errorMessage)).not.toBeInTheDocument()
    //             expect(screen.queryByText(successMessage)).not.toBeInTheDocument()
    //
    //             const submitButton = screen.getByRole("button", { name: /submit/i})
    //             userEvent.click(submitButton)
    //
    //             expect(screen.getByText(errorMessage)).toBeInTheDocument()
    //
    //             jest.clearAllMocks()
    //
    //         })
    //
    //         it("should show uploading not successful error if the API call fails", async () => {
    //             mockAxios.post.mockRejectedValue({
    //                 response: {
    //                     error: {
    //                         data: {}
    //                     }
    //                 }
    //             })
    //             const { uploadCsvButton } = renderRepertoirePage()
    //
    //
    //             userEvent.click(uploadCsvButton)
    //
    //             const submitButton = screen.getByRole("button", { name: /submit/i})
    //             const uploadArea = screen.getByLabelText(/click to upload csv/i) as HTMLInputElement
    //
    //             let blob : IBlob = new Blob([""], { type: 'text/csv' });
    //             blob["lastModifiedDate"] = "";
    //             blob["name"] = "test.csv";
    //
    //             let csvFile = blob as File;
    //
    //             userEvent.upload(uploadArea, csvFile)
    //
    //             if(uploadArea?.files) {
    //                 expect(uploadArea.files[0]).toStrictEqual(csvFile)
    //             }
    //
    //             expect(screen.getByText("test.csv")).toBeInTheDocument()
    //
    //
    //             userEvent.click(submitButton)
    //
    //             expect(await screen.findByText(/upload failed. please try again later\./i)).toBeInTheDocument()
    //
    //
    //         })
    //
    //         it("should show error message if user uploaded a file larger than 1MB", () => {
    //
    //         })
    //
    //
    //     })
    //
    //
    // })

    describe("The Delete Selected Song button", () => {
        it("should not be visible if there isn't any checked checkbox", async () => {
            mockAxios.get.mockResolvedValue({
                data: {
                    songs: [
                        { title: "Song 1"},
                        { title: "Song 2"},
                        { title: "Song 3"},
                        { title: "Song 4"},
                        { title: "Song 5"},
                    ]
                }
            })
            renderRepertoirePage()
            expect(screen.queryByRole("button", { name: /delete selected/i })).not.toBeInTheDocument()


            // const allCheckboxes = await screen.findAllByRole("checkbox")



            await waitFor(() => {
                // screen.debug(undefined, 20000)
                expect(screen.getAllByRole("checkbox")).toHaveLength(6)
            })
            // expect(axios.get).toBeCalledTimes(1)


        })
    })

})
