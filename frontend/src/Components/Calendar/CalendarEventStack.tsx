import * as React from 'react'
import { EventDataSimple } from 'Utils/EventData'
import CalendarEvent from './CalendarEvent'
import './CalendarEventStack.scss'

type CalendarEventStackProps = {
    eventsList: EventDataSimple[],
    className?: string,
}

export default function CalendarEventStack(props: CalendarEventStackProps) {
    return (
        <>
            <h1 className='yourDayHeader'>Your Day</h1>
            <div className='eventStackList'>
                {props.eventsList.length <= 0 && <p>No events this day</p>}
                {props.eventsList.length > 0 && props.eventsList.map((event: EventDataSimple, i) => {
                    return (
                        <CalendarEvent eventData={event} key={i} />
                    )
                })}</div>
        </>
    )
}
