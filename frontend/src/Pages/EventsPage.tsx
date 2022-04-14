import * as React from 'react';
import { GaleryPopup } from "Components/GaleryPopup";
import './EventPage.scss'
import EventTile from 'Components/EventTile';
import TagList from 'Components/EventPage/TagList';

function SearchField(props: any) {
    // todo search field
    return <input type="text" placeholder='Search todo' />
}


export default function EventsPage() {
    const [popupOpened, openPopup] = React.useState(false);

    return (
        <>
            <div className='eventPage navbarMargin'>
                <div className='eventNav'>
                    <div>
                        <TagList tags={["Concert", "Workshops", "Conference"]} isEditable={false} />
                    </div>
                    <div>
                        <SearchField />
                    </div>
                </div>
                <div className='eventList'>
                    {[...new Array(11)].map((e, i) => <EventTile key={i} />)}
                    <input type='button' value="open popup" onClick={() => openPopup(true)} />
                </div>
            </div>

            <GaleryPopup open={popupOpened} onClose={() => openPopup(false)} />
        </>
    )
}
