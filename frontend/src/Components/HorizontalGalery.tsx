import * as React from 'react';
import { Image } from './Image';
import './HorizontalGalery.scss'

type HorizontalGaleryProps = {
    rows: number,
    images: string[],
    className?: string,
}

export function HorizontalGalery(props: HorizontalGaleryProps) {
    const [selected, setSelected]: [string, any] = React.useState(null)

    const getImageClass = (src: string) => src === selected ? "selected" : ""
    const choose = (e: React.MouseEvent<HTMLDivElement>, img: string) => setSelected(img)

    const renderRows = () => {
        const imageRows = []
        for (let r = 0; r < props.rows; r++) {
            imageRows.push((
                <div key={r} className='row'>
                    <div className='box'>
                        {
                            props.images.map((value, i) => (i % props.rows === r)
                                ? <Image className={getImageClass(value)} onClick={choose} key={i} src={value} />
                                : null)
                        }
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
