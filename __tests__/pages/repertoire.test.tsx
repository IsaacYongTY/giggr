import React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import axios from '../../config/axios';
import RepertoirePage from '../../pages/repertoire/repertoire';

import { SWRConfig } from 'swr';

const mockAxios = axios as jest.Mocked<typeof axios>;

jest.mock('next/router', () => require('next-router-mock'));
jest.mock('axios');
jest.mock('form-data');

const mockData = {
    data: {
        songs: [
            { id: 1, title: 'Song 1' },
            { id: 2, title: 'Song 2' },
            { id: 3, title: 'Song 3' },
            { id: 4, title: 'Song 4' },
            { id: 5, title: 'Song 5' },
        ],
    },
};

function renderRepertoirePage(props = {}) {
    const defaultProps = {
        user: { id: 1 },
    };

    const utils = render(
        <SWRConfig
            value={{
                dedupingInterval: 0,
                fetcher: (url: string) => axios.get(url).then((res) => res.data),
            }}
        >
            <RepertoirePage {...defaultProps} {...props} />
        </SWRConfig>
    );

    const uploadCsvButton = utils.getByRole('button', { name: /upload csv/i });

    return { ...utils, uploadCsvButton };
}

async function renderRepertoirePageWithDeleteModalOpen(props = {}) {
    const defaultProps = {
        user: { id: 1 },
    };

    mockAxios.get.mockResolvedValue(mockData);

    const utils = render(
        <SWRConfig
            value={{
                dedupingInterval: 0,
                fetcher: (url: string) => axios.get(url).then((res) => res.data),
            }}
        >
            <RepertoirePage {...defaultProps} {...props} />
        </SWRConfig>
    );

    let allCheckboxes: any[];

    await waitFor(() => {
        allCheckboxes = utils.getAllByRole('checkbox');

        act(() => {
            userEvent.click(allCheckboxes[1]);
            userEvent.click(allCheckboxes[2]);
        });
    });

    const deleteSelectedButton = utils.getByRole('button', {
        name: /delete selected/i,
    });
    userEvent.click(deleteSelectedButton);

    const confirmDeleteButton = utils.getByRole('button', {
        name: /confirm delete/i,
    });
    const cancelButton = utils.getByRole('button', { name: /cancel/i });

    return { ...utils, confirmDeleteButton, cancelButton };
}

async function renderRepertoirePageAndHoverOnFirstRow(props = {}) {
    const defaultProps = {
        user: { id: 1 },
    };

    mockAxios.get.mockResolvedValue(mockData);

    const utils = render(
        <SWRConfig
            value={{
                dedupingInterval: 0,
                fetcher: (url: string) => axios.get(url).then((res) => res.data),
            }}
        >
            <RepertoirePage {...defaultProps} {...props} />
        </SWRConfig>
    );

    userEvent.hover(await screen.findByText('Song 1'));
    const editSongIcon = utils.getByText('edit');
    const deleteSongIcon = utils.getByText('delete');

    return { ...utils, editSongIcon, deleteSongIcon };
}

