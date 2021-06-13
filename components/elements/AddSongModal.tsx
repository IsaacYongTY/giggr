import React, {useState, useEffect} from "react";
import SpotifySearchBar from "../common/SpotifySearchBar";
import Modal from "react-modal";
import styles from "../../assets/scss/components/_add-song-modal.module.scss";
import AlertBox from "../common/AlertBox";
import axios from "axios";
import {convertDurationToMinSec, convertKeyModeIntToKey, convertMinSecToMs, loadRepertoire} from "../../lib/library";
import {log} from "util";
import PillButton from "../PillButton";

export default function AddSongModal({ isModalOpen, setIsModalOpen, type, song, database, setSongs, musicians }: any) {

    const [formValue, setFormValue] = useState<any>({})
    const [isAlertOpen, setIsAlertOpen] = useState(false)
    const [composers, setComposers] = useState("")
    let url = `/api/v1/songs/`

    if(database === 'master') {
        url = `api/v1/admin/songs`
    }

    useEffect(() => {
        if(type === 'edit') {
            let { title, artist, romTitle, key, mode, tempo, durationMs, timeSignature, language, spotifyLink, youtubeLink, composers } = song || {}
            let value = {
                title,
                romTitle,
                artist: artist?.name,
                key: convertKeyModeIntToKey(key, mode),
                tempo,
                durationMinSec: convertDurationToMinSec(durationMs),
                timeSignature,
                language: language?.name,
                spotifyLink,
                youtubeLink,
                composers
            }
            setFormValue(value)
        }
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
            padding: '3rem'
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
            // sendData.composers = sendData.composers.split(',').map((composer : any) => composer.trim())
            // sendData.durationMs = convertMinSecToMs(formValue.durationMinSec)
            console.log(formValue)
            let response = await axios.post(url, formValue, {
                withCredentials: true,

            })

            setIsAlertOpen(true)

            let refreshedSongs = await loadRepertoire(database)
            setSongs(refreshedSongs)

            handleCloseModal()

            setTimeout(() => {
                setIsAlertOpen(false)
            }, 5000)


        } catch (error) {
            console.log(error)
        }
    }

    async function handleAddComposer() {

    }
    async function handleEditSong(id : number) {

        try {
            let sendData = { ...formValue}
            console.log(url)
            console.log(sendData)

            // sendData.composers = sendData.composers.split(',').map((composer : any) => composer.trim())
            await axios.patch(`${url}/${id}`, sendData, {
                withCredentials: true,
            })

            let refreshedSongs = await loadRepertoire(database)
            console.log(refreshedSongs)
            setSongs(refreshedSongs)

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


        >

            <input className={styles.titleInput} placeholder="Title" name="title" onChange={handleInput} value={formValue.title}/>


            { type === "add" && <SpotifySearchBar setFormValue={setFormValue} database={database}/> }

            <label>Artist:</label>
            <input className="form-control" name="artist" onChange={handleInput} value={formValue.artist} />

            <label>Romanized Title:</label>
            <input className="form-control" name="romTitle" onChange={handleInput} value={formValue.romTitle} />

            <label>Key:</label>
            <input className="form-control" name="key" onChange={handleInput} value={formValue?.key}/>

            <label>Tempo:</label>
            <input className="form-control" name="tempo" onChange={handleInput} value={formValue.tempo}/>

            <label>Duration:</label>
            <input className="form-control" name="durationMinSec" onChange={handleInput} value={formValue.durationMinSec}/>

            <label>Time Signature:</label>
            <input className="form-control" name="timeSignature" onChange={handleInput} value={formValue.timeSignature}/>

            <label>Language:</label>
            <input className="form-control" name="language" onChange={handleInput} value={formValue.language}/>

            <label>Composer:</label>
            <select name="musicians">
                {
                    musicians?.map((musician: any) => (
                        <option key={musician.id}>{musician.name}</option>
                    ))
                }
            </select>
            <div className={styles.pillButtonRow}>
                {
                    formValue?.composers?.map((composer: any) => (
                        <PillButton composer={composer} setMusicians={setComposers} />

                    ))
                }
            </div>

            {/*<input className="form-control" name="composers" onChange={(e) => setComposer(e.target.value)} />*/}
            <button onClick={handleAddComposer}>Add</button>
            <label>Spotify Link:</label>
            <input className="form-control" name="spotifyLink" onChange={handleInput} value={formValue.spotifyLink}/>

            <label>YouTube Link:</label>
            <input className="form-control" name="youtubeLink" onChange={handleInput} value={formValue.youtubeLink}/>
            {
                type === 'edit'
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

        </Modal>
    )
}