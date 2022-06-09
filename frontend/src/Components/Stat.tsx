import * as React from 'react';
import './Stat.scss';

type StatProps = {
    name: string,
    value: string,
}

export default function Stat(props: StatProps) {
    return (
        <div className='stat'>
            <label>{props.name}</label>
            <h1>{props.value}</h1>
        </div>
    )
}
