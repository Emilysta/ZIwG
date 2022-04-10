import * as React from 'react';
import { Download } from 'react-bootstrap-icons';
import './DropFilesBox.scss'

export function DropFilesBox(props: any) {
    return (
        <div className={`dropFiles ${props.className}`}>
            <a className='dropCenter'>
                <Download />
                <span>
                    <a>Choose files</a> or <br />drop it here
                </span>
            </a>
        </div>
    );
}
