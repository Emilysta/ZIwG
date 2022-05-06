import * as React from 'react';
import ZiwgSkeleton from 'Utils/Skeletons';
import './Image.scss'

type ImageProps = {
    src: string,
    className?: string,
    isLoading?: boolean,
    onClick?: (e: React.MouseEvent<HTMLDivElement>, img: string) => void
}

export function Image(props: ImageProps) {
    const onClick = (e: React.MouseEvent<HTMLDivElement>) => props.onClick(e, props.src)

    return (
        <div className={`image ${props.className ? props.className : ''}`} onClick={onClick}>
            {!props.isLoading && <img src={props.src} />}
            {props.isLoading && <ZiwgSkeleton />}
        </div>
    );
}
