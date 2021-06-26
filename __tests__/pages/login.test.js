import React from "react";
import { render, screen, waitFor} from "@testing-library/react"
import userEvent from "@testing-library/user-event";
import axios from "axios";
import { parseCookies, setCookie } from "nookies"
import LoginPage from "../../pages/accounts/login"

import '@testing-library/jest-dom/extend-expect'
import router from "next/router"

jest.mock('next/router', () => require('next-router-mock'))
jest.mock('axios')

console.log(parseCookies)
console.log(setCookie)

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
            expect(axios.post).toHaveBeenCalledTimes(1)
            expect(axios.post).toHaveBeenCalledWith(`/api/v1/auth/login`, { "email": `${input.email}`, "password": `${input.password}`}, {withCredentials: true})
        })
    })


    it("should render dashboard if username and password is correct",async () => {

        const input = { email: "correct_user@gmail.com", password: "correct_password"}

        userEvent.type(emailInput, input.email)
        userEvent.type(passwordInput, input.password)
        userEvent.click(loginButton)

        axios.post.mockResolvedValueOnce({
            data: {
                token: "Bearer test-token"
            }
        })
        await waitFor(async () => {
            expect(router.pathname).toBe('/dashboard')
        })
    })

    it.todo("should set the cookie if username and password is correct")


    it("should show error message if no username or password is provided", async () => {

        expect(loginButton).toBeInTheDocument()
        userEvent.click(loginButton)

        axios.post.mockRejectedValueOnce()

        await waitFor(() => {
            expect(screen.getByText(/please provide email/i)).toBeInTheDocument()
            expect(screen.getByText(/please provide password/i)).toBeInTheDocument()
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

    it("should render signup container if 'Sign up here' is clicked",() => {
        userEvent.click(screen.getByText(/sign up here/i))
        expect(screen.getByRole('button', { name: /create account/i})).toBeInTheDocument()
    })
})

describe("Sign up UI", () => {
    let signUpButton, emailInput, passwordInput
    beforeEach(async () => {
        render(<LoginPage />)
        userEvent.click(screen.getByText(/sign up here/i))

        signUpButton = screen.getByRole('button', { name: /create account/i })

        emailInput = screen.getByPlaceholderText("Email")
        passwordInput = screen.getByPlaceholderText("Password")
        jest.resetAllMocks()
    })

    it("should render login container if 'Login here' is clicked",() => {
        userEvent.click(screen.getByText(/login here/i))
        expect(screen.getByRole('button', { name: /log in/i})).toBeInTheDocument()
    })


    it("should make a call to /api/v1/auth/signup", async () => {
        const input = { email: "user@gmail.com", password: "password"}

        userEvent.type(emailInput, input.email)
        userEvent.type(passwordInput, input.password)
        userEvent.click(signUpButton)

        await waitFor(async() => {
            expect(axios.post).toBeCalledTimes(1)
            expect(axios.post).toHaveBeenCalledWith(`/api/v1/auth/signup`, { "email": `${input.email}`, "password": `${input.password}`}, {withCredentials: true})
        })
    })


    it("should render dashboard if user is successfully created",async () => {

        const input = { email: "new_user@gmail.com", password: "password"}

        userEvent.type(emailInput, input.email)
        userEvent.type(passwordInput, input.password)
        userEvent.click(signUpButton)

        axios.post.mockResolvedValueOnce()
        await waitFor(async () => {
            expect(router.pathname).toBe('/dashboard')
        })
    })


    it("should show error message if no username or password is provided", async () => {

        userEvent.click(signUpButton)

        axios.post.mockRejectedValueOnce()

        await waitFor(() => {
            expect(screen.getByText(/please provide email/i)).toBeInTheDocument()
            expect(screen.getByText(/please provide password/i)).toBeInTheDocument()
        })
    })

    it("should show error message if user already existed", async () => {

        const input = { email: "existing_user@gmail.com", password: "password"}

        userEvent.type(emailInput, input.email)
        userEvent.type(passwordInput, input.password)
        userEvent.click(signUpButton)

        axios.post.mockRejectedValueOnce({
           response: {
               data: {
                   message: "User already exists. Please try again"
               }
           }
        })


        expect(await screen.findByText(/user already exists\. please try again/i)).toBeInTheDocument()

    })
})