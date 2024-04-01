import React from 'react';
import { screen, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';

import AddSongModal from 'pages/repertoire/AddSongModal/index';

jest.mock('axios');
jest.setTimeout(10000); // TODO: to investigate why test is timeout

const mockAxios = axios as jest.Mocked<typeof axios>;

function renderAddSongModal(props = {}) {
    const utils = render(
        <AddSongModal
            visible={true}
            onClose={jest.fn()}
            data={{
                songs: [],
                genres: [],
                musicians: [],
                tags: [],
                moods: [],
                languages: [],
            }}
            {...props}
        />,
    );
    const titleTextbox = utils.getByPlaceholderText(/title/i);
    const initialismTextbox = utils.getByRole('textbox', {
        name: /initialism.*/i,
    });
    const romTitleTextbox = utils.getByRole('textbox', {
        name: /romanized title.*/i,
    });
    const isMinorCheckbox = utils.getByRole('checkbox', { name: /minor/i });
    const keysDropdown = utils.getAllByLabelText(/key:/i)[0];
    const durationTextbox = utils.getByRole('textbox', { name: /duration/i });
    const genresDropdown = utils.getByLabelText(/genres/i);
    const moodsDropdown = utils.getByLabelText(/moods/i);
    const tagsDropdown = utils.getByLabelText(/tags/i);
    const generateMetadataTab = utils.getByText(/generate metadata.*/i);
    const songDetailsTab = utils.getByText(/details.*/i);

    return {
        ...utils,
        titleTextbox,
        initialismTextbox,
        romTitleTextbox,
        isMinorCheckbox,
        keysDropdown,
        durationTextbox,
        genresDropdown,
        moodsDropdown,
        tagsDropdown,
        generateMetadataTab,
        songDetailsTab,
    };
}

describe('<AddSongModal />', () => {
    it('should render the component', () => {
        const getLanguages = jest.fn();
        getLanguages.mockResolvedValue({
            response: {
                data: {
                    languages: [],
                },
            },
        });
        renderAddSongModal();

        expect(screen.getByLabelText(/artist/i)).toBeInTheDocument();
    });

    describe("KeysDropdown component's behaviours", () => {
        it('should render the component', () => {
            const {
                keysDropdown,
                isMinorCheckbox,
                genresDropdown,
                moodsDropdown,
                tagsDropdown,
            } = renderAddSongModal();

            expect(keysDropdown).toBeInTheDocument();
            expect(isMinorCheckbox).toBeInTheDocument();
            expect(genresDropdown).toBeInTheDocument();
            expect(moodsDropdown).toBeInTheDocument();
            expect(tagsDropdown).toBeInTheDocument();
        });

        it('should toggle the dropdown menu and render key options accordingly', () => {
            const { keysDropdown } = renderAddSongModal();

            expect(keysDropdown).toBeInTheDocument();

            userEvent.click(keysDropdown);

            // use arrow down to simulate opening the dropdown menu via clicking
            userEvent.type(keysDropdown, '{arrowdown}');
            userEvent.click(screen.getByText('C'));

            expect(screen.getByDisplayValue('C')).toBeInTheDocument();

            userEvent.type(keysDropdown, '{arrowdown}');
            // screen.debug(undefined, 10000)
            userEvent.click(screen.getByText('Eb'));
            expect(screen.getByDisplayValue('Eb')).toBeInTheDocument();
        });

        it('should toggle the isMinor checkbox when the default is empty', () => {
            const { keysDropdown, isMinorCheckbox } = renderAddSongModal();

            userEvent.click(keysDropdown);
            expect(screen.getByText('C')).toBeInTheDocument();
            expect(screen.getByText('Bb')).toBeInTheDocument();

            userEvent.click(isMinorCheckbox);
            expect(isMinorCheckbox).toBeChecked();

            userEvent.click(keysDropdown);
            expect(screen.getByText('Cm')).toBeInTheDocument();
            expect(screen.getByText('Gm')).toBeInTheDocument();
            expect(screen.getByText('Am')).toBeInTheDocument();
            //use query only if the element cannot be found
            expect(screen.queryByText('C')).not.toBeInTheDocument();
            expect(screen.queryByText('G')).not.toBeInTheDocument();

            userEvent.click(isMinorCheckbox);
            userEvent.click(keysDropdown);

            expect(isMinorCheckbox).not.toBeChecked();
            expect(screen.getByText('A')).toBeInTheDocument();
            expect(screen.getByText('D')).toBeInTheDocument();
            expect(screen.queryByText('Cm')).not.toBeInTheDocument();
            expect(screen.queryByText('Gm')).not.toBeInTheDocument();
        });

        it('should toggle the isMinor checkbox even when key is selected', () => {
            const { keysDropdown, isMinorCheckbox } = renderAddSongModal();

            userEvent.click(keysDropdown);
            userEvent.click(screen.getByText('Eb'));
            expect(screen.getByText('Eb')).toBeInTheDocument();

            userEvent.click(keysDropdown);
            expect(screen.getByText('C')).toBeInTheDocument();
            expect(screen.getByText('Bb')).toBeInTheDocument();

            userEvent.click(isMinorCheckbox);
            expect(isMinorCheckbox).toBeChecked();

            expect(screen.getByText('Cm')).toBeInTheDocument();

            userEvent.click(keysDropdown);
            expect(screen.getByText('Gm')).toBeInTheDocument();
            expect(screen.getByText('Am')).toBeInTheDocument();
            //use query only if the element cannot be found
            expect(screen.queryByText('C')).not.toBeInTheDocument();
            expect(screen.queryByText('G')).not.toBeInTheDocument();

            userEvent.click(isMinorCheckbox);
            userEvent.click(keysDropdown);

            expect(isMinorCheckbox).not.toBeChecked();
            expect(screen.getByText('A')).toBeInTheDocument();
            expect(screen.getByText('D')).toBeInTheDocument();
            expect(screen.queryByText('Cm')).not.toBeInTheDocument();
            expect(screen.queryByText('Gm')).not.toBeInTheDocument();
        });

        it('should change the selected key to relative minor when checkbox is toggled', () => {
            const { keysDropdown, isMinorCheckbox } = renderAddSongModal();

            userEvent.click(keysDropdown);
            userEvent.click(screen.getByText('Gb'));

            expect(screen.getByDisplayValue('Gb')).toBeInTheDocument();
            userEvent.click(isMinorCheckbox);

            expect(screen.queryByDisplayValue('Gb')).not.toBeInTheDocument();
            expect(screen.getByDisplayValue('Ebm')).toBeInTheDocument();

            userEvent.click(isMinorCheckbox);

            expect(screen.queryByDisplayValue('Ebm')).not.toBeInTheDocument();
            expect(screen.getByDisplayValue('Gb')).toBeInTheDocument();
        });
    });

    describe('The Duration input textbox in Add mode', () => {
        it('should be empty when the modal is opened in Add mode', () => {
            const { durationTextbox } = renderAddSongModal();

            expect(durationTextbox).toBeInTheDocument();
            expect(durationTextbox).toHaveValue('');
        });

        it('should be show duration in mm:ss format after getting track info from Spotify in Add mode', async () => {
            const { durationTextbox } = renderAddSongModal();

            const searchBar = screen.getByPlaceholderText(
                'https://open.spotify.com/track/....',
            );
            const getFromSpotifyButton = screen.getByRole('button', {
                name: /get from spotify/i,
            });

            expect(searchBar).toBeInTheDocument();
            expect(getFromSpotifyButton).toBeInTheDocument();

            mockAxios.post.mockResolvedValue({
                data: {
                    result: {
                        title: '七天',
                        artist: 'Crowd Lu',
                        romTitle: 'Qi Tian',
                        key: 2,
                        mode: 1,
                        tempo: 93,
                        durationMs: 240000,
                        timeSignature: '4/4',
                        initialism: 'qt',
                        language: 'mandarin',
                        dateReleased: '2013-01-01',
                    },
                    message: 'This is a mock resolved value',
                },
            });

            userEvent.type(
                searchBar,
                'https://open.spotify.com/track/54kJUsxhDUMJS3kI2XptLl?si=e840d909c0a643c6',
            );
            userEvent.click(getFromSpotifyButton);

            await waitFor(() => {
                expect(axios.post).toBeCalledTimes(1);
                expect(axios.post).toBeCalledWith(
                    '/api/spotify?trackId=54kJUsxhDUMJS3kI2XptLl',
                );
                expect(durationTextbox).toHaveValue('4:00');
            });
        });
    });

    describe('The behaviour of form if Get From Spotify button is clicked', () => {
        it('should render the key of the song in KeysDropdown', async () => {
            renderAddSongModal({
                type: 'add',
            });

            const getFromSpotifyButton = screen.getByRole('button', {
                name: /get from spotify/i,
            });
            const spotifySearchBar = screen.getByPlaceholderText(
                /^https:\/\/open.spotify.com.+/i,
            );

            const validSpotifyUrl =
                'https://open.spotify.com/track/54kJUsxhDUMJS3kI2XptLl';

            mockAxios.post.mockResolvedValue({
                data: {
                    result: {
                        title: '七天',
                        artist: 'Crowd Lu',
                        romTitle: 'Qi Tian',
                        key: 2,
                        mode: 1,
                        tempo: 93,
                        durationMs: 240000,
                        timeSignature: '4/4',
                        initialism: 'qt',
                        language: 'mandarin',
                        dateReleased: '2013-01-01',
                    },
                },
            });

            userEvent.type(spotifySearchBar, validSpotifyUrl);
            userEvent.click(getFromSpotifyButton);

            expect(await screen.findByText('D')).toBeInTheDocument();
        });
    });

    describe('The view of Add Song Modal in Add Mode', () => {
        it.todo("should be empty every time it's opened after submitting once");
    });

    describe('The behaviour of Generate Metadata button', () => {
        it('should keep the changes that the user has made', async () => {
            const { songDetailsTab, keysDropdown, generateMetadataTab } =
                renderAddSongModal();

            userEvent.click(keysDropdown);
            userEvent.click(screen.getByText('G'));

            expect(screen.getByText('G')).toBeInTheDocument();

            userEvent.click(generateMetadataTab);
            userEvent.click(songDetailsTab);

            expect(screen.getByText('G')).toBeInTheDocument();
        });
    });

    describe('The behaviour of the title input', () => {
        it('should render the input correctly', () => {
            const { titleTextbox } = renderAddSongModal();

            userEvent.type(titleTextbox, '认错');
            expect(titleTextbox).toHaveValue('认错');
        });

        it('should update the initialism and the romTitle if title are in Chinese on blur', () => {
            const {
                titleTextbox,
                keysDropdown,
                initialismTextbox,
                romTitleTextbox,
            } = renderAddSongModal();

            userEvent.type(titleTextbox, '丑八怪咦哎咦啊啊啊');
            userEvent.click(keysDropdown);

            expect(romTitleTextbox).toHaveValue('Chou Ba Guai Yi Ai Yi A A A');
            expect(initialismTextbox).toHaveValue('cbgyayaaa');
        });
    });
});
