import React from "react";
import { render, screen, waitFor} from "@testing-library/react"
import userEvent from "@testing-library/user-event";
import axios from "axios";

import LoginPage from "../../pages/accounts/login"

import '@testing-library/jest-dom/extend-expect'
import router from "next/router"

jest.mock('next/router', () => require('next-router-mock'))
jest.mock('axios')

describe("The login page", () => {
    let loginButton, emailInput, passwordInput;

    beforeEach(() => {
        render(<LoginPage />)
        loginButton = screen.getByRole('button', {name: /log in/i })
        emailInput = screen.getByPlaceholderText("Email")
        passwordInput = screen.getByPlaceholderText("Password")
    })


    it("should mount correctly", () => {
        expect(screen.getByPlaceholderText("Email")).toBeInTheDocument()
        expect(screen.getByPlaceholderText("Password")).toBeInTheDocument()
    })


    it("should make a call to /api/v1/auth/login", async () => {
        const input = { email: "correct_@gmail.com", password: "correct_password"}

        userEvent.type(emailInput, input.email)
        userEvent.type(passwordInput, input.password)
        userEvent.click(loginButton)

        await waitFor(async() => {
            expect(axios.post).toBeCalled()
            expect(axios.post).toHaveBeenCalledWith(`/api/v1/auth/login`, { "email": `${input.email}`, "password": `${input.password}`}, {withCredentials: true})
        })
    })


    it("should render dashboard if username and password is correct",async () => {

        const input = { email: "correct_@gmail.com", password: "correct_password"}

        userEvent.type(emailInput, input.email)
        userEvent.type(passwordInput, input.password)
        userEvent.click(loginButton)

        axios.post.mockResolvedValueOnce()
        await waitFor(async () => {


            expect(router.pathname).toBe('/repertoire')

        })
    })


    it("should show error message if no username or password is provided", async () => {

        expect(loginButton).toBeInTheDocument()
        userEvent.click(loginButton)

        axios.post.mockRejectedValueOnce()

        await waitFor(() => {
            expect(screen.getByText(/please provide email/i)).toBeInTheDocument()
            expect(screen.getByText(/please provide password/i)).toBeInTheDocument()
        })

        axios.post.mockRejectedValueOnce()
        userEvent.type(emailInput, 'something@gmail.com')
        userEvent.type(passwordInput, 'wrongpassword')
        userEvent.click(loginButton)

        await waitFor(() => {
            expect(screen.getByText(/invalid email or password\. please try again\./i)).toBeInTheDocument()
        })
    })

    it("should prompt invalid email or password", async () => {
        userEvent.type(emailInput, 'wrongusername@gmail.com')
        userEvent.type(passwordInput, 'wrongpassword')
        userEvent.click(loginButton)

        axios.post.mockRejectedValueOnce()
        await waitFor(() => {
            expect(screen.getByText(/invalid email or password\. please try again\./i)).toBeInTheDocument()
        })
    })
})