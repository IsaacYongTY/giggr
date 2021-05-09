import React, { ChangeEvent, useState } from "react"
import axios from "axios";
import FormData from "form-data";
export default function Csv() {

    const [csvFile, setCsvFile] = useState<File>()
    function handleOnChange(e: ChangeEvent<HTMLInputElement>) {

        if(e.target.files) {
            console.log(e.target.files[0])
            setCsvFile(e.target.files[0])
        }
    }


    async function handleCsvSubmit() {
        console.log(csvFile)

        if(csvFile) {
            let formData = new FormData()
            formData.append("file", csvFile)
            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/songs/csv`, formData, {
                withCredentials: true,
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
        }

    }


    return (
        <div>
            csv

                <input type="file" name="file" onChange={handleOnChange} accept=".csv"/>
                <button onClick={handleCsvSubmit}>Submit</button>

        </div>
    )
}