import React from 'react';
import MetaTool, { Props } from '../../pages/utilities/metatool';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import axios from 'axios';
jest.mock('axios');
const mockAxios = axios as jest.Mocked<typeof axios>;

import { shakeAnimation } from '../../lib/library';

jest.mock('next/router', () => require('next-router-mock'));
jest.mock('../../lib/library');

const defaultPinyinSyllables = 2;

const mockAdmin = {
    tierId: 4,
    name: 'Admin',
    tokenString: 'faketokenstring',
    isAdmin: true,
};

const validUrl = 'https://open.spotify.com/track/54kJUsxhDUMJS3kI2XptLl';

const songData = {
    title: '七天',
    artist: 'Crowd Lu',
    romTitle: 'Qi Tian',
    key: 2,
    mode: 1,
    tempo: 93,
    durationMinSec: '4:00',
    durationMs: 240000,
    time: '4/4',
    initialism: 'qt',
    language: 'mandarin',
    yearReleased: 2013,
};

function renderMetaTool(props: Partial<Props> = {}) {
    const defaultProps: Props = {
        user: {
            tierId: 2,
            name: 'Isaac',
            tokenString: 'faketokenstring',
            isAdmin: false,
        },
    };
    const utils = render(<MetaTool {...defaultProps} {...props} />);

    const getFromSpotifyButton = utils.getByRole('button', {
        name: /get from spotify/i,
    });

    const copyToClipboardButton = utils.getByRole('button', {
        name: /copy to clipboard/i,
    });

    const showPinyinCheckbox = utils.getByRole('checkbox', { name: /pinyin/i });

    const searchBar = utils.getByPlaceholderText(
        /^https:\/\/open.spotify.com.*/
    );

    const pinyinDropdown = utils.getByText(defaultPinyinSyllables);

    return {
        ...utils,
        getFromSpotifyButton,
        copyToClipboardButton,
        showPinyinCheckbox,
        pinyinDropdown,
        searchBar,
    };
}

