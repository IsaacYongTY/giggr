import React from "react";
import SpotifySearchBar from "./SpotifySearchBar";
import Modal from "react-modal";
import styles from "./AddSongModal.module.scss";

export default function AddSongModal({isModalOpen, setIsModalOpen}: any) {

    const customStyles = {
        content : {
            top                   : '50%',
            left                  : '50%',
            right                 : 'auto',
            bottom                : 'auto',
            marginRight           : '-50%',
            transform             : 'translate(-50%, -50%)',
            width: '80rem',
            height: '80rem'
        }
    };

    return (
        <Modal
            isOpen={isModalOpen}
            style={customStyles}
        >
            <h3>Add Song</h3>
            <SpotifySearchBar />
            <button className="btn btn-primary" onClick={() => setIsModalOpen(false)}>Close</button>
        </Modal>
    )
}