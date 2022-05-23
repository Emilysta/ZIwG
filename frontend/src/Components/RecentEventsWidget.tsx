import * as React from 'react';
import { eventApi } from 'Utils/EventAPISlice';
import { Divider } from './Divider';
import EventTile from './EventTile';
import './RecentEventsWidget.scss'

type RecentEventsProps = {
    count: number
}

export function RecentEventsWidget(props: RecentEventsProps) {
    const { data, error, isLoading } = eventApi.useGetEventsQuery()

    if (isLoading)
        return <></>;

    return (
        <div className='recentEventsWidget'>
            <Divider text='Recent events' size={800} />
            <div className='eventsWidget'>
                {data.filter((_, i) => i < props.count).map((e, index) => <div key={index}>
                    <EventTile data={e} />
                </div>)}
            </div>
        </div>
    )
}
