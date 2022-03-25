import * as React from 'react'
import './Divider.css'

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
