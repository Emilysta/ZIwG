import * as React from 'react';
import { Link } from 'react-router-dom';
import ZiwgSkeleton from 'Utils/Skeletons';
import './ButtonWithIcon.scss';

type ButtonWithIconProps = {
    style: ButtonStyle,
    icon?: React.ReactNode,
    text: string,
    isActive?: boolean,
    link?: string,
    replaceLink?: boolean,
    onClickAction?: () => void,
    isLoading?: boolean,
}

export enum ButtonStyle {
    Filled = 'boxFilled',
    Border = 'boxBorder',
    Simple = 'boxSimple',
    MyButtonStyle = '',
    Background = "background"
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

    if (props.isLoading) {
        return (<div className={'buttonBox'} ><ZiwgSkeleton width={150} /></div>)
    }
    else if (props.link) {
        return (
            <Link to={props.link} className={getClass()} replace={props.replaceLink}>
                {icon}
                <span>{props.text}</span>
            </Link>
        )
    }
    else {
        return (
            <div className={getClass()} onClick={onClick}>
                {icon}
                <span>{props.text} </span>
            </div>
        )
    }
}

