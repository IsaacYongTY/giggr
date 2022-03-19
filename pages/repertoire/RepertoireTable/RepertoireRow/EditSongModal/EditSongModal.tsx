import React, { useState, ChangeEvent, useMemo } from 'react';
import classnames from 'classnames/bind';
import Modal from 'react-modal';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import isChinese from 'is-chinese';

import { Form, Song } from 'common/types';

import MetaToolForm from 'components/MetaToolForm';
import Metronome from 'components/Metronome';
import { MetatoolSongMetadata } from 'common/types';
import { deriveMetatoolSongMetadata } from 'common/utils';
import { defaultSongForm } from './constants';
import { getInitialism, getRomTitle } from './utils';
import EditSongDetailForm from './EditSongDetailForm';

import styles from './EditSongModal.module.scss';
import 'react-tabs/style/react-tabs.css';

const cx = classnames.bind(styles);

type Props = {
    isModalOpen: boolean;
    song: Song;
    data: any;
    handleCloseModal: () => void;
};

export default function EditSongModal({
    isModalOpen,
    song,
    data,
    handleCloseModal,
}: Props) {
    const [form, setForm] = useState<Form>(defaultSongForm);

    const metatoolSongMetadata: MetatoolSongMetadata = useMemo(
        () => deriveMetatoolSongMetadata(form),

        [form]
    );

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '85rem',
            height: '80rem',
            padding: '5rem',
        },
    };

    function handleInput(e: ChangeEvent<HTMLInputElement>) {
        const userInput = e.target.value;
        setForm((prevState) => ({
            ...prevState,
            [e.target.name]: userInput,
        }));
    }

    function handleUpdateInitialismAndRomTitleWhenBlur() {
        if (!form.title) {
            return;
        }

        const title = form.title;
        if (!isChinese(form.title)) {
            setForm((prevState) => ({
                ...prevState,
                initialism: getInitialism(title),
            }));
            return;
        }

        const romTitle = getRomTitle(form.title);
        setForm((prevState) => ({
            ...prevState,
            initialism: getInitialism(romTitle),
            romTitle,
        }));
    }

    const handleMetadataChange = (metatool: MetatoolSongMetadata) => {
        setForm((prevState) => ({
            ...prevState,
            ...metatool,
        }));
    };

    return (
        <Modal isOpen={isModalOpen} style={customStyles} ariaHideApp={false}>
            <div className={cx('container')}>
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
                        <EditSongDetailForm
                            form={form}
                            handleCloseModal={handleCloseModal}
                            setForm={setForm}
                            handleInput={handleInput}
                            data={data}
                            song={song}
                            isModalOpen={isModalOpen}
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

                        <div className={cx('button-row')}>
                            <button
                                className="btn btn-danger"
                                onClick={handleCloseModal}
                            >
                                Close
                            </button>
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <Metronome defaultTempo={form.tempo || 70} />

                        <div className={cx('button-row')}>
                            <button
                                className="btn btn-danger"
                                onClick={handleCloseModal}
                            >
                                Close
                            </button>
                        </div>
                    </TabPanel>
                </Tabs>
            </div>
        </Modal>
    );
}
