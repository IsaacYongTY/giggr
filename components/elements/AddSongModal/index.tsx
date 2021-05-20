import React, {useState, useEffect} from "react";
import SpotifySearchBar from "../SpotifySearchBar";
import Modal from "react-modal";
import styles from "./AddSongModal.module.scss";
import AlertBox from "../AlertBox";
import axios from "axios";
import { loadRepertoire } from "../../../lib/library";

export default function AddSongModal({ isModalOpen, setIsModalOpen, type, song, database, setSongs }: any) {

    const [formValue, setFormValue] = useState<any>({})
    const [isAlertOpen, setIsAlertOpen] = useState(false)
    console.log(setSongs)
    let url = `/api/v1/songs/`

    if(database === 'master') {
        url = `api/v1/admin/songs`
    }

    useEffect(() => {
        if(type === 'edit') {
            let { title, artist, romTitle, key, tempo, durationMinSec, timeSignature, language, spotifyLink } = song || {}
            let value = {
                title,
                romTitle,
                artist: artist?.name,
                key,
                tempo,
                durationMinSec,
                timeSignature,
                language: language?.name,
                spotifyLink
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

            let response = await axios.post(url, formValue, {
                withCredentials: true,

            })

            console.log(response)
            setIsAlertOpen(true)

            let refreshedSongs = await loadRepertoire()

            setSongs(refreshedSongs)

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
            await axios.patch(`${url}/${id}`, sendData, {
                withCredentials: true,

            })
        } catch (error) {
            console.log(error)
        }

        let refreshedSongs = await loadRepertoire()
        console.log(setSongs)
        setSongs(refreshedSongs)

        handleCloseModal()
    }

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
            <input className="form-control" name="composer" />

            <label>Spotify Link:</label>
            <input className="form-control" name="spotifyLink" onChange={handleInput} value={formValue.spotifyLink}/>
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