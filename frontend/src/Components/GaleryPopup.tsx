import * as React from 'react';
import Popup from 'Components/Popup';
import './GaleryPopup.scss'

function HorizontalGalery(props: any) {
    return (
        <div className={props.className}></div>
    )
}

function DropFilesBox(props: any) {
    return (
        <div className={props.className}></div>
    )
}

export type GaleryPopupProps = {
    open?: boolean,
    onClose?: (state: boolean) => void,
}

export function GaleryPopup(props: GaleryPopupProps) {
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
                <HorizontalGalery rows={2} className='horizontalGalery'/>
            </main>
            <footer>
                <DropFilesBox className='dropFiles'/>
            </footer>
        </Popup>
    );
}
