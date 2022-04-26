import * as React from 'react';
import { GaleryPopup } from "Components/GaleryPopup";
import './EventPage.scss'
import EventTile from 'Components/EventTile';
import TagList from 'Components/EventPage/TagList';
import { SearchField } from 'Components/SearchField';

const mockWordList = [
    "Amet",
    "deleniti",
    "maxime",
    "quisquam",
    "Libero",
    "laborum",
    "architecto",
    "sint",
    "quia",
    "excepturi",
    "aliquam",
    "Voluptatibus",
    "sapiente",
    "corrupti",
    "vitae",
    "Quis",
    "consequuntur",
    "autem",
    "aperiam",
]

export default function EventsPage() {
    const [popupOpened, openPopup] = React.useState(false);

    const events = [...new Array(11)].map((e, i) => <EventTile key={i} />);
    const onSearch = (search: string) => alert(search)
    const tagChosen = (value: string, id: number) => alert(value + " id: " + id)

    return (
        <>
            <div className='wholePageLayout navbarMargin'>
                <div className='eventPage'>
                    <div className='eventNav'>
                        <div>
                            <TagList tags={["Concert", "Workshops", "Conference", "xyz", "abc", "123"]} isEditable={false} onClick={tagChosen} />
                        </div>
                        <div>
                            <SearchField dictionary={mockWordList} maxSuggestions={6} onChosen={onSearch} />
                        </div>
                    </div>
                    <div className='eventList'>
                        {events}
                        <input type='button' value="open popup" onClick={() => openPopup(true)} />
                    </div>
                </div>
            </div>

            <GaleryPopup open={popupOpened} onClose={() => openPopup(false)} />
        </>
    )
}
