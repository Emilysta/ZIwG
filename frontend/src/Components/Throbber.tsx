import * as React from 'react';
import './Throbber.scss';
type ThrobberProps = {
    className?: string,
}
export default function Throbber(props: ThrobberProps) {
    return (
        <img src='/images/throbber-img.png' alt='throbber' className={`throbber ${props.className ? props.className : ''}`} />
    )
}
