import React, { ChangeEvent, useState, useRef } from "react"
import axios from "axios";
import FormData from "form-data";
import styles from "../../assets/scss/components/_csv-upload-modal.module.scss"
import Modal from "react-modal";
import {parseCookies} from "nookies";

export default function CsvUploadModal({ isModalOpen, setIsModalOpen, database } : { database : string, setIsModalOpen: any, isModalOpen : boolean }) {

    const [csvFile, setCsvFile] = useState<File>()
    const fileUploadInput = useRef<HTMLInputElement>(null);
    const [errorMessage, setErrorMessage] = useState("")
    const [successMessage, setSuccessMessage] = useState("")

    function handleOnChange(e: ChangeEvent<HTMLInputElement>) {

        if(e.target.files) {
            console.log(e.target.files[0])
            setCsvFile(e.target.files[0])
        }
    }

    function handleCloseModal() {
        setCsvFile(undefined)
        setErrorMessage("")
        setSuccessMessage("")
        setIsModalOpen(false)
    }



    async function handleCsvSubmit() {


        if(!csvFile) {
            setErrorMessage("Please select a .csv file before submitting")
            return
        }

        setErrorMessage("")

        let url = `/api/v1/songs/csv`


        if(database === 'master') {
            url = `/api/v1/admin/songs/csv`
        }



        try {
            let formData = new FormData()


            if(!fileUploadInput.current) {
                return
            }
            formData.append("file", fileUploadInput.current.files)

            const cookies = parseCookies()
            await axios.post(url, formData, {
                withCredentials: true,
                headers: {
                    "x-auth-token": cookies["x-auth-token"],
                    "Content-Type": "multipart/form-data"
                }
            })
            console.log('suceess')
            setSuccessMessage("CSV uploaded successfully!")
            setCsvFile(undefined)
        } catch(error) {
            console.log(error)
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
                <label  className={styles.customUpload}>
                    <input  ref={fileUploadInput} type="file" onChange={handleOnChange} name="file" accept="text/csv"/>
                    <span className="material-icons">
                        file_upload
                    </span>
                    <div>Click to Upload CSV</div>
                    {csvFile && <div> {csvFile.name}</div> }
                    {errorMessage && <div className="error-message">{errorMessage}</div>}
                    {successMessage && <div>{successMessage}</div>}
                </label>


                <button className="btn btn-primary" onClick={handleCsvSubmit}>Submit</button>
            </div>
        </Modal>

    )
}