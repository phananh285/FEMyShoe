import React, { useRef } from 'react';
import * as XLSX from 'xlsx';
import './ExcelImport.css';

const ExcelImport = ({ onImport }) => {
    const fileInputRef = useRef();

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = (event) => {
            const binaryStr = event.target.result;
            const workbook = XLSX.read(binaryStr, { type: 'binary' });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const data = XLSX.utils.sheet_to_json(worksheet);
            
            onImport(data);
            fileInputRef.current.value = '';
        };

        reader.readAsBinaryString(file);
    };

    return (
        <div className="excel-import">
            <input
                type="file"
                ref={fileInputRef}
                accept=".xlsx, .xls"
                onChange={handleFileUpload}
                className="excel-input"
            />
            <p className="import-help">
                Chấp nhận file Excel (.xlsx, .xls)
            </p>
        </div>
    );
};

export default ExcelImport;
