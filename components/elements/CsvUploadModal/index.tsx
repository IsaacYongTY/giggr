import React, { ChangeEvent, useState, useRef } from "react"
import axios from "axios";
import FormData from "form-data";
import styles from "./CsvRow.module.scss"
import Modal from "react-modal";

export default function CsvUploadModal({ isModalOpen, setIsModalOpen, database } : { database : string, setIsModalOpen: any, isModalOpen : boolean }) {

    const [csvFile, setCsvFile] = useState<File>()
    const fileUploadInput = useRef(null);
    function handleOnChange(e: ChangeEvent<HTMLInputElement>) {

        if(e.target.files) {
            console.log(e.target.files[0])
            setCsvFile(e.target.files[0])
        }
    }

    function handleCloseModal() {
        setIsModalOpen(false)
    }



    async function handleCsvSubmit() {
        console.log(csvFile)

        if(csvFile) {
            let url = `/api/v1/songs/csv`

            if(database === 'master') {
                url = `/api/v1/admin/songs/csv`
            }

            let formData = new FormData()
            formData.append("file", csvFile)
            await axios.post(url, formData, {
                withCredentials: true,
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
        }

    }


    return (
        <Modal
            isOpen={isModalOpen}
            className={styles.modal}
        >
            <div className={`${styles.container}`}>
                <span className={`material-icons ${styles.cancelButton}`} onClick={handleCloseModal}>
                    close
                </span>
                <label  className={styles.customUpload} ref={fileUploadInput}>
                    <input  ref={fileUploadInput} type="file" name="file" onChange={handleOnChange} accept=".csv"/>
                    <span className="material-icons">
                        file_upload
                    </span>
                    <div>{csvFile ? csvFile.name : "Click to Upload CSV"}</div>
                </label>


                <button className="btn btn-primary" onClick={handleCsvSubmit}>Submit</button>
            </div>
        </Modal>

    )
}