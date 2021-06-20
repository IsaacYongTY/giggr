import MetaTool from "../pages/utilities/metatool"
import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom"
jest.mock("next/router", () => require('next-router-mock'))


const user = { tierId: 4, name: "Isaac" }
const defaultPinyinSyllables = 2

const renderMetaTool = (props) => {
    const utils = render(<MetaTool user={user} {...props} />)

    const getFromSpotifyButton = utils.getByRole("button", { name: /get from spotify/i })
    const copyToClipboardButton = utils.getByRole("button", { name: /copy to clipboard/i })
    const showPinyinCheckbox = utils.getByRole("checkbox", { name: /pinyin/i})
    const searchBar = utils.getByPlaceholderText("https://open.spotify.com/track/....")
    const pinyinDropdown = utils.getByDisplayValue(defaultPinyinSyllables)
    return {...utils, getFromSpotifyButton, copyToClipboardButton, showPinyinCheckbox, pinyinDropdown, searchBar}
}

describe("The metatool page", () => {

    it("should render correctly", () => {
        let { getFromSpotifyButton, copyToClipboardButton, showPinyinCheckbox, pinyinDropdown, searchBar } = renderMetaTool()

        expect(searchBar).toBeInTheDocument()
        expect(getFromSpotifyButton).toBeInTheDocument()
        expect(copyToClipboardButton).toBeInTheDocument()
        // expect(showPinyinCheckbox).toBeInTheDocument()
        // expect(pinyinDropdown).toBeInTheDocument()
    })


})

// describe("The pinyin toggle", () => {
//     it("should toggle check when clicked", () => {
//         let { showPinyinCheckbox } = renderMetaTool()
//
//         userEvent.click(showPinyinCheckbox)
//         expect(showPinyinCheckbox).toBeChecked()
//
//         userEvent.click(showPinyinCheckbox)
//         expect(showPinyinCheckbox).not.toBeChecked()
//
//     })
// })
//
// describe("The pinyin dropdown", () => {
//     it("should open dropdown menu when clicked", () => {
//         let { pinyinDropdown } = renderMetaTool()
//
//         let option1 = screen.getByText(/1/)
//         let option2 = screen.getByText(/all/i)
//         expect(option1).toBeInTheDocument()
//         expect(option2).toBeInTheDocument()
//
//         userEvent.click(option1)
//         expect(pinyinDropdown.value).toBe("1")
//
//         userEvent.click(pinyinDropdown)
//         userEvent.click(option2)
//         expect(pinyinDropdown.value).toBe(/all/i)
//
//
//     })
// })