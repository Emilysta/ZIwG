import * as React from 'react'
import { EventDataSimple } from 'Utils/EventData'
import './CalendarEvent.scss'
export type CalendarEventProps = {
    eventData: EventDataSimple
}

export default function CalendarEvent(props: CalendarEventProps) {
    //${props.eventData.date.getHours() + ':' + props.eventData.date.getMinutes()}
    const dateString = ``;
    return (
        <>
            <p className='hoursElement'>{dateString}</p>
            <h2 className='textElement'>{props.eventData.name}</h2>
        </>
    )
}
