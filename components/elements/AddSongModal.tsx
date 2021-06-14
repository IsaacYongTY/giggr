import React, {useState, useEffect, Dispatch, SetStateAction} from "react";
import SpotifySearchBar from "../common/SpotifySearchBar";
import Modal from "react-modal";
import styles from "../../assets/scss/components/_add-song-modal.module.scss";
import AlertBox from "../common/AlertBox";
import axios from "axios";
import {convertDurationToMinSec, convertKeyModeIntToKey, loadMusicians, loadRepertoire} from "../../lib/library";

import ReactMusiciansDropdown from "../ReactMusiciansDropdown";

import Musician from "../../lib/types/musician";
import Song from "../../lib/types/song";



type Option = {
    value: string,
    label: string
}

type Props = {
    isModalOpen: boolean,
    setIsModalOpen: Dispatch<SetStateAction<boolean>>
    type: string
    song?: Song
    database: string
    setSongs: Dispatch<SetStateAction<Song[]>>
    musicians: Musician[]
    setMusicians: Dispatch<SetStateAction<Musician[]>>
}


export default function AddSongModal({ isModalOpen, setIsModalOpen, type, song, database, setSongs, musicians, setMusicians }: Props) {


    const [formValue, setFormValue] = useState<any>({})
    const [isAlertOpen, setIsAlertOpen] = useState(false)
    const [composers, setComposers] = useState<Musician[]>([])
    const [songwriters, setSongwriters] = useState<Musician[]>([])
    const [arrangers, setArrangers] = useState<Musician[]>([])
    const [options, setOptions] = useState<Option[]>([])
    let url = `/api/v1/songs/`

    if(database === 'master') {
        url = `api/v1/admin/songs`
    }

    useEffect(() => {

        if(type === 'edit' && song) {
            let { title, artist, romTitle, key, mode, tempo, durationMs, timeSignature, language, spotifyLink, youtubeLink, composers, arrangers, songwriters } = song || {}
            console.log(song)
            let value = {
                title,
                romTitle: romTitle || undefined,
                artist: artist?.name,
                key: convertKeyModeIntToKey(key, mode),
                tempo,
                durationMinSec: convertDurationToMinSec(durationMs),
                timeSignature,
                language: language?.name,
                spotifyLink,
                youtubeLink: youtubeLink || undefined,
                composers,
                arrangers,
                songwriters
            }

            setComposers(song?.composers?.map((composer:any) => ({value: composer.name, label: composer.name})))
            setSongwriters(song?.songwriters?.map((songwriter:any) => ({value: songwriter.name, label: songwriter.name})))
            setArrangers(song?.arrangers?.map((arranger:any) => ({value: arranger.name, label: arranger.name})))
            setFormValue(value)
        }

        setOptions(musicians?.map((musician: Musician) => ({
            value: musician.name,
            label: musician.name
        })))

    },[isModalOpen])

    const customStyles = {
        content : {
            top                   : '50%',
            left                  : '50%',
            right                 : 'auto',
            bottom                : 'auto',
            marginRight           : '-50%',
            transform             : 'translate(-50%, -50%)',
            width: '80rem',
            height: '80rem',
            padding: '5rem'
        }
    };
    
    function handleInput(e : any) {
        setFormValue((prevState : any) => {
            return {...prevState, [e.target.name]: e.target.value}
        })
    }

    function handleCloseModal() {
        setFormValue({})
        setIsModalOpen(false)
    }

    async function handleAddSong() {
        try {
            let sendData = { ...formValue}

            console.log(formValue)
            console.log("handle add")
            sendData.composers = composers.map(composer => composer.value)
            sendData.songwriters = songwriters.map(arranger => arranger.value)
            sendData.arrangers = arrangers.map(arranger => arranger.value)

            let response = await axios.post(url, sendData, {
                withCredentials: true,

            })

            setIsAlertOpen(true)

            let refreshedSongs = await loadRepertoire(database)
            let refreshedMusicians = await loadMusicians(database)
            setSongs(refreshedSongs)
            setMusicians(refreshedMusicians)

            handleCloseModal()

            setTimeout(() => {
                setIsAlertOpen(false)
            }, 5000)


        } catch (error) {
            console.log(error)
        }
    }


    async function handleEditSong(id : number) {

        try {
            let sendData = { ...formValue}
            console.log(url)

            sendData.composers = composers.map(composer => composer.value)
            sendData.songwriters = songwriters.map(arranger => arranger.value)
            sendData.arrangers = arrangers.map(arranger => arranger.value)

            await axios.patch(`${url}/${id}`, sendData, {
                withCredentials: true,
            })

            let refreshedSongs = await loadRepertoire(database)
            let refreshedMusicians = await loadMusicians(database)

            setSongs(refreshedSongs)
            setMusicians(refreshedMusicians)

            handleCloseModal()

            setTimeout(() => {
                setIsAlertOpen(false)
            }, 5000)

        } catch (error) {
            console.log(error)
        }


    }

    console.log(formValue)

    return (
        <Modal
            isOpen={isModalOpen}
            style={customStyles}
            ariaHideApp={false}
        >

            <div className={styles.container}>
                <input className={styles.titleInput} placeholder="Title" name="title" onChange={handleInput} value={formValue.title}/>


                { type === "add" && <SpotifySearchBar setFormValue={setFormValue} database={database}/> }

                <div className={styles.formRow}>
                    <label>
                        Artist:
                        <input className="form-control" name="artist" onChange={handleInput} value={formValue.artist} />
                    </label>

                    <label>
                        Romanized Title:
                        <input className="form-control" name="romTitle" onChange={handleInput} value={formValue.romTitle} />
                    </label>
                </div>

                <div className={styles.formRow}>
                    <label>Key:
                        <input className="form-control" name="key" onChange={handleInput} value={formValue?.key}/>
                    </label>
                    <label>Tempo:
                        <input className="form-control" name="tempo" onChange={handleInput} value={formValue.tempo}/>
                    </label>


                    <label>Duration:
                        <input className="form-control" name="durationMinSec" onChange={handleInput} value={formValue.durationMinSec}/>
                    </label>

                    <label>Time Signature:
                        <input className="form-control" name="timeSignature" onChange={handleInput} value={formValue.timeSignature}/>
                    </label>
                </div>

                <div className={styles.formRow}>
                    <label>Language:
                        <input className="form-control" name="language" onChange={handleInput} value={formValue.language}/>
                    </label>
                </div>

                <div className={styles.formRow}>
                    <label>Composer:
                        <ReactMusiciansDropdown options={options} selectedMusicians={composers} setSelectedMusicians={setComposers}/>
                    </label>
                </div>

                <div className={styles.formRow}>
                    <label>Songwriters:
                        <ReactMusiciansDropdown options={options} selectedMusicians={songwriters} setSelectedMusicians={setSongwriters}/>
                    </label>
                </div>

                <div className={styles.formRow}>
                    <label>Arrangers:
                        <ReactMusiciansDropdown options={options} selectedMusicians={arrangers} setSelectedMusicians={setArrangers}/>
                    </label>
                </div>

                <div className={styles.formRow}>
                    <label>Spotify Link:
                        <input className="form-control" name="spotifyLink" onChange={handleInput} value={formValue.spotifyLink}/>
                    </label>

                    <label>YouTube Link:
                        <input className="form-control" name="youtubeLink" onChange={handleInput} value={formValue.youtubeLink}/>
                    </label>
                </div>

                {
                    type === 'edit' && song
                        ?
                        <button
                            className="btn btn-primary"
                            onClick={() => handleEditSong(song.id)}
                        >
                            Confirm Edit
                        </button>
                        :
                        <button
                            className="btn btn-primary"
                            onClick={handleAddSong}
                        >
                            Add
                        </button>
                }

                <br />
                <button className="btn btn-danger" onClick={handleCloseModal}>Close</button>
                <button className="btn btn-primary" onClick={() => console.log("generate metadata head")}>Generate Metadata Head</button>
                {
                    isAlertOpen &&
                    <AlertBox message="added successfully" timeout={5} setIsAlertOpen={setIsAlertOpen}/>
                }
            </div>


        </Modal>
    )
}
