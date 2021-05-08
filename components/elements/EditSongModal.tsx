import React, { useState, useEffect } from "react";
import SpotifySearchBar from "./SpotifySearchBar";
import Modal from "react-modal";
import styles from "./AddSongModal.module.scss";
import AlertBox from "./AlertBox";

export default function AddSongModal({isModalOpen, setIsModalOpen}: any) {

    const [formValue, setFormValue] = useState<any>({})

    useEffect(() => {
        setFormValue({})
    },[])

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

    return (
        <Modal
            isOpen={isModalOpen}
            style={customStyles}
        >

            <input className={styles.titleInput} placeholder="Title" onChange={handleInput} defaultValue={formValue.title}/>


            {/*<SpotifySearchBar setFormValue={setFormValue}/>*/}
            {/*<label>Title:</label>*/}
            {/*<input className="form-control" name="title"/>*/}

            <label>Artist:</label>
            <input className="form-control" name="artist" onChange={handleInput} defaultValue={formValue.artist} />

            <label>Key:</label>
            <input className="form-control" name="key" onChange={handleInput} defaultValue={formValue?.key}/>

            <label>Tempo:</label>
            <input className="form-control" name="tempo" onChange={handleInput} defaultValue={formValue.tempo}/>

            <label>Duration:</label>
            <input className="form-control" name="duration" onChange={handleInput} defaultValue={formValue.durationMinSec}/>

            <label>Time Signature:</label>
            <input className="form-control" name="timeSignature" onChange={handleInput} defaultValue={formValue.time}/>

            <label>Language:</label>
            <input className="form-control" name="language" onChange={handleInput} defaultValue={formValue.language}/>

            <label>Composer:</label>
            <input className="form-control" name="composer" />

            <label>Spotify Link:</label>
            <input className="form-control" name="spotifyLink" onChange={handleInput} defaultValue={formValue.spotifyLink}/>
            <button className="btn btn-primary" onClick={() => console.log("add song to database")}>Add</button>
            <br />
            <button className="btn btn-danger" onClick={handleCloseModal}>Close</button>
            <button className="btn btn-primary" onClick={() => console.log("generate metadata head")}>Generate Metadata Head</button>
            <AlertBox />
        </Modal>
    )
}