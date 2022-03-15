import React, { useState } from 'react';
import CsvUploadModal from './CsvUploadModal';
import CsvUploadButton from './CsvUploadButton';

export default function CsvUploadContainer() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    return (
        <>
            <CsvUploadButton setIsModalOpen={setIsModalOpen} />

            <CsvUploadModal
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
            />
        </>
    );
}
