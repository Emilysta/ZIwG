import * as React from 'react';
import { Image } from './Image';
import './HorizontalGalery.scss'

export function HorizontalGalery(props: any) {
    return (
        <div className={`horizontalGalery ${props.className}`}>
            <div className='galeryFade'></div>
            <div className='galeryContainer'>
                <div className='galeryRows'>
                    <div className='row'>
                        <div className='box'>
                            <Image src="https://images.unsplash.com/photo-1517353334933-3365be5c8ec3" />
                            <Image src="https://images.unsplash.com/photo-1568993703320-07e80bc8e7ab" />
                            <Image src="https://images.unsplash.com/photo-1529392960549-df4af50eac23" />
                            <Image src="https://images.unsplash.com/photo-1518972559570-7cc1309f3229" />
                            <Image src="https://images.unsplash.com/photo-1583897251569-657efb696b21" />
                            <Image src="https://images.unsplash.com/photo-1534840641466-b1cdb8fb155e" />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='box'>
                            <Image src="https://images.unsplash.com/photo-1583897251569-657efb696b21" />
                            <Image src="https://images.unsplash.com/photo-1534840641466-b1cdb8fb155e" />
                            <Image src="https://images.unsplash.com/photo-1529392960549-df4af50eac23" />
                            <Image src="https://images.unsplash.com/photo-1518972559570-7cc1309f3229" />
                            <Image src="https://images.unsplash.com/photo-1568993703320-07e80bc8e7ab" />
                            <Image src="https://images.unsplash.com/photo-1517353334933-3365be5c8ec3" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
