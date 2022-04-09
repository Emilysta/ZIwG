import * as React from 'react'
import CalendarEvent, { CalendarEventProps } from './CalendarEvent'
import './CalendarEventStack.scss'

type CalendarEventStackProps = {
    eventsList: CalendarEventProps[],
    className?: string,
}

export default function CalendarEventStack(props: CalendarEventStackProps) {
    return (
        <>
            <h1 className='yourDayHeader'>Your Day</h1>
            <div className='eventStackList'>{props.eventsList.map((event: CalendarEventProps, i) => {
                return (
                    <CalendarEvent hours={event.hours} eventName={event.eventName} key={i} />
                )
            })}</div>
        </>
    )
}
