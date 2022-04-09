import * as React from 'react'
import './CalendarEvent.scss'
export type CalendarEventProps = {
    hours: string,
    eventName: string
}

export default function CalendarEvent(props: CalendarEventProps) {
    return (
        <>
            <p className='hoursElement'>{props.hours}</p>
            <h2 className='textElement'>{props.eventName}</h2>
        </>
    )
}
