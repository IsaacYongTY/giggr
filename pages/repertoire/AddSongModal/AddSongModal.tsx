import React, { useState, ChangeEvent, useMemo } from 'react';
import classnames from 'classnames/bind';
import { message, Modal } from 'antd';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import isChinese from 'is-chinese';
import { mutate, trigger } from 'swr';
import axios from 'config/axios';

import { Form } from 'common/types';

import MetaToolForm from 'components/MetaToolForm';
import Metronome from 'components/Metronome';
import SongDetailForm from 'components/SongDetailForm';
import ButtonWithLoader from 'components/ButtonWithLoader';
import { MetatoolSongMetadata } from 'common/types';
import { deriveMetatoolSongMetadata } from 'common/utils';
import { defaultSongForm } from './constants';
import { getInitialism, getRomTitle, convertSongFormToTempSong } from './utils';

import styles from './AddSongModal.module.scss';
import 'react-tabs/style/react-tabs.css';

const cx = classnames.bind(styles);

type Option = {
    value: string;
    label: string;
};

type Props = {
    visible: boolean;
    onClose: () => void;
    data: any;
};

export default function AddSongModal({ visible, data, onClose }: Props) {
    const [form, setForm] = useState<Form>(defaultSongForm);
    const [isLoading, setIsLoading] = useState(false);

    const metatoolSongMetadata: MetatoolSongMetadata = useMemo(
        () => deriveMetatoolSongMetadata(form),

        [form],
    );

    function handleInput(e: ChangeEvent<HTMLInputElement>) {
        const userInput = e.target.value;
        setForm((prevState) => ({
            ...prevState,
            [e.target.name]: userInput,
        }));
    }

    async function handleAddSong({
        closeModal = false,
    }: { closeModal?: boolean } = {}) {
        setIsLoading(true);
        try {
            const editedForm = {
                ...form,
                composers: form.composers?.map(
                    (composer: Option) => composer.value,
                ),
                songwriters: form.songwriters?.map(
                    (songwriter: Option) => songwriter.value,
                ),
                arrangers: form.arrangers?.map(
                    (arranger: Option) => arranger.value,
                ),
                genres: form.genres?.map((genre: Option) => genre.value),
                moods: form.moods?.map((mood: Option) => mood.value),
                tags: form.tags?.map((tag: Option) => tag.value),
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

    const handleCloseModal = () => {
        onClose();
    };

    function handleUpdateInitialismAndRomTitleWhenBlur() {
        if (!form.title) {
            return;
        }

        const title = form.title;
        const romTitle = getRomTitle(form.title);

        setForm((prevState) => ({
            ...prevState,
            initialism: getInitialism(isChinese ? romTitle : title),
            romTitle: isChinese ? romTitle : '',
        }));
    }

    const handleMetadataChange = (metatool: MetatoolSongMetadata) => {
        setForm((prevState) => ({
            ...prevState,
            ...metatool,
        }));
    };

    return (
        <Modal
            visible={visible}
            className={cx('container')}
            closable={false}
            footer={false}
            destroyOnClose={true}
        >
            <input
                className={cx('title-input')}
                placeholder="Title"
                name="title"
                onChange={handleInput}
                value={form.title}
                onBlur={handleUpdateInitialismAndRomTitleWhenBlur}
            />

            <Tabs>
                <TabList>
                    <Tab>Details</Tab>
                    <Tab>Generate Metadata</Tab>
                    <Tab>Metronome</Tab>
                </TabList>

                <TabPanel>
                    <SongDetailForm
                        form={form}
                        setForm={setForm}
                        handleInput={handleInput}
                        data={data}
                        handleAddSong={handleAddSong}
                        isLoading={isLoading}
                    />
                </TabPanel>
                <TabPanel>
                    <MetaToolForm
                        metadata={metatoolSongMetadata}
                        handleMetadataChange={handleMetadataChange}
                    />
                    <div className={cx('link')}>
                        <a href="/utilities/progression" target="_blank">
                            Progression Generator {'>'}
                        </a>
                    </div>
                </TabPanel>
                <TabPanel>
                    <Metronome defaultTempo={form.tempo || 70} />
                </TabPanel>
            </Tabs>
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
        </Modal>
    );
}
