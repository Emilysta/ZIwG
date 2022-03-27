import * as React from 'react'
import './BlendedCircle.scss'

type CircleProps = {
    id?: string,
    className?: string,
    size: number,
    top?: string,
    bottom?: string,
    left?: string,
    right?: string,
    color?: string
}

export function BlendedCircle(props: CircleProps) {
    const style: React.CSSProperties = {
        width: props.size,
        height: props.size,
        backgroundColor: props.color,

        top: props.top,
        bottom: props.bottom,
        left: props.left,
        right: props.right,

        marginLeft: props.left ? (-props.size / 2) + "px" : null,
        marginRight: props.right ? (-props.size / 2) + "px" : null,
        marginTop: props.top ? (-props.size / 2) + "px" : null,
        marginBottom: props.bottom ? (-props.size / 2) + "px" : null,
    }
    return (
        <div className={'Circle ' + props.className} id={props.id} style={style} />
    )
}
