import * as React from 'react';
import { Link } from 'react-router-dom';
import './ButtonWithIcon.scss';

type ButtonWithIconProps = {
    icon?: any,
    text: string,
    isActive: boolean,
    link: string
}

export default function ButtonWithIcon(props: ButtonWithIconProps) {
    const icon = props.icon;
    return (
        <Link to={props.link} className={`linkBox ${props.isActive ? "linkActive" : "linkIsntActive"}`}>
            <div className='linkElement'>{icon}</div>
            <div className='linkElement'>{props.text} </div>
        </Link>
    )
}

