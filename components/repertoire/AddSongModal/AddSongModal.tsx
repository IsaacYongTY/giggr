import React, { useState, Dispatch, SetStateAction, ChangeEvent } from 'react';
import classnames from 'classnames/bind';

import Modal from 'react-modal';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import isChinese from 'is-chinese';

import Song from '../../../lib/types/song';
import Form from '../../../lib/types/Form';

import MetaToolForm from '../../common/MetaToolForm';
import Metronome from '../../common/Metronome';
import SongDetailForm from '../../common/SongDetailForm';
import getInitialism from '../../../lib/utils/get-initialism';
import getRomTitle from '../../../lib/utils/get-rom-title';

import styles from './AddSongModal.module.scss';
import 'react-tabs/style/react-tabs.css';

const cx = classnames.bind(styles);

type Props = {
    isModalOpen: boolean;
    setIsModalOpen: Dispatch<SetStateAction<boolean>>;
    type: string;
    song?: Song;
    database: string;
    user: any;
    data: any;
};

export default function AddSongModal({
    isModalOpen,
    setIsModalOpen,
    type,
    database,
    song,
    data,
    user,
}: Props) {
    const [form, setForm] = useState<Form>({});
    const [, setAlertOptions] = useState({ message: '', type: '' });

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
        setForm((prevState: any) => ({
            ...prevState,
            [e.target.name]: userInput,
        }));
    }

    function handleCloseModal() {
        setForm({});
        setIsModalOpen(false);
        setAlertOptions({
            message: '',
            type: '',
        });
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
                        <SongDetailForm
                            type={type}
                            database={database}
                            form={form}
                            user={user}
                            handleCloseModal={handleCloseModal}
                            song={song}
                            setAlertOptions={setAlertOptions}
                            setForm={setForm}
                            handleInput={handleInput}
                            data={data}
                            isModalOpen={isModalOpen}
                        />
                    </TabPanel>
                    <TabPanel>
                        <MetaToolForm
                            formValue={form}
                            setFormValue={setForm}
                            setAlertOptions={setAlertOptions}
                        />
                        <div className={cx('link')}>
                            <a href="/utilities/progression" target="_blank">
                                Progression Generator {'>'}
                            </a>
                        </div>

                        <div className={styles.buttonRow}>
                            <button className="btn btn-danger" onClick={handleCloseModal}>
                                Close
                            </button>
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <Metronome defaultTempo={form.tempo || 70} />

                        <div className={styles.buttonRow}>
                            <button className="btn btn-danger" onClick={handleCloseModal}>
                                Close
                            </button>
                        </div>
                    </TabPanel>
                </Tabs>
            </div>
        </Modal>
    );
}
