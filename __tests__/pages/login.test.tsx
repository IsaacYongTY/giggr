import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import router from 'next/router';
import '@testing-library/jest-dom/extend-expect';

import LoginPage from '../../pages/accounts/login';

jest.mock('next/router', () => require('next-router-mock'));
jest.mock('axios');

const mockAxios = axios as jest.Mocked<typeof axios>;

function renderLoginPage() {
    const utils = render(<LoginPage />);
    const loginButton = screen.getByRole('button', { name: /log in/i });
    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);

    return { ...utils, loginButton, emailInput, passwordInput };
}

describe('The login page', () => {
    it('should make a call to /api/v1/auth/login', async () => {
        const { emailInput, passwordInput, loginButton } = renderLoginPage();

        const input = {
            email: 'correct_@gmail.com',
            password: 'correct_password',
        };

        userEvent.type(emailInput, input.email);
        userEvent.type(passwordInput, input.password);
        userEvent.click(loginButton);

        await waitFor(() => {
            expect(axios.post).toHaveBeenCalledTimes(1);
            expect(axios.post).toHaveBeenCalledWith(`/api/v1/auth/login`, {
                email: `${input.email}`,
                password: `${input.password}`,
            });
        });
    });

    it('should render dashboard if username and password is correct', async () => {
        const { emailInput, passwordInput, loginButton } = renderLoginPage();
        const input = {
            email: 'correct_user@gmail.com',
            password: 'correct_password',
        };

        userEvent.type(emailInput, input.email);
        userEvent.type(passwordInput, input.password);
        userEvent.click(loginButton);

        mockAxios.post.mockResolvedValueOnce({
            data: {
                token: 'Bearer test-token',
            },
        });
        await waitFor(async () => {
            expect(router.pathname).toBe('/dashboard');
        });
    });

    it.todo('should set the cookie if username and password is correct');

    it('should show error message if no username or password is provided', async () => {
        const { loginButton } = renderLoginPage();
        expect(loginButton).toBeInTheDocument();
        userEvent.click(loginButton);

        mockAxios.post.mockRejectedValueOnce({});

        await waitFor(() => {
            expect(
                screen.getByText(/please provide email/i)
            ).toBeInTheDocument();
            expect(
                screen.getByText(/please provide password/i)
            ).toBeInTheDocument();
        });
    });

    it('should prompt invalid email or password', async () => {
        const { emailInput, passwordInput, loginButton } = renderLoginPage();
        userEvent.type(emailInput, 'wrongusername@gmail.com');
        userEvent.type(passwordInput, 'wrongpassword');
        userEvent.click(loginButton);

        mockAxios.post.mockRejectedValueOnce({});
        await waitFor(() => {
            expect(
                screen.getByText(
                    /invalid email or password\. please try again\./i
                )
            ).toBeInTheDocument();
        });
    });

    it("should render signup container if 'Sign up here' is clicked", () => {
        renderLoginPage();
        userEvent.click(screen.getByText(/sign up here/i));
        expect(
            screen.getByRole('button', { name: /create account/i })
        ).toBeInTheDocument();
    });
});

function renderSignupPage() {
    const utils = render(<LoginPage />);
    userEvent.click(screen.getByText(/sign up here/i));
    const signUpButton = screen.getByRole('button', {
        name: /create account/i,
    });
    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);

    return { ...utils, signUpButton, emailInput, passwordInput };
}
describe('Sign up UI', () => {
    beforeEach(async () => {
        jest.resetAllMocks();
    });

    it("should render login container if 'Index here' is clicked", () => {
        renderSignupPage();

        userEvent.click(screen.getByText(/login here/i));
        expect(
            screen.getByRole('button', { name: /log in/i })
        ).toBeInTheDocument();
    });

    it('should make a call to /api/v1/auth/signup', async () => {
        const { emailInput, passwordInput, signUpButton } = renderSignupPage();

        const input = { email: 'user@gmail.com', password: 'password' };

        userEvent.type(emailInput, input.email);
        userEvent.type(passwordInput, input.password);
        userEvent.click(signUpButton);

        mockAxios.post.mockResolvedValueOnce({
            response: {
                data: {
                    token: 'validtoken',
                },
            },
        });

        await waitFor(async () => {
            expect(axios.post).toBeCalledTimes(1);
            expect(axios.post).toHaveBeenCalledWith(`/api/v1/auth/signup`, {
                email: `${input.email}`,
                password: `${input.password}`,
            });
        });
    });

    it('should render dashboard if user is successfully created', async () => {
        const { emailInput, passwordInput, signUpButton } = renderSignupPage();

        const input = { email: 'new_user@gmail.com', password: 'password' };

        userEvent.type(emailInput, input.email);
        userEvent.type(passwordInput, input.password);
        userEvent.click(signUpButton);

        mockAxios.post.mockResolvedValueOnce({});
        await waitFor(() => {
            expect(router.pathname).toBe('/dashboard');
        });
    });

    it('should show error message if no username or password is provided', async () => {
        const { signUpButton } = renderSignupPage();

        userEvent.click(signUpButton);

        mockAxios.post.mockRejectedValueOnce({});

        await waitFor(() => {
            expect(
                screen.getByText(/please provide email/i)
            ).toBeInTheDocument();
            expect(
                screen.getByText(/please provide password/i)
            ).toBeInTheDocument();
        });
    });

    it('should show error message if user already existed', async () => {
        const { emailInput, passwordInput, signUpButton } = renderSignupPage();

        const input = {
            email: 'existing_user@gmail.com',
            password: 'password',
        };

        userEvent.type(emailInput, input.email);
        userEvent.type(passwordInput, input.password);
        userEvent.click(signUpButton);

        mockAxios.post.mockRejectedValueOnce({
            response: {
                data: {
                    message: 'User already exists. Please try again',
                },
            },
        });

        expect(
            await screen.findByText(/user already exists\. please try again/i)
        ).toBeInTheDocument();
    });
});
