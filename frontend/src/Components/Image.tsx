import * as React from 'react';
import './Image.scss'

type ImageProps = {
    src: string,
    className?: string
    onClick?: (e: React.MouseEvent<HTMLDivElement>, img: string) => void
}

export function Image(props: ImageProps) {
    const onClick = (e: React.MouseEvent<HTMLDivElement>) => props.onClick(e, props.src)

    return (
        <div className={`image ${props.className}`} onClick={onClick}>
            <img src={props.src} />
        </div>
    );
}
