import React, {useState, useEffect, Dispatch, SetStateAction } from "react";
import SpotifySearchBar from "../common/SpotifySearchBar";
import Modal from "react-modal";
import styles from "../../assets/scss/components/repertoire/_add-song-modal.module.scss";
import AlertBox from "../common/AlertBox";

import Musician from "../../lib/types/musician";
import Song from "../../lib/types/song";
import Form from "../../lib/types/Form";

import generateMetaData from "../../lib/utils/generate-metadata";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import MetaToolForm from "../common/MetaToolForm";
import Metronome from "../common/Metronome";
import SongDetailForm from "../common/SongDetailForm";





type Props = {
    isModalOpen: boolean,
    setIsModalOpen: Dispatch<SetStateAction<boolean>>
    type: string
    song?: Song
    database: string
    setSongs: Dispatch<SetStateAction<Song[]>>
    musicians: Musician[]
    setMusicians: Dispatch<SetStateAction<Musician[]>>
    user: any
    data: any
}


export default function AddSongModal({ isModalOpen, setIsModalOpen, type, database, song, setSongs, musicians, setMusicians, data, user }: Props) {

    const [alertMessage, setAlertMessage] = useState("")
    const [alertType, setAlertType] = useState("")
    const [form, setForm] = useState<Form>({})

    const [metadata, setMetadata] = useState("")

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
    
    function handleInput(e : any) {
        setForm((prevState : any) => ({...prevState, [e.target.name]: e.target.value}))
    }

    function handleCloseModal() {
        setForm({})
        setIsModalOpen(false)
        setMetadata("")
    }



    function handleGenerateMetaData() {
        console.log(form)
        setMetadata(generateMetaData(form, 2))
        console.log(generateMetaData(form, 2))
    }



    return (
        <Modal
            isOpen={isModalOpen}
            style={customStyles}
            ariaHideApp={false}
        >


            <div className={styles.container}>

                <input className={styles.titleInput} placeholder="Title" name="title" onChange={handleInput} value={form.title}/>

                <Tabs>
                    <TabList>
                        <Tab>Details</Tab>
                        <Tab onClick={() => handleGenerateMetaData()}>Generate Metadata</Tab>
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
                            setSongs={setSongs}
                            setMusicians={setMusicians}
                            setAlertMessage={setAlertMessage}
                            setAlertType={setAlertType}
                            musicians={musicians}
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
                            setAlertMessage={setAlertMessage}
                            setAlertType={setAlertType}
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


                {
                    alertMessage &&
                    <AlertBox alertMessage={alertMessage} setAlertMessage={setAlertMessage} type={alertType}/>
                }



            </div>


        </Modal>
    )
}
