import React from "react"
import {fireEvent, render, screen, waitFor} from "@testing-library/react"
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom"
import RepertoirePage from "../../pages/repertoire"
import axios from "axios";
import router from "next/router"
import {upload} from "@testing-library/user-event/dist/upload";
jest.mock("next/router", () => require("next-router-mock"))
jest.mock("axios")


jest.mock("form-data")
jest.mock('nookies')
const mockAxios = axios as jest.Mocked<typeof axios>

function renderRepertoirePage(props =  {}) {
    const defaultProps = {
        initialSongs: [],
        initialData: {
            songs: [],
            musicians: [],
            genres: [],
            tags: [],
            moods: [],
            languages: []
        },
        user: {id: 1}

    }

    let utils = render(<RepertoirePage {...defaultProps} {...props} />)
    const uploadCsvButton = utils.getByRole("button", { "name": /upload csv/i })

    return {...utils, uploadCsvButton}
}
describe("The Repertoire Page", () => {

    describe("The CSV Upload function", () => {
        it("should open and close the Upload CSV modal", () => {
            const { uploadCsvButton } = renderRepertoirePage()
            userEvent.click(uploadCsvButton)
            expect(screen.getByRole("button", { name: /submit/i})).toBeInTheDocument()
            expect(screen.getByText( /click to upload csv/i)).toBeInTheDocument()

            const closeIcon = screen.getByText( /close/i)
            userEvent.click(closeIcon)
            expect(screen.queryByRole("button", { name: /submit/i})).not.toBeInTheDocument()
            expect(screen.queryByText( /click to upload csv/i)).not.toBeInTheDocument()

        })

        describe("The behaviour of the Upload CSV Modal", () => {


            it("should show error message if no file is selected", () => {
                const { uploadCsvButton } = renderRepertoirePage()
                const errorMessage = /please select a \.csv file before submitting/i

                userEvent.click(uploadCsvButton)
                const submitButton = screen.getByRole("button", { name: /submit/i})
                const closeIcon = screen.getByText( /close/i)

                expect(screen.queryByText(errorMessage)).not.toBeInTheDocument()

                userEvent.click(submitButton)
                expect(screen.getByText(errorMessage)).toBeInTheDocument()

                userEvent.click(closeIcon)
                userEvent.click(uploadCsvButton)

                expect(screen.queryByText(errorMessage)).not.toBeInTheDocument()

            })

            it("should show the filename if file is selected", async () => {

                const { uploadCsvButton } = renderRepertoirePage()

                userEvent.click(uploadCsvButton)
                const submitButton = screen.getByRole("button", { name: /submit/i})
                const uploadArea = screen.getByLabelText(/click to upload csv/i) as HTMLInputElement

                interface IBlob extends Blob {
                    lastModifiedDate?: string,
                    name?: string
                }

                let blob : IBlob = new Blob([""], { type: 'text/csv' });
                blob["lastModifiedDate"] = "";
                blob["name"] = "test.csv";

                let csvFile = blob as File;

                mockAxios.post.mockResolvedValueOnce({})
                userEvent.click(uploadCsvButton)


                userEvent.upload(uploadArea, csvFile)

                if(uploadArea?.files) {
                    expect(uploadArea.files[0]).toStrictEqual(csvFile)
                }

                expect(screen.getByText("test.csv")).toBeInTheDocument()

                userEvent.click(submitButton)
                const successMessage = /csv uploaded successfully.*/i
                expect(await screen.findByText(successMessage)).toBeInTheDocument()
                expect(screen.queryByText("test.csv")).not.toBeInTheDocument()

                const closeIcon = screen.getByText( /close/i)
                userEvent.click(closeIcon)
                userEvent.click(uploadCsvButton)

                expect(screen.queryByText("test.csv")).not.toBeInTheDocument()



            })

            it("should remove any file if modal is close without submitting", async () => {

                const { uploadCsvButton } = renderRepertoirePage()
                const errorMessage = /.*please select a \.csv file before submitting.*/i

                userEvent.click(uploadCsvButton)

                const uploadArea = screen.getByLabelText(/click to upload csv/i) as HTMLInputElement

                interface IBlob extends Blob {
                    lastModifiedDate?: string,
                    name?: string
                }

                let blob : IBlob = new Blob([""], { type: 'text/csv' });
                blob["lastModifiedDate"] = "";
                blob["name"] = "test.csv";

                let csvFile = blob as File;

                mockAxios.post.mockResolvedValueOnce({})
                userEvent.click(uploadCsvButton)

                userEvent.upload(uploadArea, csvFile)

                if(uploadArea?.files) {
                    expect(uploadArea.files[0]).toStrictEqual(csvFile)
                }

                const closeIcon = screen.getByText( /close/i)
                userEvent.click(closeIcon)
                userEvent.click(uploadCsvButton)

                const submitButton = screen.getByRole("button", { name: /submit/i})
                expect(screen.queryByText("test.csv")).not.toBeInTheDocument()
                userEvent.click(submitButton)

                expect(screen.getByText(errorMessage)).toBeInTheDocument()




            })

        })


    })

})
