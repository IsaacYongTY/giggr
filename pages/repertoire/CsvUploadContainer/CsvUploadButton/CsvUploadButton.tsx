import React from 'react';

export default function CsvUploadButton({ setIsModalOpen }: any) {
    return (
        <button onClick={() => setIsModalOpen(true)} className="btn btn-link">
            <span className="material-icons">upload</span>
            Upload CSV
        </button>
    );
}
