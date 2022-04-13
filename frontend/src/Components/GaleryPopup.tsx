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
    const [images, setImages] = React.useState([
        "https://images.unsplash.com/photo-1518972559570-7cc1309f3229",
        "https://images.unsplash.com/photo-1583897251569-657efb696b21",
        "https://images.unsplash.com/photo-1534840641466-b1cdb8fb155e",
        "https://images.unsplash.com/photo-1529392960549-df4af50eac23",
        "https://images.unsplash.com/photo-1583897251569-657efb696b21",
        "https://images.unsplash.com/photo-1534840641466-b1cdb8fb155e",
        "https://images.unsplash.com/photo-1529392960549-df4af50eac23",
        "https://images.unsplash.com/photo-1518972559570-7cc1309f3229",
        "https://images.unsplash.com/photo-1568993703320-07e80bc8e7ab",
        "https://images.unsplash.com/photo-1517353334933-3365be5c8ec3",
    ])

    function onImageUpload(fileUrl: string) {
        setImages(prevImages => [fileUrl, ...prevImages]);
    }

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
                <HorizontalGalery rows={2} className='horizontalGalery' images={images} />
            </main>
            <footer>
                <DropFilesBox className='dropFiles' onImageUpload={onImageUpload} />
            </footer>
        </Popup>
    );
}
