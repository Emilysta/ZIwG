import * as React from 'react';
import { Link } from 'react-router-dom';
import './ButtonWithIcon.css';

type ButtonWithIconProps = {
    icon?: any,
    text: string,
    isVisible: boolean,
    link: string
}

export default function ButtonWithIcon(props: ButtonWithIconProps) {
    const icon = props.icon;
    return (
        <Link to={props.link} className='linkBox'>
            <div className='linkElement'>{icon}</div>
            {props.isVisible && <div className='linkElement'>{props.text} </div>}
        </Link>
    )
}

