import * as React from 'react';
import ZiwgSkeleton from 'Utils/Skeletons';
import './Image.scss'

type ImageProps = {
    src?: File,
    url?: string,
    className?: string,
    isLoading?: boolean,
    onClick?: (e: React.MouseEvent<HTMLDivElement>, img: File) => void
}

export function Image(props: ImageProps) {
    const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (props.onClick)
            props.onClick(e, props.src)
    }
    const url = props.src ? URL.createObjectURL(props.src) : props.url;
    return (
        <div className={`image ${props.className ? props.className : ''}`} onClick={onClick}>
            {!props.isLoading && <img src={url} alt={''} />}
            {props.isLoading && <ZiwgSkeleton containerClassName='imageSkeleton' />}
        </div>
    );
}
