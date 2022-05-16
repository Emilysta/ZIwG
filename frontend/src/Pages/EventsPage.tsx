import * as React from 'react';
import './EventsPage.scss'
import EventTile from 'Components/EventTile';
import TagList from 'Components/EventPage/TagList';
import { SearchField } from 'Components/SearchField';
import { useGetEventsQuery } from 'Utils/EventAPISlice';

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
    const { data, error, isLoading } = useGetEventsQuery();
    //const events = data.map((e, i) => <EventTile key={i} data={e} />);
    const onSearch = (search: string) => alert(search)
    const tagChosen = (value: string, id: number) => alert(value + " id: " + id)

    if (error)
        return (<> <p> Oh no, there was an error </p></>);
    else if (isLoading)
        return (
            <>
                <div className='wholePageLayout navbarMargin'>
                    <div className='eventsPage'>
                        <div className='eventsNav'>
                            <div>
                                <TagList tags={[{ name: "Concert" }, { name: "Workshops" }, { name: "Conference" }, { name: "xyz" }, { name: "abc" }, { name: "123" }]} isReadOnly={true} onClick={tagChosen} />
                            </div>
                            <div>
                                <SearchField dictionary={mockWordList} maxSuggestions={6} onChosen={onSearch} />
                            </div>
                        </div>
                        <div className='eventList'>
                            {[...Array(10)].map((x, i) => <EventTile key={i} isLoading={true} />)}
                        </div>
                    </div>
                </div>
            </>
        )
    else
        return (
            <>
                <div className='wholePageLayout navbarMargin'>
                    <div className='eventsPage'>
                        <div className='eventsNav'>
                            <div>
                                <TagList tags={[{ name: "Concert" }, { name: "Workshops" }, { name: "Conference" }, { name: "xyz" }, { name: "abc" }, { name: "123" }]} isReadOnly={true} onClick={tagChosen} />
                            </div>
                            <div>
                                <SearchField dictionary={mockWordList} maxSuggestions={6} onChosen={onSearch} />
                            </div>
                        </div>
                        <div className='eventList'>
                            {data.map((e, i) => <EventTile key={i} data={e} isLoading={isLoading} />)}
                        </div>
                    </div>
                </div>
            </>
        )
}
