import * as React from 'react';
import { Link } from 'react-router-dom';
import './ButtonWithIcon.scss';

type ButtonWithIconProps = {
    style: ButtonStyle,
    icon?: any,
    text: string,
    isActive?: boolean,
    link?: string,
    replaceLink?: boolean,
    onClickAction?: () => void,
}

export enum ButtonStyle {
    Filled = 'boxFilled',
    Border = 'boxBorder',
    Simple = 'boxSimple',
    MyButtonStyle = '',
}

export default function ButtonWithIcon(props: ButtonWithIconProps) {
    const icon = props.icon;

    function getClass(): string {
        return `buttonBox ${props.style} ${props.isActive ? "buttonActive" : "buttonIsntActive"}`;
    }

    function onClick() {
        if (props.onClickAction)
            props.onClickAction();
    }

    if (props.link) {
        return (
            <Link to={props.link} className={getClass()} replace={props.replaceLink}>
                <div className='buttonElement'>{icon}</div>
                <div className='buttonElement'>{props.text} </div>
            </Link>
        )
    }
    else {
        return (
            <div className={getClass()} onClick={onClick}>
                <div className='buttonElement'>{icon}</div>
                <div className='buttonElement'>{props.text} </div>
            </div>
        )
    }
}

