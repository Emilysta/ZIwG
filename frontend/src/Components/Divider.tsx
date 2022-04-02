import * as React from 'react'
import './Divider.scss'

type DividerProps =
    {
        text: string,
        size: number
    }

export function Divider(props: DividerProps) {
    return (
        <div className="separator" style={{ width: props.size }}>{props.text}</div >
    )
}
