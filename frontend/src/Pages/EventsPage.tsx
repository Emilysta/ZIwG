import * as React from 'react';
import './EventsPage.scss'
import EventTile from 'Components/EventTile';
import TagList from 'Components/EventPage/TagList';
import { SearchField } from 'Components/SearchField';
import { useGetEventsQuery } from 'Utils/EventAPISlice';
import { EventDataSimple } from 'Utils/EventData';


export default function EventsPage() {
    const { data, error, isLoading } = useGetEventsQuery();
    //const events = data.map((e, i) => <EventTile key={i} data={e} />);
    const [events, setEvents]: [EventDataSimple[], any] = React.useState([...Array(10)])
    const [search, setSearch]: [string[], any] = React.useState([])

    const onSearch = (search: string, filter: (v: string) => boolean) => {
        if (data)
            setEvents(data.filter((e) => filter(e.name)))
    }

    // todo filter events by tag
    const tagChosen = (value: string, id: number) => alert(value + " id: " + id)

    React.useEffect(() => {
        if (!isLoading) {
            setSearch(data?.map((e) => e.name))
            setEvents(data)
        }
    }, [isLoading])

    if (error)
        return (<> <p> Oh no, there was an error </p></>);

    return (
        <>
            <div className='wholePageLayout navbarMargin'>
                <div className='eventsPage'>
                    <div className='eventsNav'>
                        <div>
                            <div>
                                <h2>Browse events</h2>
                                {/* <TagList tags={[{ name: "Concert" }, { name: "Workshops" }, { name: "Conference" }, { name: "xyz" }, { name: "abc" }, { name: "123" }]} isReadOnly={true} onClick={tagChosen} /> */}
                            </div>
                        </div>
                        <div>
                            <SearchField dictionary={search} maxSuggestions={6} onChosen={onSearch} />
                        </div>
                    </div>
                    <div className='eventList'>
                        {events?.map((e, i) => <EventTile key={i} data={e} isLoading={isLoading} />)}
                    </div>
                </div>
            </div>
        </>
    )
}
