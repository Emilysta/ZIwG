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
    const [src, setSrc] = React.useState(undefined);
    const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (props.onClick)
            props.onClick(e, props.src)
    }
    React.useEffect(() => {
        if (props.src) {
            if (typeof (props.src) === 'string') {
                setSrc(`data:image/png;base64,${props.src}`);
            }
            else {
                setSrc(URL.createObjectURL(props.src));
            }
        }
        else {
            setSrc(props.url);
        }
    }, [props.src, props.url]);


    return (
        <div className={`image ${props.className ? props.className : ''}`} onClick={onClick}>
            {!props.isLoading && src !== undefined && <img src={src} alt={''} />}
            {props.isLoading && <ZiwgSkeleton containerClassName='imageSkeleton' />}
            {src === undefined && <p>No image</p>}
        </div>
    );
}

