import * as React from 'react';
import Popup from 'Components/Popup';
import './GaleryPopup.scss'
import { HorizontalGalery } from './HorizontalGalery';
import { DropFilesBox } from './DropFilesBox';

export type GaleryPopupProps = {
    open?: boolean,
    onClose?: (state: boolean, images: File[], selected: File) => void,
    images?: File[],
}

export function GaleryPopup(props: GaleryPopupProps) {
    const [images, setImages] = React.useState<File[]>(props.images);
    const [selected, setSelected] = React.useState(null)

    function onImageUpload(file: File) {
        console.log(file);
        setImages(prevImages => [file, ...prevImages]);
    }

    return (
        <Popup open={props.open} onClose={(state) => props.onClose(state, images, selected)} className='GaleryPopup'>
            <header>
                <a className='title'>
                    Make a gallery for you event
                </a>
                <a className='subtitle'>
                    Select main photo for you event
                </a>
            </header>
            <main>
                <HorizontalGalery rows={2} className='horizontalGalery' images={images} onSelected={(s) => setSelected(s)} />
            </main>
            <footer>
                <DropFilesBox className='dropFiles' onImageUpload={onImageUpload} />
            </footer>
        </Popup>
    );
}
