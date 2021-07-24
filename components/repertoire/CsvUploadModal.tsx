import React, {ChangeEvent, useState, useRef, useEffect} from "react"
import axios from "axios";
import FormData from "form-data";
import styles from "../../assets/scss/components/repertoire/_csv-upload-modal.module.scss"
import Modal from "react-modal";
import {parseCookies} from "nookies";
import ButtonWithLoader from "../common/ButtonWithLoader";
import { trigger } from "swr";

export default function CsvUploadModal({ isModalOpen, setIsModalOpen, database } : { database : string, setIsModalOpen: any, isModalOpen : boolean }) {

    const [csvFile, setCsvFile] = useState<File>()
    const [isLoading, setIsLoading] = useState(false)
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
        setIsLoading(true)
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
            formData.append("file", csvFile)

            const cookies = parseCookies()
            await axios.post(url, formData, {
                withCredentials: true,
                headers: {
                    "x-auth-token": cookies["x-auth-token"],
                    "Content-Type": "multipart/form-data"
                }
            })

            trigger("/api/v1/users?category=id&order=ASC")
            setSuccessMessage("CSV uploaded successfully!")
            setCsvFile(undefined)
            setIsLoading(false)
        } catch(error) {
            console.log(error)
            setErrorMessage("Upload failed. Please try again later.")
        }
    }


    return (
        <Modal
            isOpen={isModalOpen}
            className={styles.modal}
            ariaHideApp={false}
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
                    {csvFile && <div className={styles.fileName}> {csvFile.name}</div> }
                    {errorMessage && <div className="error-message">{errorMessage}</div>}
                    {successMessage && <div>{successMessage}</div>}
                </label>


                <ButtonWithLoader
                    onClick={handleCsvSubmit}
                    isLoading={isLoading}
                    label="Submit"
                    primary={true}
                />

            </div>
        </Modal>

    )
}