describe('The metatool page', () => {
    describe('the elements on page', () => {
        it('should render correctly', () => {
            const {
                getFromSpotifyButton,
                copyToClipboardButton,
                showPinyinCheckbox,
                pinyinDropdown,
                searchBar,
            } = renderMetaTool();

            expect(searchBar).toBeInTheDocument();
            expect(getFromSpotifyButton).toBeInTheDocument();
            expect(copyToClipboardButton).toBeInTheDocument();
            expect(showPinyinCheckbox).toBeInTheDocument();
            expect(pinyinDropdown).toBeInTheDocument();
        });
    });

    describe('The Spotify search bar', () => {
        it('should have empty input when it first render', () => {
            const { searchBar } = renderMetaTool();
            expect(searchBar).toHaveValue('');
        });

        it('should display the url typed into the textbox', () => {
            const { searchBar } = renderMetaTool();
            const spotifyUrl =
                'https://open.spotify.com/track/54kJUsxhDUMJS3kI2XptLl';
            userEvent.type(searchBar, spotifyUrl);
            expect(searchBar).toHaveValue(spotifyUrl);
        });

        it('should trigger call to get data from spotify if the url is valid, and user is admin', async () => {
            const { searchBar, getFromSpotifyButton } = renderMetaTool({
                user: mockAdmin,
            });

            mockAxios.post.mockResolvedValueOnce({
                data: {
                    result: songData,
                    message: 'This is a mock resolved value',
                },
            });

            userEvent.type(searchBar, validUrl);
            userEvent.click(getFromSpotifyButton);

            await waitFor(() => {
                expect(axios.post).toBeCalledTimes(2);
                jest.resetAllMocks();
            });
        });

        it('should not contribute to the database if user is not admin', async () => {
            const { searchBar, getFromSpotifyButton } = renderMetaTool();

            mockAxios.post.mockResolvedValueOnce({
                data: {
                    result: songData,
                    message: 'This is a mock resolved value',
                },
            });
            // const setFormValue = jest.fn()
            userEvent.type(searchBar, validUrl);
            userEvent.click(getFromSpotifyButton);

            await waitFor(() => {
                expect(axios.post).toBeCalledTimes(1);
                jest.resetAllMocks();
            });

            // Unable to test content editable fiv
        });

        it('should trigger shake animation and red border if input is empty or invalid', async () => {
            const { searchBar, getFromSpotifyButton } = renderMetaTool();

            userEvent.click(getFromSpotifyButton);
            expect(shakeAnimation).toBeCalledTimes(1);

            userEvent.type(searchBar, 'invalid input');
            expect(shakeAnimation).toBeCalledTimes(1);

            userEvent.type(
                searchBar,
                'https://open.spotify.com/track/obviouslywrong'
            );
            expect(shakeAnimation).toBeCalledTimes(1);
        });

        it.todo('should render loader on button if the url is valid');
        it.todo('unable to test Content Editable div at the moment');
        it.todo(
            'should not render pinyin before title if pinyin checkbox is not checked'
        );
    });

    describe('The pinyin toggle', () => {
        it('should toggle check when clicked', () => {
            const { showPinyinCheckbox } = renderMetaTool();

            userEvent.click(showPinyinCheckbox);
            expect(showPinyinCheckbox).not.toBeChecked();

            userEvent.click(showPinyinCheckbox);
            expect(showPinyinCheckbox).toBeChecked();
        });
    });

    describe('The pinyin dropdown', () => {
        it('should open dropdown menu when clicked', () => {
            const { pinyinDropdown } = renderMetaTool();

            userEvent.click(pinyinDropdown);
            const option1 = screen.getByText('1');
            const option2 = screen.getByText(/all/i);
            expect(option1).toBeInTheDocument();
            expect(option2).toBeInTheDocument();

            userEvent.click(option1);
            expect(screen.getByText('1')).toBeInTheDocument();

            userEvent.click(pinyinDropdown);
            userEvent.click(option2);
            expect(screen.getByText(/all/i)).toBeInTheDocument();
        });
    });

    describe('Toggle time signature feature', () => {
        const validUrl =
            'https://open.spotify.com/track/5ioYOfM00Jf3aJBlmecsX7';
        const songDataInTwelveEight = {
            title: '深夜',
            artist: 'Isaac Yong',
            key: 1,
            mode: 0,
            tempo: 171,
            spotifyLink:
                'https://open.spotify.com/track/5ioYOfM00Jf3aJBlmecsX7',
            durationMs: 263390,
            timeSignature: '3/4',
            energy: 0.409,
            danceability: 0.408,
            valence: 0.279,
            acousticness: 0.74,
            instrumentalness: 0,
            verified: false,
            dateReleased: '2019-09-19',
            romTitle: 'Shen Ye',
            language: 'mandarin',
            initialism: 'sy',
        };

        it('should show time signature toggle if time signature is 3/4', async () => {
            const { searchBar, getFromSpotifyButton } = renderMetaTool();

            mockAxios.post.mockResolvedValueOnce({
                data: {
                    result: songDataInTwelveEight,
                    message: 'This is a mock 222',
                },
            });

            userEvent.type(searchBar, validUrl);
            userEvent.click(getFromSpotifyButton);

            expect(
                await screen.findByRole('button', { name: '12/8' })
            ).toBeInTheDocument();
            expect(
                await screen.findByRole('button', { name: '3/4' })
            ).toBeInTheDocument();
        });

        it("should render song's original time signature on button toggle", async () => {
            const { searchBar, getFromSpotifyButton } = renderMetaTool();

            mockAxios.post.mockResolvedValueOnce({
                data: {
                    result: songDataInTwelveEight,
                    message: 'This is a mock 222',
                },
            });

            userEvent.type(searchBar, validUrl);
            userEvent.click(getFromSpotifyButton);

            const twelveEightButton = await screen.findByRole('button', {
                name: '12/8',
            });
            const threeFourButton = await screen.findByRole('button', {
                name: '3/4',
            });

            expect(screen.getByText(/^.*Tempo: 171.*/)).toBeInTheDocument();

            userEvent.click(twelveEightButton);
            expect(screen.getByText(/^.*Tempo: 57.*/)).toBeInTheDocument();

            userEvent.click(threeFourButton);
            expect(screen.getByText(/^.*Tempo: 171.*/)).toBeInTheDocument();
        });

        //contentEditable div not testable at the moment
        it.todo('should toggle time signature displayed');
    });

    describe('The contribution checkbox', () => {
        it('should render if user is logged in as admin', () => {
            renderMetaTool({
                user: mockAdmin,
            });

            const isContributeCheckbox = screen.getByRole('checkbox', {
                name: /^(contribute to database)./i,
            });
            expect(isContributeCheckbox).toBeInTheDocument();
        });

        it('should not render if user is not an admin', () => {
            renderMetaTool();

            const isContributeCheckbox = screen.queryByRole('checkbox', {
                name: /^(contribute to database)./i,
            });
            expect(isContributeCheckbox).not.toBeInTheDocument();
        });

        it('should default as checked as an admin and able to toggle on and off', () => {
            renderMetaTool({
                user: mockAdmin,
            });

            const isContributeCheckbox = screen.getByRole('checkbox', {
                name: /^(contribute to database)./i,
            });

            expect(isContributeCheckbox).toBeChecked();
            userEvent.click(isContributeCheckbox);

            expect(isContributeCheckbox).not.toBeChecked();
        });
    });

    describe('The relative key checkbox', () => {
        it('should show only after after clicking Get From Spotify button, with uncheck as default', async () => {
            const { searchBar, getFromSpotifyButton } = renderMetaTool();

            mockAxios.post.mockResolvedValueOnce({
                data: {
                    result: songData,
                    message: 'This is a mock resolved value',
                },
            });

            userEvent.type(searchBar, validUrl);
            userEvent.click(getFromSpotifyButton);

            const relativeKeyCheckbox = await screen.findByRole('checkbox', {
                name: /relative key/i,
            });
            expect(relativeKeyCheckbox).toBeInTheDocument();
            expect(relativeKeyCheckbox).not.toBeChecked();
        });

        it('should be unchecked as default, and toggle check and relative key value when clicked', async () => {
            const { searchBar, getFromSpotifyButton } = renderMetaTool();

            mockAxios.post.mockResolvedValueOnce({
                data: {
                    result: songData,
                    message: 'This is a mock resolved value',
                },
            });

            userEvent.type(searchBar, validUrl);
            userEvent.click(getFromSpotifyButton);

            const relativeKeyCheckbox = await screen.findByRole('checkbox', {
                name: /relative key/i,
            });

            expect(screen.getByText(/^.+Key: D.+/)).toBeInTheDocument();

            userEvent.click(relativeKeyCheckbox);
            expect(relativeKeyCheckbox).toBeChecked();
            expect(screen.getByText(/^.+Key: Bm.+/)).toBeInTheDocument();

            userEvent.click(relativeKeyCheckbox);
            expect(relativeKeyCheckbox).not.toBeChecked();
            expect(screen.getByText(/^.+Key: D.+/)).toBeInTheDocument();
        });
    });

    describe('Copy to Clipboard button', () => {
        it.todo('should copy text in content editable div to clipboard');
    });

    describe('Clear button', () => {
        it.todo('should clear the text inside the content editable div');
    });
});
