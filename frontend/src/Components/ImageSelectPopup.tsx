import * as React from 'react';
import Popup from 'Components/Popup';
import './ImageSelectPopup.scss'
import { HorizontalGalery } from './HorizontalGalery';
import { DropFilesBox } from './DropFilesBox';
import { Image } from "Components/Image";

export type ImageSelectPopupProps = {
    open?: boolean,
    onClose?: (state: boolean, selected: File) => void,
    image?: File,
}

export function ImageSelectPopup(props: ImageSelectPopupProps) {
    const [image, setImage] = React.useState<File>(props.image);

    const onImageUpload = (file: File) => setImage(file);

    return (
        <Popup open={props.open} onClose={(state) => props.onClose(state, image)} className='ImageSelectPopup'>
            <header>
                <a className='title'>
                    Make a gallery for your event
                </a>
                <a className='subtitle'>
                    Select main photo for your event
                </a>
            </header>
            <main>
                <Image className="singleImage" src={image} />
            </main>
            <footer>
                <DropFilesBox className='dropFiles' onImageUpload={onImageUpload} />
            </footer>
        </Popup>
    );
}
