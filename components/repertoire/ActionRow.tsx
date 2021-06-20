import React, {Dispatch, SetStateAction} from "react"
import CsvUploadContainer from "../elements/CsvUploadContainer";

interface Props {
    setIsModalOpen: Dispatch<SetStateAction<boolean>>
    database: string
}

export default function ActionRow({ setIsModalOpen, database } : Props) {
    return (
        <div className="action-row">
            <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>Add Song</button>
            <CsvUploadContainer database={database} />
        </div>
    )
}