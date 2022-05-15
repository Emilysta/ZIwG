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
    let url: string;

    if (props.src) {
        try {
            url = `data:image/png;base64,${props.src}`;
        }
        catch (e) {
            url = undefined;
            console.log(e);

        }
    }
    else {
        url = props.url;
    }

    return (
        <div className={`image ${props.className ? props.className : ''}`} onClick={onClick}>
            {!props.isLoading && url !== undefined && <img src={url} alt={''} />}
            {props.isLoading && <ZiwgSkeleton containerClassName='imageSkeleton' />}
            {url === undefined && <p> no image</p>}
        </div>
    );
}
