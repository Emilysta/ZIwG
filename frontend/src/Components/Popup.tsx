import * as React from 'react';
import { XLg } from 'react-bootstrap-icons';
import { IconButton } from './IconButton';
import './Popup.scss'

type PopupProps = {
    children?: string | React.ReactNode,
    open?: boolean,
    onClose?: (state: boolean) => void,
    className?: string
}

export default function Popup(props: PopupProps) {
    return props.open ? (
        <div className={'popupBlend ' + props.className ?? ''}>
            <div className='popupContainer'>
                <nav className='fixedButtons'>
                    <IconButton img={<XLg size='100%' />} onClick={props.onClose} />
                </nav>
                {props.children}
            </div>
        </div>
    ) : (
        <></>
    )
}
