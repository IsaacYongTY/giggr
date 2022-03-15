import React, { Dispatch, SetStateAction, useState } from 'react';
import classnames from 'classnames/bind';
import { mutate, trigger } from 'swr';
import axios from 'config/axios';
import { message } from 'antd';

import SpotifySearchBar from '../SpotifySearchBar';
import KeysDropdown from 'components/common/KeysDropdown';
import ButtonWithLoader from 'components/common/ButtonWithLoader';
import ArtistsSingleDropdown from 'components/repertoire/AddSongModal/ArtistsSingleDropdown';
import LanguagesSingleDropdown from 'components/repertoire/AddSongModal/LanguagesSingleDropdown';
import MusiciansMultiSelectDropdown from 'components/repertoire/AddSongModal/MusiciansMultiSelectDropdown';
import CategoriesDropdown from 'components/repertoire/AddSongModal/CategoriesDropdown';
import SingleDropdown from 'components/repertoire/AddSongModal/SingleDropdown';

import { Form, Musician, Song } from 'common/types';

import {
    convertDurationMsToMinSec,
    convertKeyModeIntToKey,
    convertKeyToKeyModeInt,
    convertRelativeKey,
} from 'common/utils';
import { convertSongFormToTempSong } from './utils';

import styles from './SongDetailForm.module.scss';

const cx = classnames.bind(styles);

type Option = {
    value: string;
    label: string;
};

interface Data {
    songs: Song[];
    musicians: Musician[];
    genres: { id: number; name: string }[];
    tags: { id: number; name: string }[];
    moods: { id: number; name: string }[];
    languages: { id: number; name: string }[];
}

type SongDetailFormProps = {
    form: Form;
    setForm: Dispatch<SetStateAction<Form>>;
    handleCloseModal: () => void;
    data: Data;
    handleInput: any;
};

