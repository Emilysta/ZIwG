import * as React from 'react'
import './CalendarEvent.scss'
export type CalendarEventProps = {
    hours: string,
    eventName: string
}

export default function CalendarEvent(props: CalendarEventProps) {
    return (
        <div><p className='hoursElement'>{props.hours}</p>
            <h1 className='textElement'>{props.eventName}</h1></div>
    )
}
