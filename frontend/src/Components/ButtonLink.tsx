import * as React from 'react';
import { Link } from 'react-router-dom';
import './ButtonLink.scss'

interface ButtonLinkProps {
    children: React.ReactNode
    to: string
    className: string
}

export function ButtonLink(props: ButtonLinkProps) {
    return (
        <Link to={props.to} className={`linkButton ${props.className}`}>{props.children}</Link>
    );
}
