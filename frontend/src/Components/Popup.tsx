import * as React from 'react';
import { Backspace } from 'react-bootstrap-icons';
import { IconButton } from './IconButton';
import './Popup.scss'

type PopupProps = {
    children?: string | React.ReactNode,
    open?: boolean,
    onClose?: (state: boolean) => void,
}

export default function Popup(props: PopupProps) {
    return props.open ? (
        <div className='popupBlend'>
            <div className='popupContainer'>
                <nav className='fixedButtons'>
                    <IconButton img={<Backspace size='100%' />} onClick={props.onClose} />
                </nav>
                {props.children}
            </div>
        </div>
    ) : (
        <></>
    )
}