import * as React from 'react'
import { EventData } from './Calendar'
import CalendarEvent from './CalendarEvent'
import './CalendarEventStack.scss'

type CalendarEventStackProps = {
    eventsList: EventData[],
    className?: string,
}

export default function CalendarEventStack(props: CalendarEventStackProps) {
    return (
        <>
            <h1 className='yourDayHeader'>Your Day</h1>
            <div className='eventStackList'>{props.eventsList.map((event: EventData, i) => {
                return (
                    <CalendarEvent eventData={event} key={i} />
                )
            })}</div>
        </>
    )
}
