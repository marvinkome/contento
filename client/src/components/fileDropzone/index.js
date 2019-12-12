import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import './style.scss';

function renderNoDragActive() {
    return (
        <div className="no-drag-active">
            <button className="btn btn-primary-outline">Select files</button>
            <p>Drag and drop files here</p>
        </div>
    );
}

function renderDragActive() {
    return (
        <div className="drag-active">
            <p>Drop file here</p>
        </div>
    );
}

export default function FileDropZone(props) {
    const onDrop = useCallback((acceptedFiles) => props.onDrop(acceptedFiles), []);
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: 'image/*'
    });

    return (
        <div className="file-dropzone" {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive ? renderDragActive() : renderNoDragActive()}
        </div>
    );
}
