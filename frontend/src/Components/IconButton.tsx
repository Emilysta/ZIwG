import * as React from 'react';
import './IconButton.scss';

type IconButtonProps = {
    img: React.ReactElement,
    onClick?: any
}

export function IconButton(props: IconButtonProps) {
    return (
        <a className='iconButton' onClick={props.onClick}>
            {props.img}
        </a>
    );
}