describe('The Repertoire Page', () => {
    describe('The CSV Upload function', () => {
        it('should open and close the Upload CSV modal', () => {
            const { uploadCsvButton } = renderRepertoirePage();
            userEvent.click(uploadCsvButton);
            expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
            expect(screen.getByText(/click to upload csv/i)).toBeInTheDocument();

            const closeIcon = screen.getByText(/close/i);
            userEvent.click(closeIcon);
            expect(screen.queryByRole('button', { name: /submit/i })).not.toBeInTheDocument();
            expect(screen.queryByText(/click to upload csv/i)).not.toBeInTheDocument();
        });

        describe('The behaviour of the Upload CSV Modal', () => {
            const errorMessage = /.*please select a \.csv file before submitting.*/i;
            const successMessage = /csv uploaded successfully.*/i;

            interface IBlob extends Blob {
                lastModifiedDate?: string;
                name?: string;
            }

            it('should show error message if no file is selected', () => {
                const { uploadCsvButton } = renderRepertoirePage();

                userEvent.click(uploadCsvButton);
                const submitButton = screen.getByRole('button', {
                    name: /submit/i,
                });
                const closeIcon = screen.getByText(/close/i);

                expect(screen.queryByText(errorMessage)).not.toBeInTheDocument();

                userEvent.click(submitButton);
                expect(screen.getByText(errorMessage)).toBeInTheDocument();

                userEvent.click(closeIcon);
                userEvent.click(uploadCsvButton);

                expect(screen.queryByText(errorMessage)).not.toBeInTheDocument();
            });

            it('should show the filename if file is selected', async () => {
                const { uploadCsvButton } = renderRepertoirePage();

                userEvent.click(uploadCsvButton);
                const submitButton = screen.getByRole('button', {
                    name: /submit/i,
                });
                const uploadArea = screen.getByLabelText(
                    /click to upload csv/i
                ) as HTMLInputElement;

                const blob: IBlob = new Blob([''], { type: 'text/csv' });
                blob['lastModifiedDate'] = '';
                blob['name'] = 'test.csv';

                const csvFile = blob as File;

                mockAxios.post.mockResolvedValue({});
                userEvent.click(uploadCsvButton);

                userEvent.upload(uploadArea, csvFile);

                if (uploadArea?.files) {
                    expect(uploadArea.files[0]).toStrictEqual(csvFile);
                }

                expect(screen.getByText('test.csv')).toBeInTheDocument();

                userEvent.click(submitButton);

                expect(await screen.findByText(successMessage)).toBeInTheDocument();
                expect(screen.queryByText('test.csv')).not.toBeInTheDocument();

                const closeIcon = screen.getByText(/close/i);
                userEvent.click(closeIcon);
                userEvent.click(uploadCsvButton);

                expect(screen.queryByText('test.csv')).not.toBeInTheDocument();
            });

            it('should remove files and messages if modal is close without submitting', async () => {
                const { uploadCsvButton } = renderRepertoirePage();

                userEvent.click(uploadCsvButton);

                const uploadArea = screen.getByLabelText(
                    /click to upload csv/i
                ) as HTMLInputElement;

                const blob: IBlob = new Blob([''], { type: 'text/csv' });
                blob['lastModifiedDate'] = '';
                blob['name'] = 'test.csv';

                const csvFile = blob as File;

                mockAxios.post.mockResolvedValue({});
                userEvent.click(uploadCsvButton);

                userEvent.upload(uploadArea, csvFile);

                if (uploadArea?.files) {
                    expect(uploadArea.files[0]).toStrictEqual(csvFile);
                }

                const closeIcon = screen.getByText(/close/i);
                userEvent.click(closeIcon);
                userEvent.click(uploadCsvButton);

                expect(screen.queryByText('test.csv')).not.toBeInTheDocument();
                expect(screen.queryByText(errorMessage)).not.toBeInTheDocument();
                expect(screen.queryByText(successMessage)).not.toBeInTheDocument();

                const submitButton = screen.getByRole('button', {
                    name: /submit/i,
                });
                userEvent.click(submitButton);

                expect(screen.getByText(errorMessage)).toBeInTheDocument();

                jest.clearAllMocks();
            });

            it('should show uploading not successful error if the API call fails', async () => {
                mockAxios.post.mockRejectedValue({
                    response: {
                        error: {
                            data: {},
                        },
                    },
                });
                const { uploadCsvButton } = renderRepertoirePage();

                userEvent.click(uploadCsvButton);

                const submitButton = screen.getByRole('button', {
                    name: /submit/i,
                });
                const uploadArea = screen.getByLabelText(
                    /click to upload csv/i
                ) as HTMLInputElement;

                const blob: IBlob = new Blob([''], { type: 'text/csv' });
                blob['lastModifiedDate'] = '';
                blob['name'] = 'test.csv';

                const csvFile = blob as File;

                userEvent.upload(uploadArea, csvFile);

                if (uploadArea?.files) {
                    expect(uploadArea.files[0]).toStrictEqual(csvFile);
                }

                expect(screen.getByText('test.csv')).toBeInTheDocument();

                userEvent.click(submitButton);
                expect(
                    await screen.findByText(/upload failed. please try again later\./i)
                ).toBeInTheDocument();
            });

            it.todo('should show error message if user uploaded a file larger than 1MB');
        });
    });

    describe('The checkboxes in Repertoire Table', () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });

        it('should toggle the checkbox correctly when clicked', async () => {
            mockAxios.get.mockResolvedValue(mockData);
            renderRepertoirePage();

            let allCheckboxes: any[];

            await waitFor(() => {
                allCheckboxes = screen.getAllByRole('checkbox');

                act(() => {
                    userEvent.click(allCheckboxes[1]);
                    userEvent.click(allCheckboxes[2]);
                    userEvent.click(allCheckboxes[4]);
                    userEvent.click(allCheckboxes[5]);
                });
            });

            expect(screen.getAllByRole('checkbox', { checked: true })).toHaveLength(4);

            act(() => {
                userEvent.click(allCheckboxes[1]);
                userEvent.click(allCheckboxes[2]);
            });

            expect(screen.getAllByRole('checkbox', { checked: true })).toHaveLength(2);
        });

        it('should toggle all checkboxes if the header checkbox is clicked', async () => {
            mockAxios.get.mockResolvedValue(mockData);
            renderRepertoirePage();

            let allCheckboxes: any[];

            await waitFor(() => {
                allCheckboxes = screen.getAllByRole('checkbox');
            });

            act(() => {
                userEvent.click(allCheckboxes[0]);
            });

            expect(screen.getAllByRole('checkbox', { checked: true })).toHaveLength(6);

            act(() => {
                userEvent.click(allCheckboxes[0]);
            });

            expect(screen.queryByRole('checkbox', { checked: true })).not.toBeInTheDocument();
        });
    });

    describe('The Delete Selected Song button', () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });

        it("should not be visible if there isn't any checked checkbox", async () => {
            mockAxios.get.mockResolvedValue(mockData);
            renderRepertoirePage();
            expect(
                screen.queryByRole('button', { name: /delete selected/i })
            ).not.toBeInTheDocument();

            let allCheckboxes: any[];
            await waitFor(() => {
                allCheckboxes = screen.getAllByRole('checkbox');
                expect(allCheckboxes).toHaveLength(6);
            });

            act(() => {
                userEvent.click(allCheckboxes[1]);
                userEvent.click(allCheckboxes[3]);
            });

            const checked = screen.getAllByRole('checkbox', { checked: true });
            expect(checked).toHaveLength(2);

            expect(screen.getByRole('button', { name: /delete selected/i })).toBeInTheDocument();
        });

        it('should show modal to confirm bulk delete', async () => {
            mockAxios.get.mockResolvedValue(mockData);
            renderRepertoirePage();

            let allCheckboxes: any[];

            await waitFor(() => {
                allCheckboxes = screen.getAllByRole('checkbox');
            });

            act(() => {
                userEvent.click(allCheckboxes[1]);
                userEvent.click(allCheckboxes[2]);
            });

            const deleteSelectedButton = screen.getByRole('button', {
                name: /delete selected/i,
            });

            userEvent.click(deleteSelectedButton);

            const confirmDeleteButton = screen.getByRole('button', {
                name: /confirm delete/i,
            });

            const cancelButton = screen.getByRole('button', {
                name: /cancel/i,
            });

            expect(confirmDeleteButton).toBeInTheDocument();
            expect(cancelButton).toBeInTheDocument();
        });
    });

    describe('The Confirm Delete Selected Modal', () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });

        it('should show the correct number of songs', async () => {
            const { cancelButton } = await renderRepertoirePageWithDeleteModalOpen();

            expect(screen.getByText('2')).toBeInTheDocument();
            userEvent.click(cancelButton);

            let allCheckboxes: any[];
            await waitFor(() => {
                allCheckboxes = screen.getAllByRole('checkbox');

                act(() => {
                    userEvent.click(allCheckboxes[0]);
                });

                const deleteSelectedButton = screen.getByRole('button', {
                    name: /delete selected/i,
                });
                userEvent.click(deleteSelectedButton);

                expect(screen.getByText('5')).toBeInTheDocument();
            });
        });

        it('should close the Confirm Modal if Cancel button is clicked', async () => {
            const { cancelButton } = await renderRepertoirePageWithDeleteModalOpen();
            userEvent.click(cancelButton);
            expect(screen.queryByRole('button', { name: /cancel/i })).not.toBeInTheDocument();
        });

        it('should close the Confirm Modal and call bulk delete function if Confirm Delete button is clicked', async () => {
            const { confirmDeleteButton } = await renderRepertoirePageWithDeleteModalOpen();

            mockAxios.get.mockResolvedValue({
                data: {
                    songs: [
                        { id: 3, title: 'Song 3' },
                        { id: 4, title: 'Song 4' },
                        { id: 5, title: 'Song 5' },
                    ],
                },
            });

            userEvent.click(confirmDeleteButton);

            await waitFor(() => {
                expect(
                    screen.queryByRole('button', { name: /confirm delete/i })
                ).not.toBeInTheDocument();
                expect(
                    screen.queryByRole('button', { name: /delete selected/i })
                ).not.toBeInTheDocument();

                const allCheckboxes = screen.getAllByRole('checkbox');
                expect(allCheckboxes).toHaveLength(4);
            });

            expect(axios.delete).toBeCalledTimes(1);
            expect(axios.get).toBeCalled();
            expect(axios.delete).toBeCalledWith('/api/v1/songs', {
                data: { idArray: [1, 2] },
            });
        });

        it('should uncheck the header box if boxes are checked with it after Confirm Delete button is clicked', async () => {
            await renderRepertoirePage();

            mockAxios.get.mockResolvedValue({
                data: {
                    songs: [
                        { id: 3, title: 'Song 3' },
                        { id: 4, title: 'Song 4' },
                        { id: 5, title: 'Song 5' },
                    ],
                },
            });

            let allCheckboxes: any[];

            await waitFor(() => {
                allCheckboxes = screen.getAllByRole('checkbox');

                act(() => {
                    userEvent.click(allCheckboxes[0]);
                });
            });

            const deleteSelectedButton = screen.getByRole('button', {
                name: /delete selected/i,
            });
            userEvent.click(deleteSelectedButton);
            mockAxios.get.mockResolvedValue({
                data: {
                    songs: [],
                },
            });

            const confirmDeleteButton = screen.getByRole('button', {
                name: /confirm delete/i,
            });
            userEvent.click(confirmDeleteButton);

            const headerCheckbox = await screen.findByRole('checkbox');
            expect(deleteSelectedButton).not.toBeInTheDocument();
            expect(headerCheckbox).not.toBeChecked();
        });

        it('should show error message if Confirm Delete fails', async () => {
            mockAxios.delete.mockRejectedValue({});
            const { confirmDeleteButton } = await renderRepertoirePageWithDeleteModalOpen();

            userEvent.click(confirmDeleteButton);

            expect(mockAxios.delete).toBeCalledTimes(1);
            expect(await screen.findByText(/something went wrong. please try again later.*/i));
        });
    });

    describe('The behaviour of Action Popup', () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });

        it('should show Confirm Delete Modal and call the delete function', async () => {
            const { deleteSongIcon } = await renderRepertoirePageAndHoverOnFirstRow();

            userEvent.click(deleteSongIcon);
            expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument();
            expect(screen.getByRole('button', { name: /confirm delete/i })).toBeInTheDocument();

            userEvent.click(screen.getByRole('button', { name: /confirm delete/i }));
            expect(mockAxios.delete).toBeCalledTimes(1);
        });

        it('should hide Delete Selected if checked song is deleted instead and no other songs are selected', async () => {
            mockAxios.get.mockResolvedValue(mockData);
            renderRepertoirePage();

            let allCheckboxes: HTMLElement[];

            await waitFor(() => {
                allCheckboxes = screen.getAllByRole('checkbox');
                userEvent.click(allCheckboxes[1]);
            });

            userEvent.hover(screen.getByText('Song 1'));
            const deleteSongIcon = screen.getByText('delete');

            userEvent.click(deleteSongIcon);

            mockAxios.delete.mockResolvedValue({});
            const confirmDeleteButton = screen.getByRole('button', {
                name: /confirm delete/i,
            });

            userEvent.click(confirmDeleteButton);

            await waitFor(() => {
                expect(
                    screen.queryByRole('button', { name: /delete selected/i })
                ).not.toBeInTheDocument();
            });
        });

        it('should keep the other checked songs if one of the songs is deleted', async () => {
            mockAxios.get.mockResolvedValue(mockData);
            renderRepertoirePage();

            const allCheckboxes = await screen.findAllByRole('checkbox');

            act(() => {
                userEvent.click(allCheckboxes[0]);
            });

            userEvent.hover(screen.getByText('Song 2'));
            const deleteSongIcon = screen.getByText('delete');

            userEvent.click(deleteSongIcon);

            mockAxios.delete.mockResolvedValue({});
            const confirmDeleteButton = screen.getByRole('button', {
                name: /confirm delete/i,
            });

            userEvent.click(confirmDeleteButton);

            expect(
                await screen.findByRole('button', { name: /delete selected/i })
            ).toBeInTheDocument();
            expect(screen.getAllByRole('checkbox', { checked: true })).toHaveLength(4);
        });

        it('should show error message if the delete function fails', async () => {
            mockAxios.get.mockResolvedValue(mockData);
            renderRepertoirePage();

            const allCheckboxes = await screen.findAllByRole('checkbox');

            act(() => {
                userEvent.click(allCheckboxes[1]);
                userEvent.click(allCheckboxes[2]);
            });

            userEvent.unhover(allCheckboxes[2]);

            userEvent.hover(screen.getByText('Song 1'));

            const deleteSongIcon = screen.getByText('delete');
            userEvent.click(deleteSongIcon);

            mockAxios.delete.mockRejectedValue({});
            const confirmDeleteButton = screen.getByRole('button', {
                name: /confirm delete/i,
            });
            userEvent.click(confirmDeleteButton);

            expect(
                await screen.findByText(/something went wrong\. please try again later.*/i)
            ).toBeInTheDocument();
        });
    });
});
