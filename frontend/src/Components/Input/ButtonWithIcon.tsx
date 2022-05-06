import * as React from 'react';
import { Link } from 'react-router-dom';
import './ButtonWithIcon.scss';

type ButtonWithIconProps = {
    text: string,
    isActive: boolean,
    link: string
    icon?: React.ReactElement | string,
    background?: boolean,
}

export default function ButtonWithIcon(props: ButtonWithIconProps) {
    const icon = props.icon;
    const classes = `linkBox ${props.isActive ? "linkActive" : "linkIsntActive"} ${props.background && "background"}`;
    return (
        <Link to={props.link} className={classes}>
            {icon}
            <span>{props.text} </span>
        </Link>
    )
}

