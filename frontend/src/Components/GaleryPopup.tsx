import * as React from 'react';
import Popup from 'Components/Popup';
import './GaleryPopup.scss'
import { HorizontalGalery } from './HorizontalGalery';
import { DropFilesBox } from './DropFilesBox';

export type GaleryPopupProps = {
    open?: boolean,
    onClose?: (state: boolean) => void,
}

export function GaleryPopup(props: GaleryPopupProps) {
    const galeryRef: any = React.useRef()

    const onImageUpload = (fileUrl: string) => galeryRef.current.addImage(fileUrl)

    return (
        <Popup open={props.open} onClose={props.onClose} className='GaleryPopup'>
            <header>
                <a className='title'>
                    Make a gallery for you event
                </a>
                <a className='subtitle'>
                    Select main photo for you event
                </a>
            </header>
            <main>
                <HorizontalGalery ref={galeryRef} rows={2} className='horizontalGalery' />
            </main>
            <footer>
                <DropFilesBox className='dropFiles' onImageUpload={onImageUpload} />
            </footer>
        </Popup>
    );
}
