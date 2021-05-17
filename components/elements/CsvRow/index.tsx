import React, { ChangeEvent, useState } from "react"
import axios from "axios";
import FormData from "form-data";
export default function Csv({ database } : { database : string }) {

    const [csvFile, setCsvFile] = useState<File>()
    function handleOnChange(e: ChangeEvent<HTMLInputElement>) {

        if(e.target.files) {
            console.log(e.target.files[0])
            setCsvFile(e.target.files[0])
        }
    }


    async function handleCsvSubmit() {
        console.log(csvFile)


        console.log(database)
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
        <div>
            <input type="file" name="file" onChange={handleOnChange} accept=".csv"/>
            <button onClick={handleCsvSubmit}>Submit</button>
        </div>
    )
}