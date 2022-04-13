import * as React from 'react';
import './Image.scss'

type ImageProps = {
    src: string
}

export function Image(props: ImageProps) {
    
    const style: React.CSSProperties = {
        // backgroundImage: `url(${props.src})`
    }

    return (
        <div className='image' style={style}>
            <img src={props.src} />
        </div>
    );
}
