import React, {useState, Dispatch, SetStateAction, ChangeEvent} from "react";
import Modal from "react-modal";
import styles from "../../assets/scss/components/repertoire/_add-song-modal.module.scss";
import AlertBox from "../common/AlertBox";

// @ts-ignore
import isChinese from "is-chinese"
import Song from "../../lib/types/song";
import Form from "../../lib/types/Form";

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import MetaToolForm from "../common/MetaToolForm";
import Metronome from "../common/Metronome";
import SongDetailForm from "../common/SongDetailForm";
import getInitialism from "../../lib/utils/get-initialism";
import getRomTitle from "../../lib/utils/get-rom-title";

type Props = {
    isModalOpen: boolean,
    setIsModalOpen: Dispatch<SetStateAction<boolean>>
    type: string
    song?: Song
    database: string
    user: any
    data: any
}


export default function AddSongModal({ isModalOpen, setIsModalOpen, type, database, song, data, user }: Props) {

    const [alertOptions, setAlertOptions] = useState({message: "", type: ""})
    const [form, setForm] = useState<Form>({})

    const customStyles = {
        content : {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '85rem',
            height: '80rem',
            padding: '5rem',
        }
    };
    
    function handleInput(e : ChangeEvent<HTMLInputElement>) {
        const userInput = e.target.value
        setForm((prevState : any) => ({...prevState, [e.target.name]: userInput}))
    }

    function handleCloseModal() {
        setForm({})
        setIsModalOpen(false)
        setAlertOptions({
            message: "",
            type: ""
        })
    }

    function handleUpdateInitialismAndRomTitleWhenBlur() {
        if(!form.title) {
            return
        }

        const title = form.title
        if(!isChinese(form.title)) {
            setForm(prevState => ({...prevState, initialism: getInitialism(title) }))
            return
        }

        const romTitle = getRomTitle(form.title)
        setForm(prevState => ({...prevState, initialism: getInitialism(romTitle), romTitle}))


    }

    return (
        <Modal
            isOpen={isModalOpen}
            style={customStyles}
            ariaHideApp={false}
        >


            <div className={styles.container}>

                <input
                    className={styles.titleInput}
                    placeholder="Title"
                    name="title"
                    onChange={handleInput}
                    value={form.title}
                    onBlur={handleUpdateInitialismAndRomTitleWhenBlur}
                />

                <Tabs>
                    <TabList>
                        <Tab>Details</Tab>
                        <Tab
                            // onClick={() => handleGenerateMetaData()}
                        >
                            Generate Metadata
                        </Tab>
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
                        <div className={styles.link}>
                            <a href="/utilities/progression" target="_blank">Progression Generator {">"}</a>
                        </div>

                        <div className={styles.buttonRow}>
                            <button className="btn btn-danger" onClick={handleCloseModal}>Close</button>
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <Metronome
                            defaultTempo={form.tempo || 70}
                        />

                        <div className={styles.buttonRow}>
                            <button className="btn btn-danger" onClick={handleCloseModal}>Close</button>
                        </div>
                    </TabPanel>
                </Tabs>

                <AlertBox
                    message={alertOptions.message}
                    type={alertOptions.type}
                />

            </div>


        </Modal>
    )
}
