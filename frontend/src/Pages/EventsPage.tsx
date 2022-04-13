import * as React from 'react';
import { GaleryPopup } from "Components/GaleryPopup";
import './EventPage.scss'
import { EventTile } from 'Components/EventTile';

function EventsPage() {
    const [popupOpened, openPopup] = React.useState(false);

    return (
        <>
            <div className='eventPage navbarMargin'>
                <div className='eventNav'>
                    <div>
                        Tag list...
                        <input type='button' value="open popup" onClick={() => openPopup(true)} />
                    </div>
                    <div>
                        search
                    </div>
                </div>
                <div className='eventList'>
                    {[...new Array(11)].map((e, i) => <EventTile key={i}/>)}
                </div>
            </div>

            <GaleryPopup open={popupOpened} onClose={() => openPopup(false)} />
        </>
    )
}

export default EventsPage;