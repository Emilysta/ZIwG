import * as React from 'react';
import { GaleryPopup } from "Components/GaleryPopup";
import './EventPage.scss'
import EventTile from 'Components/EventTile';
import TagList from 'Components/EventPage/TagList';
import { SearchField, mockSuggestionsLogic } from '../Components/SearchField';

export default function EventsPage() {
    const [popupOpened, openPopup] = React.useState(false);

    const events = [...new Array(11)].map((e, i) => <EventTile key={i} />);

    return (
        <>
            <div className='eventPage navbarMargin'>
                <div className='eventNav'>
                    <div>
                        <TagList tags={["Concert", "Workshops", "Conference", "xyz", "abc", "123"]} isEditable={false} />
                    </div>
                    <div>
                        <SearchField suggestions={mockSuggestionsLogic} />
                    </div>
                </div>
                <div className='eventList'>
                    {events}
                    <input type='button' value="open popup" onClick={() => openPopup(true)} />
                </div>
            </div>

            <GaleryPopup open={popupOpened} onClose={() => openPopup(false)} />
        </>
    )
}
