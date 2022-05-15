import * as React from 'react';
import { Download } from 'react-bootstrap-icons';
import './DropFilesBox.scss'
import { useDropzone as useDropZone } from 'react-dropzone'
import { render } from '@testing-library/react';

type DropFilesProps = {
    className: string,
    onImageUpload?: (file: File) => void,
};

export function DropFilesBox(props: DropFilesProps) {
    const onDrop = React.useCallback((acceptedFiles: File[]) => {
        if (props.onImageUpload) {

            for (const file of acceptedFiles) {
                let reader = new FileReader()
                reader.onload = (e: any) => {
                    console.log(e.target.result)
                    props.onImageUpload(file)
                }
                reader.readAsDataURL(file)
            }
        }
    }, [])

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
