import React from 'react';
import { screen, render, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';

import EditSongModal from './EditSongModal';
import { generateMockSong } from 'fixtures/generate-mock-song';

jest.mock('axios');
jest.setTimeout(10000); // TODO: to investigate why test is timeout

function renderEditSongModal(props = {}) {
    const defaultPlaceholderSong = generateMockSong('认错', 'Eb', new Date());
    const utils = render(
        <EditSongModal
            isModalOpen={true}
            handleCloseModal={jest.fn()}
            song={defaultPlaceholderSong}
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

describe('<EditSongModal />', () => {
    it('should render the component', () => {
        const getLanguages = jest.fn();
        getLanguages.mockResolvedValue({
            response: {
                data: {
                    languages: [],
                },
            },
        });
        renderEditSongModal();

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
            } = renderEditSongModal();

            expect(keysDropdown).toBeInTheDocument();
            expect(isMinorCheckbox).toBeInTheDocument();
            expect(genresDropdown).toBeInTheDocument();
            expect(moodsDropdown).toBeInTheDocument();
            expect(tagsDropdown).toBeInTheDocument();
        });

        it("should render the component with song's key", async () => {
            renderEditSongModal({
                song: generateMockSong('认错', 'C', new Date()),
            });

            expect(await screen.findByText('C')).toBeInTheDocument();

            cleanup();

            renderEditSongModal({
                song: generateMockSong('我爱你', 'Bm', new Date()),
            });

            expect(screen.getByDisplayValue('Bm')).toBeInTheDocument();
        });

        it('should toggle the isMinor checkbox when the default is empty', () => {
            const { keysDropdown, isMinorCheckbox } = renderEditSongModal({
                song: generateMockSong('认错', '', new Date()),
            });

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
            const { keysDropdown, isMinorCheckbox } = renderEditSongModal({
                song: generateMockSong('认错', 'Eb', new Date()),
            });

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

        it('should change the selected key to relative major when checkbox is toggled', () => {
            const { isMinorCheckbox } = renderEditSongModal({
                song: generateMockSong('认错', 'C#m', new Date()),
            });

            expect(screen.getByDisplayValue('C#m')).toBeInTheDocument();
            userEvent.click(isMinorCheckbox);

            expect(screen.queryByDisplayValue('C#m')).not.toBeInTheDocument();
            expect(screen.getByDisplayValue('E')).toBeInTheDocument();
        });

        it('should change the selected key to relative minor when checkbox is toggled', () => {
            const { isMinorCheckbox } = renderEditSongModal({
                song: generateMockSong('认错', 'Gb', new Date()),
            });

            expect(screen.getByDisplayValue('Gb')).toBeInTheDocument();
            userEvent.click(isMinorCheckbox);

            expect(screen.queryByDisplayValue('Gb')).not.toBeInTheDocument();
            expect(screen.getByDisplayValue('Ebm')).toBeInTheDocument();
        });
    });

    describe('The Duration input textbox in Edit mode', () => {
        it('should show duration in mm:ss format when the modal is opened in Edit mode', () => {
            const { durationTextbox } = renderEditSongModal({
                song: { durationMs: 184000 },
            });

            expect(durationTextbox).toBeInTheDocument();
            expect(durationTextbox).toHaveValue('3:04');
        });
    });

    describe('The view of Add Song Modal in Add Mode', () => {
        it.todo("should be empty every time it's opened after submitting once");
    });

    describe('The behaviour of Generate Metadata button', () => {
        it('should display the metadata head', async () => {
            const { generateMetadataTab } = renderEditSongModal({
                song: {
                    title: '我爱你',
                    artist: {
                        id: 1,
                        name: 'Crowd Lu',
                        romName: '',
                        spotifyName: '',
                    },
                    romTitle: 'Wo Ai Ni',
                    key: 10,
                    mode: 0,
                    tempo: 93,
                    durationMs: 285000,
                    timeSignature: '4/4',
                    initialism: 'wan',
                    language: {
                        id: 1,
                        name: 'mandarin',
                    },
                    dateReleased: '2008-01-01',
                },
            });

            userEvent.click(generateMetadataTab);

            expect(screen.getByText(/Wo Ai 我爱你/i)).toBeInTheDocument();
            expect(screen.getByText(/Crowd Lu/i)).toBeInTheDocument();
            expect(screen.getByText(/Key: /i)).toBeInTheDocument();
            expect(screen.getByText(/Tempo: /i)).toBeInTheDocument();
            expect(screen.getByText(/Duration: /i)).toBeInTheDocument();
            expect(screen.getByText(/Time: /i)).toBeInTheDocument();
            expect(
                screen.getByText(/Keywords: wan, mandarin/i),
            ).toBeInTheDocument();
            expect(
                screen.getByText(/Year Released: 2008/i),
            ).toBeInTheDocument();
        });

        it('should keep the changes that the user has made', async () => {
            const { songDetailsTab, keysDropdown, generateMetadataTab } =
                renderEditSongModal({
                    song: {
                        title: '我爱你',
                        artist: {
                            id: 1,
                            name: 'Crowd Lu',
                            romName: '',
                            spotifyName: '',
                        },
                        romTitle: 'Wo Ai Ni',
                        key: 2,
                        mode: 1,
                        tempo: 93,
                        durationMs: 285000,
                        timeSignature: '4/4',
                        initialism: 'wan',
                        language: {
                            id: 1,
                            name: 'mandarin',
                        },
                        dateReleased: '2008-01-01',
                    },
                });

            userEvent.click(keysDropdown);
            userEvent.click(screen.getByText('G'));

            expect(screen.getByText('G')).toBeInTheDocument();

            userEvent.click(generateMetadataTab);
            userEvent.click(songDetailsTab);

            expect(screen.getByText('G')).toBeInTheDocument();
        });
    });

    describe('The behaviour of the title input', () => {
        it('should render the input correctly when the title is edited', () => {
            const { titleTextbox } = renderEditSongModal();

            userEvent.type(titleTextbox, 'additional text');
            expect(titleTextbox).toHaveValue('认错additional text');
        });

        it('should update the initialism and the romTitle if title are in Chinese on blur', () => {
            const {
                titleTextbox,
                keysDropdown,
                initialismTextbox,
                romTitleTextbox,
            } = renderEditSongModal();

            userEvent.type(titleTextbox, '丑八怪咦哎咦啊啊啊');
            userEvent.click(keysDropdown);

            expect(romTitleTextbox).toHaveValue(
                'Ren Cuo Chou Ba Guai Yi Ai Yi A A A',
            );
            expect(initialismTextbox).toHaveValue('rccbgyayaaa');
        });
    });
});
