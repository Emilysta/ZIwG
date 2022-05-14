import * as React from 'react';
import { Link } from 'react-router-dom';
import './ButtonLink.scss'

interface ButtonLinkProps {
    children: React.ReactNode
    to?: string
    className?: string
    onClick?: () => void
}

export function ButtonLink(props: ButtonLinkProps) {
    return (
        <Link to={props.to} onClick={props.onClick} className={`linkButton ${props.className}`}>{props.children}</Link>
    );
}
