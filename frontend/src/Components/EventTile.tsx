import * as React from 'react';
import './EventTile.scss'
import { Image } from 'Components/Image'


export function EventTile(props: any) {
    return (
        <div className='eventTile'>
            <span className='imageCon'>
            </span>
            <span className='title'>
                Title
            </span>
            <span className='organizer'>
                Organizator
            </span>
            <span className='details'>
                From: 15.05.2022
                To: 21.05.2022
            </span>
        </div>
    );
}
