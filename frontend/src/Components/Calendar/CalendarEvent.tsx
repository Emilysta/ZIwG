import * as React from 'react'
import { EventData } from './Calendar'
import './CalendarEvent.scss'
export type CalendarEventProps = {
    eventData: EventData
}

export default function CalendarEvent(props: CalendarEventProps) {

    const dateString = `${props.eventData.date.getHours() + ':' + props.eventData.date.getMinutes()}`;
    return (
        <>
            <p className='hoursElement'>{dateString}</p>
            <h2 className='textElement'>{props.eventData.name}</h2>
        </>
    )
}
