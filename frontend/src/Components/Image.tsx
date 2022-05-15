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

    if (props.src?.name) {
        return <ImageUploaded {...props} />
    }

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

function ImageUploaded(props: ImageProps) {
    type State = { src: any, file: File, isLoading: boolean }
    const [state, setSrc] = React.useState<State>(null)

    const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (props.onClick)
            props.onClick(e, props.src)
    }

    if (props.src && state?.file !== props.src) {
        let renderer = new FileReader()
        setSrc({ ...state, file: props.src, isLoading: true })
        renderer.onload = (e: ProgressEvent<FileReader>) => setSrc({ ...state, src: e.target.result, isLoading: false })
        renderer.readAsDataURL(props.src)
    }

    let isLoading = props.isLoading

    return (
        <div className={`image ${props.className ? props.className : ''}`} onClick={onClick}>
            {state && !isLoading && <img src={state.src} alt={''} />}
            {state && isLoading && <ZiwgSkeleton containerClassName='imageSkeleton' />}
            {!state && <p> no image</p>}
        </div>
    );
}
