import React, { useState } from 'react';
import CsvRow from '../../components/repertoire/ActionRow/CsvUploadContainer/CsvUploadModal/CsvUploadModal';

export default function Csv() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    function handleOpenModal() {
        setIsModalOpen(true);
    }

    return (
        <>
            <CsvRow isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
            <button onClick={handleOpenModal}>Open Modal</button>
        </>
    );
}