export default function SongDetailForm({
    form,
    handleCloseModal,
    setForm,
    data, // TODO: to refactor data, we get musicians from context or call the endpoint here
    handleInput,
}: SongDetailFormProps) {
    const [isLoading, setIsLoading] = useState(false);

    async function handleAddSong({
        closeModal = false,
    }: { closeModal?: boolean } = {}) {
        setIsLoading(true);
        try {
            const { composers, songwriters, arrangers, genres, moods, tags } =
                form;

            const editedForm = {
                ...form,
                composers: composers?.map((composer: Option) => composer.value),
                songwriters: songwriters?.map(
                    (songwriter: Option) => songwriter.value
                ),
                arrangers: arrangers?.map((arranger: Option) => arranger.value),
                genres: genres?.map((genre: Option) => genre.value),
                moods: moods?.map((mood: Option) => mood.value),
                tags: tags?.map((tag: Option) => tag.value),
            };

            const tempSong = convertSongFormToTempSong(form);

            data.songs.push(tempSong);

            mutate('/api/v1/users?category=id&order=ASC', data, false);

            if (closeModal) {
                handleCloseModal();
            }

            setIsLoading(false);

            await axios.post('/api/v1/songs', editedForm);
            message.success('Added successfully');

            trigger('/api/v1/users?category=id&order=ASC');
        } catch (error) {
            setIsLoading(false);
            console.log('went wrong');
            console.log(error);
        }
    }

    async function getFromSpotify(trackId: string) {
        const { data } = await axios.post(
            `/api/v1/songs/spotify?trackId=${trackId}`
        );

        const songData = data.result;

        songData.durationMinSec = convertDurationMsToMinSec(
            songData.durationMs
        );
        setForm({
            ...songData,
        });
    }

    const handleKeysDropdownChange = (keyString: string) => {
        const [selectedKey, selectedMode] = convertKeyToKeyModeInt(keyString);
        setForm((prevState) => ({
            ...prevState,
            key: selectedKey,
            mode: selectedMode,
        }));
    };

    const handleMyKeysDropdownChange = (keyString: string) => {
        const [selectedKey, selectedMode] = convertKeyToKeyModeInt(keyString);
        setForm((prevState) => ({
            ...prevState,
            myKey: selectedKey,
            mode: selectedMode,
        }));
    };

    const handleIsMinorToggle = () => {
        const currentKeyString = convertKeyModeIntToKey(form.key, form.mode);
        const relativeMinor = convertRelativeKey(currentKeyString);
        const [key, mode] = convertKeyToKeyModeInt(relativeMinor);

        const currentMyKeyString = convertKeyModeIntToKey(
            form.myKey,
            form.mode
        );
        const relativeMyKeyMinor = convertRelativeKey(currentMyKeyString);
        const [myKey] = convertKeyToKeyModeInt(relativeMyKeyMinor);

        setForm((prevState) => ({
            ...prevState,
            key,
            myKey,
            mode,
        }));
    };

    return (
        <div>
            <SpotifySearchBar getFromSpotify={getFromSpotify} />

            <div className={cx('form-row')}>
                <label>
                    Artist:
                    <ArtistsSingleDropdown
                        musicians={data.musicians.filter(
                            (musician) => musician.isArtist
                        )}
                        selectedArtist={form.artist || ''}
                        setFormValue={setForm}
                    />
                </label>
            </div>

            <div className={cx('form-row')}>
                <KeysDropdown
                    label="Key"
                    handleKeysDropdownChange={handleKeysDropdownChange}
                    selectedKey={convertKeyModeIntToKey(form.key, form.mode)}
                    handleIsMinorToggle={handleIsMinorToggle}
                />

                <KeysDropdown
                    label="My Key"
                    handleKeysDropdownChange={handleMyKeysDropdownChange}
                    selectedKey={convertKeyModeIntToKey(form.myKey, form.mode)}
                    handleIsMinorToggle={handleIsMinorToggle}
                    showIsMinorCheckbox={false}
                />

                <label>
                    Tempo:
                    <input
                        className="form-control"
                        name="tempo"
                        type="number"
                        onChange={handleInput}
                        value={form.tempo || ''}
                    />
                </label>

                <label>
                    Duration:
                    <input
                        className="form-control"
                        name="durationMinSec"
                        onChange={handleInput}
                        placeholder="m:ss"
                        value={form.durationMinSec}
                    />
                </label>

                <label>
                    Time Signature:
                    <input
                        className="form-control"
                        name="timeSignature"
                        onChange={handleInput}
                        placeholder="4/4"
                        value={form.timeSignature}
                    />
                </label>
            </div>

            <div className={cx('form-row')}>
                <label>
                    Language:
                    <LanguagesSingleDropdown
                        options={data?.languages}
                        currentSelection={form.language || ''}
                        setFormValue={setForm}
                    />
                </label>

                <label>
                    Status:
                    <SingleDropdown
                        name="status"
                        options={['New', 'In Progress', 'Learned', 'Charted']}
                        currentSelection={form.status || ''}
                        setFormValue={setForm}
                    />
                </label>

                <label>
                    Romanized Title:
                    <input
                        className="form-control"
                        name="romTitle"
                        onChange={handleInput}
                        value={form.romTitle}
                    />
                </label>

                <label>
                    Initialism:
                    <input
                        className="form-control"
                        name="initialism"
                        onChange={handleInput}
                        value={form.initialism}
                    />
                </label>

                <label>
                    Date Released:
                    <input
                        className="form-control"
                        name="dateReleased"
                        onChange={handleInput}
                        value={form.dateReleased}
                    />
                </label>
            </div>

            <div className={cx('form-row')}>
                <MusiciansMultiSelectDropdown
                    label="Composers"
                    role="composers"
                    musicians={data.musicians.filter(
                        (musician) => musician.isComposer
                    )}
                    selectedMusicians={form.composers || []}
                    setFormValue={setForm}
                />
                <MusiciansMultiSelectDropdown
                    label="Songwriters"
                    role="songwriters"
                    musicians={data.musicians.filter(
                        (musician) => musician.isSongwriter
                    )}
                    selectedMusicians={form.songwriters || []}
                    setFormValue={setForm}
                />
            </div>

            <div className={cx('form-row')}>
                <MusiciansMultiSelectDropdown
                    label="Arrangers"
                    role="arrangers"
                    musicians={data.musicians.filter(
                        (musician) => musician.isArranger
                    )}
                    selectedMusicians={form.arrangers || []}
                    setFormValue={setForm}
                />
                <CategoriesDropdown
                    label="Genres"
                    role="genres"
                    categories={data?.genres}
                    selectedCategories={form.genres || []}
                    setFormValue={setForm}
                />
            </div>

            <div className={cx('form-row')}>
                <CategoriesDropdown
                    label="Moods"
                    role="moods"
                    categories={data?.moods}
                    selectedCategories={form.moods || []}
                    setFormValue={setForm}
                />
                <CategoriesDropdown
                    label="Tags"
                    role="tags"
                    categories={data?.tags}
                    selectedCategories={form.tags || []}
                    setFormValue={setForm}
                />
            </div>

            <div className={cx('form-row', 'flex-end')}>
                <label>
                    Spotify Link:
                    <input
                        className="form-control"
                        name="spotifyLink"
                        onChange={handleInput}
                        value={form.spotifyLink}
                    />
                </label>
            </div>

            <div className={cx('form-row')}>
                <label>
                    YouTube Link:
                    <input
                        className="form-control"
                        name="youtubeLink"
                        onChange={handleInput}
                        value={form.youtubeLink}
                    />
                </label>

                <label>
                    Other Link:
                    <input
                        className="form-control"
                        name="otherLink"
                        onChange={handleInput}
                        value={form.otherLink}
                    />
                </label>
            </div>

            <br />
            <div className={cx('form-row')}>
                <label>
                    Energy:
                    <input
                        type="number"
                        name="energy"
                        disabled={true}
                        className="form-control"
                        value={form.energy}
                    />
                </label>
                <label>
                    Danceability:
                    <input
                        type="number"
                        name="danceability"
                        disabled={true}
                        className="form-control"
                        value={form.danceability}
                    />
                </label>
                <label>
                    Valence:
                    <input
                        type="number"
                        name="valence"
                        disabled={true}
                        className="form-control"
                        value={form.valence}
                    />
                </label>
                <label>
                    Acousticness:
                    <input
                        type="number"
                        name="acousticness"
                        disabled={true}
                        className="form-control"
                        value={form.acousticness}
                    />
                </label>
                <label>
                    Instrumentalness:
                    <input
                        type="number"
                        name="instrumentalness"
                        disabled={true}
                        className="form-control"
                        value={form.instrumentalness}
                    />
                </label>
            </div>

            <div className={cx('button-row')}>
                <button
                    className="btn btn-danger-outlined"
                    onClick={handleCloseModal}
                >
                    Close
                </button>
                <ButtonWithLoader
                    onClick={() => handleAddSong()}
                    isLoading={isLoading}
                    label="Save and Close"
                    primary={true}
                />
            </div>
        </div>
    );
}
