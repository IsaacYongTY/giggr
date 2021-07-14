import React, {useState} from "react";
import CsvUploadModal from "./CsvUploadModal";
import CsvUploadButton from "./CsvUploadButton";
export default function CsvUploadContainer({ database } : { database: string}) {

    const [isModalOpen, setIsModalOpen] = useState(false)
    return (
        <>
            <CsvUploadButton setIsModalOpen={setIsModalOpen}/>

            <CsvUploadModal database={database} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>
        </>



    )
}