import * as React from 'react'
import { Link } from 'react-router-dom'

type ButtonWithIconProps = {
    icon?: object,
    text: string,
    isVisible: boolean,
    link: string
}

export default function ButtonWithIcon(props: ButtonWithIconProps) {
    return (
        <div>
            <Link to={props.link}>
                {props.icon}
                {props.isVisible && <p>{props.text} </p>}
            </Link>
        </div>
    )
}

