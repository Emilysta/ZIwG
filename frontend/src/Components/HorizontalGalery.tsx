import * as React from 'react';
import { Image } from './Image';
import './HorizontalGalery.scss'

type HorizontalGaleryProps = {
    rows: number,
    className?: string,
    images: string[]
}

export function HorizontalGalery(props: HorizontalGaleryProps) {
    console.log("Horizontal gallery render with " + props.images.length)
    const renderRows = () => {
        const imageRows = []
        for (let r = 0; r < props.rows; r++) {
            imageRows.push((
                <div key={r} className='row'>
                    <div className='box'>
                        {props.images.map((value, i) => (i % props.rows === r) ? <Image key={i} src={value} /> : null)}
                    </div>
                </div>
            ))
        }
        return imageRows
    }

    return (
        <div className={`horizontalGalery ${props.className}`}>
            <div className='galeryFade'></div>
            <div className='galeryContainer'>
                <div className='galeryRows'>
                    {renderRows()}
                </div>
            </div>
        </div>
    );
}
