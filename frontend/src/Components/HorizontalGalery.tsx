import * as React from 'react';
import { Image } from './Image';
import './HorizontalGalery.scss'

type HorizontalGaleryProps = {
    rows: number,
    className?: string,
}

export const HorizontalGalery = React.forwardRef((props: HorizontalGaleryProps, ref: any) => {
    const [images, setImages] = React.useState([
        "https://images.unsplash.com/photo-1518972559570-7cc1309f3229",
        "https://images.unsplash.com/photo-1583897251569-657efb696b21",
        "https://images.unsplash.com/photo-1534840641466-b1cdb8fb155e",
        "https://images.unsplash.com/photo-1529392960549-df4af50eac23",
        "https://images.unsplash.com/photo-1583897251569-657efb696b21",
        "https://images.unsplash.com/photo-1534840641466-b1cdb8fb155e",
        "https://images.unsplash.com/photo-1529392960549-df4af50eac23",
        "https://images.unsplash.com/photo-1518972559570-7cc1309f3229",
        "https://images.unsplash.com/photo-1568993703320-07e80bc8e7ab",
        "https://images.unsplash.com/photo-1517353334933-3365be5c8ec3",
    ])

    React.useImperativeHandle(ref, () => ({
        addImage: (file: string) => {
            let list = images
            list.unshift(file)
            setImages([])
            setImages(list)
        }
    }))

    const renderRows = () => {
        const rows = []
        for (let r = 0; r < props.rows; r++) {
            rows.push((
                <div key={r} className='row'>
                    <div className='box'>
                        {images.map((value, i) => (i % props.rows == r) ? <Image key={i} src={value} /> : null)}
                    </div>
                </div>
            ))
        }
        return rows
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
})
