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
        <section className='RecentEventsWidget'>
            <header>
                <Divider text='Recent events' size={800} />
            </header>
            <main>
                {data.filter((_, i) => i < props.count).map((e, i) => <div>
                    <EventTile key={i} data={e} />
                </div>)}
            </main>
        </section>
    )
}
