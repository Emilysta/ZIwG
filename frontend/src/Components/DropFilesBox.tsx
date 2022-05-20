import * as React from 'react';
import { Download } from 'react-bootstrap-icons';
import './DropFilesBox.scss'
import { useDropzone as useDropZone } from 'react-dropzone'

type DropFilesProps = {
    className: string,
    onImageUpload?: (file: File) => void,
};

export function DropFilesBox(props: DropFilesProps) {
    const onDrop = React.useCallback((acceptedFiles: File[]) => {
        if (props.onImageUpload) {
            console.log(typeof (acceptedFiles[0]));
            props.onImageUpload(acceptedFiles[0]);
        }
    }, [props])

    const { getRootProps, getInputProps, isDragActive } = useDropZone({ onDrop })

    return (
        <div className={`dropFiles ${props.className}`} {...getRootProps()}>
            <input {...getInputProps()} />
            <span className='dropCenter'>
                <Download />
                <span>
                    <a>Choose files</a> or <br />drop it here
                </span>
            </span>
        </div>
    );
}
