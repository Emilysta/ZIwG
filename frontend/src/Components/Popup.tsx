import * as React from 'react';
import { Backspace } from 'react-bootstrap-icons';
import { IconButton } from './IconButton';
import './Popup.scss'

type PopupProps = {
    children: string | React.ReactNode
}

export default function Popup(props: PopupProps) {
    const [active, setActive]: [boolean, any] = React.useState(true)

    return active ? (
        <div className='popupBlend'>
            <div className='popupContainer'>
                <nav className='fixedButtons'>
                    <IconButton img={<Backspace size='100%' />} />
                </nav>
                {props.children}
            </div>
        </div>
    ) : (
        <></>
    )
}